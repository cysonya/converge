<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{

	protected $guarded = [];

    /**
    * The attendants associated with the order.
    *
    * @return \Illuminate\Database\Eloquent\Relations\HasMany
    */
    public function orders()
    {
        return $this->belongsTo(\App\Order::class);
    }
}
