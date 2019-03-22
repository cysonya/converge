<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use Carbon\Carbon;
use App\Event;

class EventsController extends Controller
{
    /**
     * All events listing
     *
     * @return json \Illuminate\Http\Response
     */
    public function index()
    {
        $events = Event::withCount('attendants')->get();
        return response()->json([
            'events' => $events
        ]);
    }

    /**
     * Event dashboard
     *
     * @param $event_id int
     *  @return json \Illuminate\Http\Response
     */
    public function dashboard($event_id)
    {
        $event = Event::findOrFail($event_id)->withCount(['orders','attendants'])->get()->first();
        $event->total_donation = $event->payments()->where('payment_type','donation')->sum('amount');
        $event->total_revenue = $event->payments()->where('payment_type','order')->sum('amount');

        return response()->json([
            'event' => $event,
            'packages' => $event->packages()->get(),
            'orders' => $event->orders()->with('payments')->get(),
            'attendants' => $event->attendants()->get()
        ]);
    }

    /**
    * Single event data
    *
    * @param  int  $event_id
    * @return \Illuminate\Http\Response
    */
    public function show($event_id)
    {
        $event = Event::findOrFail($event_id);

        $packages = $event->packages()->available()->get()->map(function($package) {
            // for UI to show remaining after selection
            $package->remain = $package->quantity_remaining;
            return $package->only(['id', 'title', 'description', 'price', 'quantity_remaining', 'remain']);
        });
        $groups = $event->groups->map(function($group) {
            return $group->only(['id', 'description']);
        });

        $start_date = Carbon::parse($event->start_date);
        $end_date = Carbon::parse($event->end_date);

        return response()->json([
            'id' => $event->id,
            'title' => $event->title,
            'description' => $event->description,
            'social_share_text' => $event->social_share_text,
            'date_range' => $start_date->format('M j') . '-' . $end_date->format('j'),
            'start_date' => $event->start_date,
            'end_date' => $event->end_date,
            'step' => 1,
            'packages' => $packages,
            'groups' => $groups
        ]);
    }
}
