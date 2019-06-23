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

        // $registrants = array (
        //     0 => 
        //     array (
        //     'No.' => 1,
        //     'First Name' => 'Horace',
        //     'Last Name' => 'Chan',
        //     'Age group' => 'Adults',
        //     'Email' => 'chanhor1995@gmail.com',
        //     'Affiliation' => 'Christian Disciples Church',
        //     ),
        //     1 => 
        //     array (
        //     'No.' => 2,
        //     'First Name' => 'Langer',
        //     'Last Name' => 'Wang',
        //     'Age group' => 'Adults',
        //     'Email' => 'langer3633@hotmail.com',
        //     'Affiliation' => 'Christian Disciples Church',
        //     ),
        //     2 => 
        //     array (
        //     'No.' => 3,
        //     'First Name' => 'Hua',
        //     'Last Name' => 'Liang',
        //     'Age group' => 'Adults',
        //     'Email' => 'torontocdc@gmail.com',
        //     'Affiliation' => 'Christian Disciples Church',
        //     ),
        //     3 => 
        //     array (
        //     'No.' => 4,
        //     'First Name' => 'Paula',
        //     'Last Name' => 'Ho',
        //     'Age group' => 'Adults',
        //     'Email' => 'Ho.paula@yahoo.com',
        //     'Affiliation' => 'Christian Disciples Church',
        //     ),
        //     4 => 
        //     array (
        //     'No.' => 5,
        //     'First Name' => 'Lewis',
        //     'Last Name' => 'Chan',
        //     'Age group' => 'Adults',
        //     'Email' => 'letachch@gmail.com',
        //     'Affiliation' => 'Christian Disciples Church',
        //     ),
        //     5 => 
        //     array (
        //     'No.' => 6,
        //     'First Name' => 'Joanna',
        //     'Last Name' => 'Chan',
        //     'Age group' => 'Adults',
        //     'Email' => 'jochan166@gmail.com',
        //     'Affiliation' => 'Christian Disciples Church',
        //     ),
        //     6 => 
        //     array (
        //     'No.' => 7,
        //     'First Name' => 'Evan',
        //     'Last Name' => 'Chen',
        //     'Age group' => 'Adults',
        //     'Email' => 'evanchen.cs@gmail.com',
        //     'Affiliation' => 'Christian Disciples Church',
        //     ),
        //     7 => 
        //     array (
        //     'No.' => 8,
        //     'First Name' => 'Eric',
        //     'Last Name' => 'Gauthier',
        //     'Age group' => 'Adults',
        //     'Email' => 'Ericgauthier96@gmail.com',
        //     'Affiliation' => 'Christian Disciples Church',
        //     ),
        //     8 => 
        //     array (
        //     'No.' => 9,
        //     'First Name' => 'Shane',
        //     'Last Name' => 'Liu',
        //     'Age group' => 'Adults',
        //     'Email' => 'lx1326607292@gmail.com',
        //     'Affiliation' => 'Christian Disciples Church',
        //     ),
        //     9 => 
        //     array (
        //     'No.' => 10,
        //     'First Name' => 'Stan',
        //     'Last Name' => 'Chee',
        //     'Age group' => 'Adults',
        //     'Email' => 'stanintoronto@gmail.com',
        //     'Affiliation' => 'Christian Disciples Church',
        //     ),
        //     10 => 
        //     array (
        //     'No.' => 11,
        //     'First Name' => 'Pam',
        //     'Last Name' => 'Chee',
        //     'Age group' => 'Adults',
        //     'Email' => 'pamintoronto@gmail.com',
        //     'Affiliation' => 'Christian Disciples Church',
        //     ),
        //     11 => 
        //     array (
        //     'No.' => 12,
        //     'First Name' => 'Calvin',
        //     'Last Name' => 'Chan',
        //     'Age group' => 'Adults',
        //     'Email' => 'calchan153@gmail.com',
        //     'Affiliation' => 'Christian Disciples Church',
        //     ),
        //     12 => 
        //     array (
        //     'No.' => 13,
        //     'First Name' => 'Helen',
        //     'Last Name' => 'Chan',
        //     'Age group' => 'Adults',
        //     'Email' => 'hlcchan153@hotmail.com',
        //     'Affiliation' => 'Christian Disciples Church',
        //     ),
        //     13 => 
        //     array (
        //     'No.' => 14,
        //     'First Name' => 'Miranda',
        //     'Last Name' => 'Shou',
        //     'Age group' => 'Adults',
        //     'Email' => '706927954@qq.com',
        //     'Affiliation' => 'Christian Disciples Church',
        //     ),
        //     14 => 
        //     array (
        //     'No.' => 15,
        //     'First Name' => 'Boo',
        //     'Last Name' => 'Tan',
        //     'Age group' => 'Adults',
        //     'Email' => 'wesdhar@yahoo.ca.',
        //     'Affiliation' => 'Christian Disciples Church',
        //     ),
        //     15 => 
        //     array (
        //     'No.' => 16,
        //     'First Name' => 'Elizabeth',
        //     'Last Name' => 'Tan',
        //     'Age group' => 'Adults',
        //     'Email' => 'wesdhar@yahoo.ca.',
        //     'Affiliation' => 'Christian Disciples Church',
        //     ),
        //     16 => 
        //     array (
        //     'No.' => 17,
        //     'First Name' => 'James',
        //     'Last Name' => 'Ho',
        //     'Age group' => 'Adults',
        //     'Email' => 'jianho2013@yahoo.com',
        //     'Affiliation' => 'Christian Disciples Church',
        //     ),
        //     17 => 
        //     array (
        //     'No.' => 18,
        //     'First Name' => 'Kathleen',
        //     'Last Name' => 'Ho',
        //     'Age group' => 'Adults',
        //     'Email' => 'jianho2013@yahoo.com',
        //     'Affiliation' => 'Christian Disciples Church',
        //     ),
        //     18 => 
        //     array (
        //     'No.' => 21,
        //     'First Name' => 'Kylin',
        //     'Last Name' => 'Zhang',
        //     'Age group' => 'Adults',
        //     'Email' => 'zhangyuniu0429@hotmail.com',
        //     'Affiliation' => 'Christian Disciples Church',
        //     ),
        //     19 => 
        //     array (
        //     'No.' => 22,
        //     'First Name' => 'Bonnie',
        //     'Last Name' => 'Kwok',
        //     'Age group' => 'Adults',
        //     'Email' => 'bonniekhk@yahoo.ca',
        //     'Affiliation' => 'Christian Disciples Church',
        //     ),
        //     20 => 
        //     array (
        //     'No.' => 23,
        //     'First Name' => 'Jasmine',
        //     'Last Name' => 'Zeng',
        //     'Age group' => 'Adults',
        //     'Email' => 'jasminezengyimin@gmail.com',
        //     'Affiliation' => 'Christian Disciples Church',
        //     ),
        //     21 => 
        //     array (
        //     'No.' => 24,
        //     'First Name' => 'Xing Min',
        //     'Last Name' => 'Su',
        //     'Age group' => 'Adults',
        //     'Email' => 'xingmin92@gmail.com',
        //     'Affiliation' => 'Christian Disciples Church',
        //     ),
        //     22 => 
        //     array (
        //     'No.' => 25,
        //     'First Name' => 'Meng Ping',
        //     'Last Name' => 'Jiang',
        //     'Age group' => 'Adults',
        //     'Email' => 'meng_ping@hotmail.com',
        //     'Affiliation' => 'Christian Disciples Church',
        //     ),
        //     23 => 
        //     array (
        //     'No.' => 26,
        //     'First Name' => 'Christie',
        //     'Last Name' => 'Zhu',
        //     'Age group' => 'Adults',
        //     'Email' => 'Christiez0910@gmail.com',
        //     'Affiliation' => 'Christian Disciples Church',
        //     ),
        //     24 => 
        //     array (
        //     'No.' => 27,
        //     'First Name' => 'Sonya',
        //     'Last Name' => 'Chan',
        //     'Age group' => 'Adults',
        //     'Email' => 'sonyachan@hotmail.com',
        //     'Affiliation' => 'Christian Disciples Church',
        //     ),
        //     25 => 
        //     array (
        //     'No.' => 28,
        //     'First Name' => 'Simon',
        //     'Last Name' => 'Chen',
        //     'Age group' => 'Adults',
        //     'Email' => 'Huachen1230@gmail.com',
        //     'Affiliation' => 'Christian Disciples Church',
        //     ),
        //     26 => 
        //     array (
        //     'No.' => 29,
        //     'First Name' => 'Joanna Fei',
        //     'Last Name' => 'Fei',
        //     'Age group' => 'Adults',
        //     'Email' => 'joanna.fei@hotmail.com',
        //     'Affiliation' => 'Christian Disciples Church',
        //     ),
        //     27 => 
        //     array (
        //     'No.' => 30,
        //     'First Name' => 'Frank Zhu',
        //     'Last Name' => 'Zhu',
        //     'Age group' => 'Adults',
        //     'Email' => 'frankfanzhu@gmail.com',
        //     'Affiliation' => 'Christian Disciples Church',
        //     ),
        //     28 => 
        //     array (
        //     'No.' => 31,
        //     'First Name' => 'Sherri-Ann',
        //     'Last Name' => 'Zhu',
        //     'Age group' => 'Adults',
        //     'Email' => 'sherriannzhang@gmail.com',
        //     'Affiliation' => 'Christian Disciples Church',
        //     ),
        //     29 => 
        //     array (
        //     'No.' => 32,
        //     'First Name' => 'Brenda',
        //     'Last Name' => 'Guo',
        //     'Age group' => 'Adults',
        //     'Email' => '3161861@student.ocadu.ca',
        //     'Affiliation' => 'Christian Disciples Church',
        //     ),
        //     30 => 
        //     array (
        //     'No.' => 33,
        //     'First Name' => 'Grace',
        //     'Last Name' => 'Tong',
        //     'Age group' => 'Adults',
        //     'Email' => 'tong_grace113@hotmail.com',
        //     'Affiliation' => 'Christian Disciples Church',
        //     ),
        //     31 => 
        //     array (
        //     'No.' => 34,
        //     'First Name' => 'Caleb',
        //     'Last Name' => 'Yeo',
        //     'Age group' => 'Adults',
        //     'Email' => 'newsheep@hotmail.com',
        //     'Affiliation' => 'Christian Disciples Church',
        //     ),
        // );

        // $event = Event::find(1);

        // // Create order
        // $order = Order::create([
        //   'event_id' => $event->id,
        //   'first_name' => "Stan",
        //   'last_name' => "Chee",
        //   'order_total' => 4470,
        //   'status' => "completed",
        //   'email' => "stanintoronto@gmail.com",
        // ]);
        // $order->payments()->create([
        //     'event_id' => $event->id,
        //     'payment_type' => 'order',
        //     'amount' => 4470,
        //     'transaction_id' => 'offline_christian_disciples_church',
        //     'transaction_date' => Carbon::now()
        // ]);

        // foreach($registrants as $registrant) {
        //     $attendant = Attendant::create([
        //         'event_id' => $event->id,
        //         'order_id' => $order->id,
        //         'group_id' => 1,
        //         'package_id' => 2,
        //         'first_name' => strip_tags($registrant['First Name']),
        //         'last_name' => strip_tags($registrant['Last Name']),
        //         'email' => strip_tags($registrant['Email']),
        //         'custom_properties' => [
        //             'affiliate' => "Christian Disciples Church",
        //             'dietary' => "",
        //             'roommates' => "",
        //         ]
        //     ]);
        //     $order->packages()->attach(2);
        //     Newsletter::subscribeOrUpdate($attendant->email, ['FNAME'=>$attendant->first_name, 'LNAME'=>$attendant->last_name]);
        // }

        
    }
}
