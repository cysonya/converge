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

      return $event;
  }
}
