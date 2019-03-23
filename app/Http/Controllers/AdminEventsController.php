<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Event;

// Todo: Add auth middleware
class AdminEventsController extends Controller
{
	/**
	 * Show admin react template
	 *
	 * @return \Illuminate\View\View
	 */
	public function react()
	{
		return view('admin_react');
	}

	/**
	 * Show the create event form
	 *
	 * @return \Illuminate\View\View
	 */

	public function create()
	{
        return view('admin.create_events');
	}


    /**
     * Create an event
     *
     * @param  Request $request
     * @return json
     */
	public function store(Request $request)
	{
		$event = Event::create(request(['title', 'description', 'start_date', 'end_date']));

		return $event;
	}
}
