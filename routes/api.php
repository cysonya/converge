<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::get('/events', 'API\EventsController@index');
Route::group(['middleware' => ['auth:api','is_admin']], function() {
	Route::get('/events', 'API\EventsController@index');
	Route::get('/events/{event_id}/dashboard', 'API\EventsController@dashboard');
	Route::post('/events/{event_id}/packages/{package_id}', 'API\EventsController@updatePackage');
});

Route::get('/events/{event_id}/{event_slug?}', 'API\EventsController@show');
