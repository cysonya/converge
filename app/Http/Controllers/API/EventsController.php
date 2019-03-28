<?php

namespace App\Http\Controllers\API;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use Carbon\Carbon;
use App\Event;
use App\Package;

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

        $packages = $event->packages()->with('groups')->get();

        return response()->json([
            'event' => $event,
            'packages' => $packages,
            'orders' => $event->orders()->with('payments')->get(),
            'attendants' => $event->attendants()->get()
        ]);
    }

    /**
    * Single event data
    *
    * @param  int  $event_id
    * @return \Illuminate\Http\Respon
    */
    public function show($event_id)
    {
        $event = Event::findOrFail($event_id);

        $packages = $event->packages()->available()->with('groups')->get()->map(function($package) {
            // Get only group id and price
            $package->groups = $package->groups->map(function($group) {
                $group->id = $group->id;
                $group->price = $group->pivot->price;
                return $group->only(['id', 'price']);
            });
            // for UI to show remaining after selection
            $package->remain = $package->quantity_remaining;
            return $package->only(['id', 'title', 'description', 'quantity_remaining', 'remain', 'groups']);
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

    public function updatePackage(Request $request, $event_id, $package_id)
    {
        $package = Package::find($package_id);
        $package->update(array_only($request->all(), ['title', 'description', 'quantity_available', 'is_paused']));

        // Update group pricing
        foreach ($request->groups as $group ) {
            $package->groups()->updateExistingPivot($group['id'], ['price' => $group['pivot']['price']]);
        }
        // attach group data to response
        $package->groups = $package->groups;

        return response()
            ->json(['status' => "success", 'data' => $package]);
    }
}
