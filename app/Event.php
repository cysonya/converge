<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    /**
    * Allow mass assignment
    *
    * @var array
    */
    protected $guarded = [];

    /**
    * The groups associated with the event.
    *
    * @return \Illuminate\Database\Eloquent\Relations\HasMany
    */
    public function groups()
    {
        return $this->hasMany(\App\Group::class);
    }

    /**
    * The attendants associated with the event.
    *
    * @return \Illuminate\Database\Eloquent\Relations\HasMany
    */
    public function attendants()
    {
        return $this->hasMany(\App\Attendant::class);
    }

    /**
    * The orders associated with the event.
    *
    * @return \Illuminate\Database\Eloquent\Relations\HasMany
    */
    public function orders()
    {
        return $this->hasMany(\App\Order::class);
    }

    /**
    * The packages associated with the event.
    *
    * @return \Illuminate\Database\Eloquent\Relations\HasMany
    */
    public function packages()
    {
        return $this->hasMany(\App\Package::class);
    }

    /**
    * The payments associated with the event.
    *
    * @return \Illuminate\Database\Eloquent\Relations\HasMany
    */
    public function payments()
    {
        return $this->hasMany(\App\Payment::class);
    }

    /**
    * Get the url of the event.
    *
    * @return string
    */
    public function getEventUrlAttribute()
    {
        return route("showEventPage", ["event_id"=>$this->id, "event_slug"=>Str::slug($this->title)]);
    }
}
