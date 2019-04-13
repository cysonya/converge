<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Str;

class User extends Authenticatable
{
    use Notifiable;

    const ADMIN_TYPE = 'admin';
    const DEFAULT_TYPE = 'default';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name', 'last_name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    // public $incrementing = false;

    public static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            $model->uuid = $model->generateNewId();
        });
    }

    public function generateNewId()
    {
      return (string) Str::uuid();
    }

    public function getKeyType()
    {
        return 'string';
    }


    /**
     * Check if user is an admin
     * @return boolean
     */
    public function isAdmin() {
        return $this->type === self::ADMIN_TYPE;
    }

    /**
      * Get user full name
      *
      * @return string
      */
    public function getNameAttribute() {
        return $this->first_name . ' ' . $this->last_name;
    }

    /**
     * Roll API Key
     *
     * @return bool
     */
    public function rollApiKey(){
       do {
          $this->api_token = str_random(60);
       } while($this->where('api_token', $this->api_token)->exists());
       $this->save();
    }
}
