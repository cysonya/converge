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

    	return view('application');
    }

    /**
    * Test event mailer from view
    * @return string
    */
    public function mail()
    {
        $emailJob = (new SendEmailJob())->delay(Carbon::now()->addSeconds(3));
        dispatch($emailJob);
        echo "great";
    }
}
