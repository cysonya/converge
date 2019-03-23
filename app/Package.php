<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Package extends Model
{
    use SoftDeletes;

    /**
    * Allow mass assignment
    *
    * @var array
    */
    protected $guarded = [];

    /**
     * Adds attribute to query
     * @var array
     */
    protected $appends = ['quantity_remaining'];

    /**
    * The event associated with the package.
    *
    * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
    */
    public function event()
    {
        return $this->belongsTo(\App\Event::class);
    }

    /**
    * The order associated with the Package.
    *
    * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
    */
    public function orders()
    {
        return $this->belongsToMany(\App\Order::class);
    }

    /**
    * The groups associated with the Package.
    *
    * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
    */
    public function groups()
    {
        return $this->belongsToMany(\App\Group::class)->withPivot('price');
    }

    /**
     * Get the number of package remaining
     * @return int remaining spots left
     */
    public function getQuantityRemainingAttribute()
    {
        if (is_null($this->quantity_available)) {
            return 9999; //Better way to do this?
        }
        return $this->quantity_available - $this->quantity_sold;
    }

    /**
     * Scope a query to only include packages that are available
     * @param  $query
     */
    public function scopeAvailable($query)
    {
        return $query->whereRaw('is_paused = 0 and (quantity_available > quantity_sold or quantity_available IS NULL)');
    }
}
