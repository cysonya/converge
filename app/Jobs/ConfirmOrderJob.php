<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

use Illuminate\Support\Facades\Mail;
use App\Mail\OrderMailable;
class ConfirmOrderJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    protected $order;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($order)
    {
        $this->order = $order;

        $emails = [];
        if (\App::environment('production')) {
            $emails = [
                'cysonya@gmail.com',
                'sean@lhim.org',
                'jerry.wierwille@gmail.com'
            ];
        } else {
            $emails = ['cysonya@gmail.com'];
        }
        $this->emails = $emails;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        Mail::to($this->order->email)
            ->bcc($this->emails)
            ->send(new OrderMailable($this->order));
    }
}
