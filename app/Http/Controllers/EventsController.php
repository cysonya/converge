<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Event;

class EventsController extends Controller
{
	/**
	 * Show the homepage for an event
	 *
	 * @param Request $request
	 * @param integer $event_id
	 * @param string $slug
	 * @return view
	 */
   public function show(Request $request, $event_id, $slug = '')
   {
   	$event = Event::findOrFail($event_id);

   	return view('show_events')
   		->withGroups($event->groups)
   		->withPackages($event->packages)
   		->with('event_id', $event_id);
   }
}
