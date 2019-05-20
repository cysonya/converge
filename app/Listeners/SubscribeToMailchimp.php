<?php

namespace App\Listeners;

use App\Events\UserSignedUp;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

use Newsletter;

class SubscribeToMailchimp
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     * Subscribe user to Mailchimp
     *
     * @param  UserSignedUp  $event
     * @return void
     */
    public function handle(UserSignedUp $event)
    {
        $order = $event->order;
        Newsletter::subscribeOrUpdate($order->email, ['FNAME'=>$order->first_name, 'LNAME'=>$order->last_name]);
    }
}
