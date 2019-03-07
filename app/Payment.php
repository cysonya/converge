<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{

	protected $guarded = [];

    /**
    * The orders associated with the payment.
    *
    * @return \Illuminate\Database\Eloquent\Relations\HasMany
    */
    public function orders()
    {
        return $this->belongsTo(\App\Order::class);
    }

    /**
    * The events associated with the payment.
    *
    * @return \Illuminate\Database\Eloquent\Relations\HasMany
    */
    public function events()
    {
        return $this->belongsTo(\App\Event::class);
    }
}
