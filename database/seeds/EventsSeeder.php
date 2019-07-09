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
        DB::table('groups')->delete();

        // Seed event
        App\Event::create([
        	'id' => 1,
        	'title' => 'CONVERGE 2019',
        	'start_date' => Carbon\Carbon::createFromFormat('Y-m-d', '2019-08-02'),
            'end_date' => Carbon\Carbon::createFromFormat('Y-m-d', '2019-08-04'),
            'social_share_text' => "",
            'created_at' => Carbon\Carbon::now(),
            	'updated_at' => Carbon\Carbon::now(),
        ]);

        // Seed event packages
        $packages = [
          	[
          		'id' => 1,
          		'event_id' => 1,
          		'title' => "Townhouse",
              'description' => "",
              'quantity_available' => 72,
              'created_at' => Carbon\Carbon::now(),
              'updated_at' => Carbon\Carbon::now(),
            ],
            [
              'id' => 2,
              'event_id' => 1,
              'title' => "Dorm with AC",
              'description' => "",
              'quantity_available' => 145,
              'created_at' => Carbon\Carbon::now(),
              'updated_at' => Carbon\Carbon::now(),
            ],
            [
              'id' => 3,
              'event_id' => 1,
              'title' => "Dorm without AC",
              'description' => "",
              'quantity_available' => 230,
              'created_at' => Carbon\Carbon::now(),
              'updated_at' => Carbon\Carbon::now(),
            ],
            [
              'id' => 4,
              'event_id' => 1,
              'title' => "Bring your own tent",
              'description' => "",
              'quantity_available' => null,
              'created_at' => Carbon\Carbon::now(),
              'updated_at' => Carbon\Carbon::now(),
            ],
            [
              'id' => 5,
              'event_id' => 1,
              'title' => "Stay off campus",
          		'description' => "",
          		'quantity_available' => null,
              'created_at' => Carbon\Carbon::now(),
              'updated_at' => Carbon\Carbon::now(),
          	]
        ];
        App\Package::insert($packages);

        $groups = [
            [
              'id' => 1,
              'event_id' => 1,
              'description' => "Adults (14+)",
              'created_at' => Carbon\Carbon::now(),
              'updated_at' => Carbon\Carbon::now(),
            ],
            [
              'id' => 2,
              'event_id' => 1,
              'description' => "Children (10-13)",
              'created_at' => Carbon\Carbon::now(),
              'updated_at' => Carbon\Carbon::now(),
            ],
            [
              'id' => 3,
              'event_id' => 1,
              'description' => "Children (4-9)",
              'created_at' => Carbon\Carbon::now(),
              'updated_at' => Carbon\Carbon::now(),
            ],
            [
              'id' => 4,
              'event_id' => 1,
              'description' => "Toddlers (0-3)",
              'created_at' => Carbon\Carbon::now(),
              'updated_at' => Carbon\Carbon::now(),
            ]
        ];

        App\Group::insert($groups);

        $group_package = [
            [
              'group_id' => 1,
              'package_id' => 1,
              'price' => 169
            ],
            [
              'group_id' => 2,
              'package_id' => 1,
              'price' => 79
            ],
            [
              'group_id' => 3,
              'package_id' => 1,
              'price' => 58
            ],
            [
              'group_id' => 4,
              'package_id' => 1,
              'price' => 0
            ],
            [
              'group_id' => 1,
              'package_id' => 2,
              'price' => 149
            ],
            [
              'group_id' => 2,
              'package_id' => 2,
              'price' => 79
            ],
            [
              'group_id' => 3,
              'package_id' => 2,
              'price' => 58
            ],
            [
              'group_id' => 4,
              'package_id' => 2,
              'price' => 0
            ],
            [
              'group_id' => 1,
              'package_id' => 3,
              'price' => 129
            ],
            [
              'group_id' => 2,
              'package_id' => 3,
              'price' => 65
            ],
            [
              'group_id' => 3,
              'package_id' => 3,
              'price' => 44
            ],
            [
              'group_id' => 4,
              'package_id' => 3,
              'price' => 0
            ],
            [
              'group_id' => 1,
              'package_id' => 4,
              'price' => 60
            ],
            [
              'group_id' => 2,
              'package_id' => 4,
              'price' => 25
            ],
            [
              'group_id' => 3,
              'package_id' => 4,
              'price' => 25
            ],
            [
              'group_id' => 4,
              'package_id' => 4,
              'price' => 0
            ],
            [
              'group_id' => 1,
              'package_id' => 5,
              'price' => 60
            ],
            [
              'group_id' => 2,
              'package_id' => 5,
              'price' => 25
            ],
            [
              'group_id' => 3,
              'package_id' => 5,
              'price' => 25
            ],
            [
              'group_id' => 4,
              'package_id' => 5,
              'price' => 0
            ],

        ];
        DB::table('group_package')->insert($group_package);


    //     $event = Event::find(1);
    //     $registrants = array(
    //         0 => 
    //         array (
    //         'No.' => 1,
    //         'First Name' => 'Lean',
    //         'Last Name' => 'Lim',
    //         'Age group' => 'Adults',
    //         'Email' => 'leanlim04@gmail.com',
    //         'Affiliation' => 'Christian Disciples Church',
    //         ),
    //         1 => 
    //         array (
    //         'No.' => 2,
    //         'First Name' => 'Ann',
    //         'Last Name' => 'Leung',
    //         'Age group' => 'Vu',
    //         'Email' => 'Ann.vu624@gmail.com',
    //         'Affiliation' => 'Christian Disciples Church',
    //         ),
    //     );

    //     // Create order
    //     $order = Order::create([
    //       'event_id' => $event->id,
    //       'first_name' => "Stan",
    //       'last_name' => "Chee",
    //       'order_total' => 4768,
    //       'status' => "completed",
    //       'email' => "stanintoronto@gmail.com",
    //     ]);
    //     $order->payments()->create([
    //         'event_id' => $event->id,
    //         'payment_type' => 'order',
    //         'amount' => 4768,
    //         'transaction_id' => 'offline_christian_disciples_church',
    //         'transaction_date' => Carbon::now()
    //     ]);

    //     foreach($registrants as $registrant) {
    //         $attendant = Attendant::create([
    //             'event_id' => $event->id,
    //             'order_id' => $order->id,
    //             'group_id' => 1,
    //             'package_id' => 2,
    //             'first_name' => strip_tags($registrant['First Name']),
    //             'last_name' => strip_tags($registrant['Last Name']),
    //             'email' => strip_tags($registrant['Email']),
    //             'custom_properties' => [
    //                 'affiliate' => "Christian Disciples Church",
    //                 'dietary' => "",
    //                 'roommates' => "",
    //             ]
    //         ]);
    //         $order->packages()->attach(2);
    //         Newsletter::subscribeOrUpdate($attendant->email, ['FNAME'=>$attendant->first_name, 'LNAME'=>$attendant->last_name]);
    //     }

    //     $order->payments()->create([
    //         'event_id' => 1,
    //         'payment_type' => 'donation',
    //         'amount' => 298,
    //         'transaction_id' => 'offline_christian_disciples_church_donation',
    //         'transaction_date' => Carbon::now()
    //     ]);
    // }
}
