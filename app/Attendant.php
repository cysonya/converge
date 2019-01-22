<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Attendant extends Model
{
	use SoftDeletes;

	/**
	 * Attributes not mass assignable.
	 * @var array $guarded
	 */
	protected $guarded = ['is_refunded', 'is_cancelled'];

  /**
   * Cast attributes to native types
   * @var array
   */
  protected $casts = [
    'custom_properties' => 'array',
  ];

  /**
   * The order associated with the attendant.
   *
   * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
   */
  public function order()
  {
      return $this->belongsTo(\App\Order::class);
  }

  /**
   * The package associated with the attendant.
   *
   * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
   */
  public function package()
  {
      return $this->belongsTo(\App\Package::class);
  }

  /**
   * The group associated with the attendant.
   *
   * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
   */
  public function group()
  {
      return $this->belongsTo(\App\EventGroup::class);
  }

  /**
   * The event associated with the attendant.
   *
   * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
   */
  public function event()
  {
      return $this->belongsTo(\App\Event::class);
  }
}
