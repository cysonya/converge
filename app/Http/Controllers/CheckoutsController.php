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

  	// Create the attendant
  	foreach($request->registrants as $registrant) {
	  	$attendant = new Attendant();
	  	$attendant->event_id = $event->id;
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
  }
}
