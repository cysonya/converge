<?php

namespace App\Http\Controllers;

use DB;
use Log;
use Illuminate\Http\Request;
use Stripe\Charge;
use Stripe\Customer;
use Stripe\Stripe;

use App\Attendant;
use Carbon\Carbon;
use App\Event;
use App\Order;
use App\Package;


class CheckoutsController extends Controller
{

    /**
     * Create order, handle payment, fire off email jobs
     *
     * @param  Request $request
     * @param  $event_id
     * @return \Illuminate\Http\JsonResponse
	 */
    public function store(Request $request, $event_id)
    {
        DB::beginTransaction();

        // Validate packages are available and get order total
        try {

            $packagesTotal = 0;
            foreach ($request->registrants as $registrant)
            {
                $package = Package::find((int)$registrant['package']);
                $package->quantity_sold += 1;

                if ($package->quantity_remaining < 0) {
                    DB::rollBack();
                    return response()
                                ->json([
                                    'status' => "error_soldout",
                                    'error' => "No spots left in {$package->title}. Please choose another option."
                                ]);
                }
                $package->save();

                $packagesTotal += $package->groups()->where('group_id', $registrant['group'])->first()->pivot->price;
            }

        } catch (Exception $e) {
            DB::rollBack();
            return response()
                ->json(['status' => "error", 'error' => "An error has occured. Please try again."]);
        }



        try {
            $event = Event::find($event_id);

            // Create order
            $order = Order::create([
                'event_id' => $event->id,
                'first_name' => strip_tags($request->customer_first_name),
                'last_name' => strip_tags($request->customer_last_name),
                'email' => strip_tags($request->customer_email),
                'order_total' => $packagesTotal + $request->donation,
                'status' => 'completed'
            ]);



            // Create the attendants
            foreach($request->registrants as $registrant) {
                Attendant::create([
                    'event_id' => $event->id,
                    'order_id' => $order->id,
                    'group_id' => (int)$registrant['group'],
                    'package_id' => (int)$registrant['package'],
                    'first_name' => strip_tags($registrant['first_name']),
                    'last_name' => strip_tags($registrant['last_name']),
                    'email' => strip_tags($request->customer_email),
                    'custom_properties' => [
                        'roommates' => strip_tags($registrant['roommates']),
                        'dietary' => strip_tags($registrant['dietary'])
                    ]
                ]);

                // Associate order with package
                $order->packages()->attach((int)$registrant['package']);
            }

        } catch(Exception $e) {
            Log::error($e);
            DB::rollBack();

            return response()
                ->json(['status' => "error", 'error' => "There was a problem processing your order. Please try again."]);
        }

        try {
            // Create charge with Stripe
            Stripe::setApiKey(env('STRIPE_SECRET_KEY'));

            $customer = Customer::create(array(
                'email' => strip_tags($request->customer_email),
                'source' => strip_tags($request->stripeToken),
                'metadata' => [
                    'first_name' => strip_tags($request->customer_first_name),
                    'last_name' => strip_tags($request->customer_last_name)
                ]
            ));

            $charge = Charge::create(array(
                'customer' => $customer->id,
                'amount' => $packagesTotal * 100,
                'currency' => 'usd',
                'description' => "Payment for {$event->title}"
            ));
            if ($request->donation > 0) {
                $donationCharge = Charge::create(array(
                    'customer' => $customer->id,
                    'amount' => $request->donation * 100,
                    'currency' => 'usd',
                    'description' => "Donation for {$event->title}"
                ));
            }

            // SAVE PAYMENT TO DATABASE
            $order->payments()->create([
                'event_id' => $event->id,
                'payment_type' => 'order',
                'amount' => $packagesTotal,
                'transaction_id' => $charge->id,
                'transaction_date' => Carbon::now()
            ]);
            // Create donation
            if ($request->donation > 0) {
                $order->payments()->create([
                    'event_id' => $event->id,
                    'payment_type' => 'donation',
                    'amount' => $request->donation,
                    'transaction_id' => $donationCharge->id,
                    'transaction_date' => Carbon::now()
                ]);
            }

            $order->stripe_customer_id = $customer->id;
            $order->save();

        } catch(\Stripe\Error\Card $e) {
            DB::rollBack();

            // Card declined
            $body = $e->getJsonBody();
            $err = $body['error']['message'];
            return response()
                ->json(['status' => "error", 'error' => $err]);
        } catch (\Stripe\Error\RateLimit $e) {
            DB::rollBack();

            // Too many requests made to the API too quickly
            return response()
                ->json(['status' => "error", 'error' => "Too many requests. Please try again in a few minutes."]);
        } catch (\Stripe\Error\InvalidRequest $e) {
            DB::rollBack();

            // Invalid parameters were supplied to Stripe's API
            return response()
                ->json(['status' => "error", 'error' => "Server request error"]);
        } catch (\Stripe\Error\Authentication $e) {
            DB::rollBack();

            // Authentication with Stripe's API failed
            // (maybe you changed API keys recently)
        } catch (\Stripe\Error\ApiConnection $e) {
            DB::rollBack();

            // Network communication with Stripe failed
        } catch (\Stripe\Error\Base $e) {
            DB::rollBack();

            // Display a very generic error to the user, and maybe send
            // yourself an email
            return response()
                ->json(['status' => "error", 'error' => "An error has occured."]);
        } catch (Exception $e) {
            DB::rollBack();

            // Something else happened, completely unrelated to Stripe
            return response()
                ->json(['status' => "error", 'error' => "An error has occured."]);
        }

        $emailJob = (new \App\Jobs\ConfirmOrderJob($order));
        dispatch($emailJob);

        DB::commit();

        return response()
                ->json(['status' => 'complete', 'data' => $order]);

    }
}
