<?php

use Illuminate\Database\Seeder;

class EventsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      DB::table('events')->delete();
      DB::table('packages')->delete();

      // Seed event
      App\Event::create([
      	'id' => 1,
      	'title' => 'Event 2019',
      	'description' => 'Lorem Ipsum something cool.',
      	'start_date' => Carbon\Carbon::now()->addDays(20),
        'end_date' => Carbon\Carbon::now()->addDays(22),
        'created_at' => Carbon\Carbon::now(),
      	'updated_at' => Carbon\Carbon::now(),
      ]);

      // Seed event packages
      $packages = [
      	[
      		'id' => 1,
      		'event_id' => 1,
      		'title' => "Early bird",
      		'description' => "Be early pay less",
      		'price' => 22,
      		'quantity_available' => 1,
          'created_at' => Carbon\Carbon::now(),
          'updated_at' => Carbon\Carbon::now(),
      	],
      	[
      		'id' => 2,
      		'event_id' => 1,
      		'title' => "General admission",
      		'description' => "Lorem ipsum some descr",
      		'price' => 22,
      		'quantity_available' => 2,
          'created_at' => Carbon\Carbon::now(),
          'updated_at' => Carbon\Carbon::now(),
      	]
      ];
      App\Package::insert($packages);
    }
}
