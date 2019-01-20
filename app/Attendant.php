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
   * Cast custom property attribute
   * @var array
   */
  protected $casts = [
    'custom_properties' => 'string',
    'roomates' => 'string'
  ]

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
