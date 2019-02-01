<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Event;
use App\Package;

class AdminPackagesController extends Controller
{

	/**
	 * Show all packages in event
	 * @param Request $request
	 * @param $event_id
	 * @return view
	 */
    public function index(Request $request, $event_id)
    {
    	$event = Event::findOrFail($event_id);
    	return $event->packages;
    }

    /**
    * Show the create package form
    *
    * @return \Illuminate\View\View
    */

    public function create($event_id)
    {
        return view('admin.create_packages')->with('event_id', $event_id);
    }

    /**
    * Create a package
    *
    * @param  Request $request
    * @return json
    */
  	public function store(Request $request, $event_id)
  	{
  		$event = Event::findOrFail($event_id);

  		$package = $event->packages()->create(request(['title', 'description', 'price', 'quantity_available']));
  		return $package;
  	}
}
