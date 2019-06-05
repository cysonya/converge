<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Adjustment extends Model
{
    /**
     * Allow mass assignment
     *
     * @var array
    */
    protected $guarded = [];
    
    /**
    * The adjustment associated with the order.
    *
    * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
    */
    public function order()
    {
        return $this->belongsTo(\App\Order::class);
    }
}
