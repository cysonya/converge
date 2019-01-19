<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Attendant;
use App\Event;
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
  	$package = Package::findOrFail($request->package);

  	// Create the attendant
  	$attendant = new Attendant();
  	$attendant->event_id = $event->id;
  	$attendant->package_id = $package->id;
  	$attendant->first_name = $request->first_name;
  	$attendant->last_name = $request->last_name;
  	$attendant->email = $request->email;
  	$attendant->save();

  	return $attendant;
  }
}
