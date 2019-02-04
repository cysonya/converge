<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Event;

class EventsController extends Controller
{
    /**
    * Display the specified resource.
    *
    * @param  int  $event_id
    * @return \Illuminate\Http\Response
    */
    public function show($event_id)
    {
        $event = Event::findOrFail($event_id);

        $packages = $event->packages->map(function($package) {
            return $package->only(['id', 'title', 'description', 'price', 'quantity_available']);
        });
        $groups = $event->groups->map(function($group) {
            return $group->only(['id', 'description']);
        });

        return response()->json([
            'id' => $event->id,
            'title' => $event->title,
            'description' => $event->description,
            'start_date' => $event->start_date,
            'end_date' => $event->end_date,
            'step' => 1,
            'packages' => $packages,
            'groups' => $groups
        ]);
    }
}
