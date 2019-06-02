<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Coupon extends Model
{
    public function isValid() 
    {
        return Carbon::now()->lessThan($this->expiry_date);
    }
}
