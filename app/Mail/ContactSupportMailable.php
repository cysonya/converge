<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class ContactSupportMailable extends Mailable
{
    use Queueable, SerializesModels;
    public $request;
    public $userAgent;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($request, $userAgent)
    {
        $this->request = $request;
        $this->userAgent = $userAgent;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {

        return $this
            ->subject("{$this->request['name']} Contacted Support")
            ->view('emails.contact');
    }
}
