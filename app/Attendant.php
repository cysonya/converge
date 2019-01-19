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
   * The package associated with the attendee.
   *
   * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
   */
  public function package()
  {
      return $this->belongsTo(\App\Package::class);
  }

  /**
   * The event associated with the attendee.
   *
   * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
   */
  public function event()
  {
      return $this->belongsTo(\App\Event::class);
  }
}
