<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
	/**
	 * Allow mass assignment
	 * @var array
	 */
	protected $guarded = [];

    /**
    * The attendants associated with the group.
    *
    * @return \Illuminate\Database\Eloquent\Relations\HasMany
    */
    public function attendants()
    {
        return $this->hasMany(\App\Attendant::class);
    }
}
