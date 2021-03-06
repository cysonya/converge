<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Event;

use Illuminate\Support\Facades\Mail;
use App\Mail\EventMailable;
use App\Jobs\SendEmailJob;
use Carbon\Carbon;
class EventsController extends Controller
{
	/**
	 * Show event
	 *
	 * @param Request $request
	 * @param integer $event_id
	 * @param string $slug
	 * @return view
	 */
    public function show(Request $request, $event_id)
    {
    	$event = Event::findOrFail($event_id);
    	return view('app_react');
    }

    /**
    * Dispatch contact support email job
    * @return json
    */
    public function contact(Request $request)
    {
        $emailJob = (new SendEmailJob($request->all(), $request->header('User-Agent')));
        dispatch($emailJob);

        return response()
                ->json(['status' => 'complete', 'data' => $request->all()['name']]);
    }
}
