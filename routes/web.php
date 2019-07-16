<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('app_react');
});

Auth::routes(['register' => false]);


Route::get('/events/{event_id}', [
	'as' => 'showEventPage',
	'uses' => 'EventsController@show'
]);

Route::post('/events/{event_id}/checkout', [
    'as' => 'postCreateOrder',
    'uses' => 'CheckoutsController@store',
]);

Route::post('/check_coupon', 'CheckoutsController@checkCoupon');
Route::post('contact', 'EventsController@contact');


/*
 * Admin routes - set all to React view
 */
Route::group(['prefix' => 'admin', 'middleware' => 'is_admin'], function() {
    Route::get('/events/{event_id}/attendants/export', 'AdminAttendantsController@export');

	Route::view('/{path?}', 'admin_react')
		->where('path', '.*')
		->name('react');
});
