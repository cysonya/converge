<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Event;
use App\Order;
use Illuminate\Support\Facades\Mail;
use App\Mail\OrderMailable;

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

   public function mail()
   {
       $order = Order::first();
       Mail::to('cysonya@gmail.com')->send(new OrderMailable($order));
       return 'Email sent';
   }
}
