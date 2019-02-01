<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
	/**
	 * Allow mass assignment
	 *
	 * @var array
	*/
	protected $guarded = [];

    /**
    * Boot all of the bootable traits on the model.
    */
    public static function boot()
    {
        parent::boot();

        static::creating(function ($order) {
          $order->number = 'C' . strtoupper(str_random(5)) . date('jn');
        });
    }

    /**
    * The attendants associated with the order.
    *
    * @return \Illuminate\Database\Eloquent\Relations\HasMany
    */
    public function attendants()
    {
        return $this->hasMany(\App\Attendant::class);
    }

    /**
    * The event associated with the order.
    *
    * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
    */
    public function event()
    {
        return $this->belongsTo(\App\Event::class);
    }

    /**
    * The packages associated with the order.
    *
    * @return \Illuminate\Database\Eloquent\Relations\HasMany
    */
    public function packages()
    {
        return $this->belongsToMany(\App\Package::class);
    }

    /**
    * The attendants associated with the order.
    *
    * @return \Illuminate\Database\Eloquent\Relations\HasMany
    */
    public function payments()
    {
        return $this->hasMany(\App\Payment::class);
    }

}
