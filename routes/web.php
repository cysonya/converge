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

Route::post('contact', 'EventsController@contact');


/*
 * Admin routes
 */
Route::group(['prefix' => 'admin', 'middleware' => 'is_admin'], function() {
	Route::get('/', 'AdminEventsController@react');
	Route::get('/events/{id}/dashboard', 'AdminEventsController@react');
	Route::get('/events/{id}/attendants', 'AdminEventsController@react');
	Route::get('/events/{id}/packages', 'AdminEventsController@react');
	Route::get('/events/{id}/settings', 'AdminEventsController@react');

	// OLD NON REACT
	// Events dashboard
	Route::group(['prefix' => 'events'], function() {
		Route::get('create', 'AdminEventsController@create');
		Route::post('store', [
			'as' => 'postCreateEvent',
			'uses' => 'AdminEventsController@store'
		]);
	});

	// Event Packages dashboard
	Route::group(['prefix' => 'events/{event_id}/packages'], function() {
		Route::get('/', [
			'as' => 'showEventPackages',
			'uses' => 'AdminPackagesController@index'
		]);
		Route::get('create', 'AdminPackagesController@create');
		Route::post('/', [
			'as' => 'postCreateEventPackage',
			'uses' => 'AdminPackagesController@store'
		]);
	});
});
