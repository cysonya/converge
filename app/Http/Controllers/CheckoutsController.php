<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Attendant;
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
  	$order = new Order();
  	$packages = array_pluck($request->registrants, 'package');
  	$order_total = Package::find($packages);
  	return $order_total;
  	// Create the order
  	$order->first_name = $request->customer_first_name;
  	$order->last_name = $request->customer_last_name;
  	$order->email = $request->customer_email;
  	$order->order_total = Package::find($packages)->sum('price');
  	$order->save();
  	return $order;

  	// Create the attendant
  	foreach($request->registrants as $registrant) {
	  	$attendant = new Attendant();
	  	$attendant->event_id = $event->id;
	  	$attendant->order_id = 1;
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
  	}

  	return $attendant;



  	return $attendant;
  }
}
