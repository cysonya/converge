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
  public function order()
  {
      return $this->belongsToMany(\App\Order::class);
  }
}
