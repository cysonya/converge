<?php

namespace App\Http\Controllers;

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
    	$event = Event::findOrFail($event_id);

    	// Get order total
    	$packages = array_pluck($request->registrants, 'package');
    	$orderTotal = collect($packages)
    		->sum(function($package) {
    			return Package::find($package)->price;
    		}
    	);

    	// Charge with Stripe
    	Stripe::setApiKey(env('STRIPE_SECRET_KEY'));

        try {
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
                'amount' => $orderTotal * 100,
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

        } catch(\Stripe\Error\Card $e) {
            // Card declined
            $body = $e->getJsonBody();
            $err = $body['error']['message'];
            return response()
                ->json(['status' => "error", 'error' => $err]);
        } catch (\Stripe\Error\RateLimit $e) {
            // Too many requests made to the API too quickly
            return response()
                ->json(['status' => "error", 'error' => "Too many requests. Please try again in a few minutes."]);
        } catch (\Stripe\Error\InvalidRequest $e) {
            // Invalid parameters were supplied to Stripe's API
            return response()
                ->json(['status' => "error", 'error' => "Server request error"]);
        } catch (\Stripe\Error\Authentication $e) {
            // Authentication with Stripe's API failed
            // (maybe you changed API keys recently)
        } catch (\Stripe\Error\ApiConnection $e) {
            // Network communication with Stripe failed
        } catch (\Stripe\Error\Base $e) {
            // Display a very generic error to the user, and maybe send
            // yourself an email
            return response()
                ->json(['status' => "error", 'error' => "An error has occured."]);
        } catch (Exception $e) {
            // Something else happened, completely unrelated to Stripe
            return response()
                ->json(['status' => "error", 'error' => "An error has occured."]);
        }


    	// Create order
    	$order = Order::create([
    		'event_id' => $event->id,
    		'first_name' => strip_tags($request->customer_first_name),
    		'last_name' => strip_tags($request->customer_last_name),
    		'email' => strip_tags($request->customer_email),
    		'order_total' => $orderTotal,
    		'stripe_customer_id' => $customer->id,
    		'status' => 'completed'
    	]);

    	// Create payment
    	$payment = $order->payments()->create([
    		'payment_type' => 'order',
    		'amount' => $orderTotal,
    		'transaction_id' => $charge->id,
    		'transaction_date' => Carbon::now()
    	]);
        // Create donation
        if ($request->donation > 0) {
            $payment = $order->payments()->create([
                'payment_type' => 'donation',
                'amount' => $request->donation,
                'transaction_id' => $charge->id,
                'transaction_date' => Carbon::now()
            ]);
        }

    	// Create the attendants
    	foreach($request->registrants as $registrant) {
    		Attendant::create([
    			'event_id' => $event->id,
    			'order_id' => $order->id,
        'group_id' => (int)$registrant['group'],
        'package_id' => (int)$registrant['package'],
    			'first_name' => strip_tags($registrant['first_name']),
    			'last_name' => strip_tags($registrant['last_name']),
    			'email' => strip_tags($registrant['email']),
    			'custom_properties' => [
    				'roommates' => strip_tags($registrant['roommates']),
    				'dietary' => strip_tags($registrant['dietary'])
    			]
    		]);

    		// Associate order with package
    		$order->packages()->attach((int)$registrant['package']);
    	}

    	return response()
                ->json(['status' => 'complete', 'data' => $order]);
    }
}
