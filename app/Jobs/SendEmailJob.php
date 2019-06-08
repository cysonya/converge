<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

use Illuminate\Support\Facades\Mail;
use App\Mail\ContactSupportMailable;

class SendEmailJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    protected $request;
    protected $userAgent;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($request, $userAgent)
    {
        $this->request = $request;
        $this->userAgent = $userAgent;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        Mail::to('cysonya@gmail.com')
            ->bcc(explode(',', env('ADMIN_EMAILS')))
            ->send(new ContactSupportMailable($this->request, $this->userAgent));
    }
}
