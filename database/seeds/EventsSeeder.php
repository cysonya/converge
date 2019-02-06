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
      DB::table('event_groups')->delete();

      // Seed event
      App\Event::create([
      	'id' => 1,
      	'title' => 'Converge 2019',
      	'start_date' => Carbon\Carbon::createFromFormat('Y-m-d', '2019-08-02'),
        'end_date' => Carbon\Carbon::createFromFormat('Y-m-d', '2019-08-04'),
        'social_share_text' => "I am going to Converge!",
        'created_at' => Carbon\Carbon::now(),
      	'updated_at' => Carbon\Carbon::now(),
      ]);

      // Seed event packages
      $packages = [
      	[
      		'id' => 1,
      		'event_id' => 1,
      		'title' => "Townhouse",
          'description' => "Some description about townhouse",
          'price' => 250,
          'quantity_available' => 1,
          'created_at' => Carbon\Carbon::now(),
          'updated_at' => Carbon\Carbon::now(),
        ],
        [
          'id' => 2,
          'event_id' => 1,
          'title' => "Bowler Hall",
          'description' => "",
          'price' => 200,
          'quantity_available' => 2,
          'created_at' => Carbon\Carbon::now(),
          'updated_at' => Carbon\Carbon::now(),
        ],
        [
          'id' => 3,
          'event_id' => 1,
          'title' => "East Hall",
          'description' => "",
          'price' => 200,
          'quantity_available' => 2,
          'created_at' => Carbon\Carbon::now(),
          'updated_at' => Carbon\Carbon::now(),
        ],
        [
          'id' => 4,
          'event_id' => 1,
          'title' => "Dorm",
          'description' => "",
          'description' => "No AC",
          'price' => 150,
          'quantity_available' => 2,
          'created_at' => Carbon\Carbon::now(),
          'updated_at' => Carbon\Carbon::now(),
        ],
        [
          'id' => 5,
          'event_id' => 1,
          'title' => "Tent",
      		'description' => "",
          'price' => 100,
      		'quantity_available' => 2,
          'created_at' => Carbon\Carbon::now(),
          'updated_at' => Carbon\Carbon::now(),
      	]
      ];
      App\Package::insert($packages);

      $event_groups = [
        [
          'id' => 1,
          'event_id' => 1,
          'description' => "Adult (18+)",
          'created_at' => Carbon\Carbon::now(),
          'updated_at' => Carbon\Carbon::now(),
        ],
        [
          'id' => 2,
          'event_id' => 1,
          'description' => "Teen (13-17)",
          'created_at' => Carbon\Carbon::now(),
          'updated_at' => Carbon\Carbon::now(),
        ],
        [
          'id' => 3,
          'event_id' => 1,
          'description' => "Child (7-12)",
          'created_at' => Carbon\Carbon::now(),
          'updated_at' => Carbon\Carbon::now(),
        ],
        [
          'id' => 4,
          'event_id' => 1,
          'description' => "Child (4-6)",
          'created_at' => Carbon\Carbon::now(),
          'updated_at' => Carbon\Carbon::now(),
        ],
        [
          'id' => 5,
          'event_id' => 1,
          'description' => "Toddlers (1-3)",
          'created_at' => Carbon\Carbon::now(),
          'updated_at' => Carbon\Carbon::now(),
        ],
      ];

      App\EventGroup::insert($event_groups);
    }
}
