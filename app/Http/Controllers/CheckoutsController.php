<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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

  	// Create order
  	$order = new Order();
  	$order->event_id = $event->id;
  	$order->first_name = $request->customer_first_name;
  	$order->last_name = $request->customer_last_name;
  	$order->email = $request->customer_email;
  	$order->save();

  	// Create the attendant
  	$order_total = 0;
  	foreach($request->registrants as $registrant) {
	  	$attendant = new Attendant();
	  	$attendant->event_id = $event->id;
	  	$attendant->order_id = $order->id;
	  	$attendant->group_id = (int)$registrant['group'];
	  	$attendant->package_id = (int)$registrant['package'];

	  	$attendant->first_name = $registrant['first_name'];
	  	$attendant->last_name = $registrant['last_name'];
	  	$attendant->email = $registrant['email'];

	  	$attendant->custom_properties = [
	  		'roomates' => $registrant['roomates'],
	  		'dietary' => $registrant['dietary'],
	  	];
	  	$attendant->save();
	  	$order_total += Package::find($registrant['package'])->price;
  	}
  	$order->order_total = $order_total;
  	$order->save();


  	// Create payment
  	$payment = $order->payments()->create([
  		'payment_type' => 'order',
  		'amount' => $order_total,
  		'transaction_id' => "test",
  		'transaction_date' => Carbon::now()
  	]);
  	return $attendant;
  }
}
