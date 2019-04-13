<?php

use Illuminate\Database\Seeder;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = [
            [
                'first_name' => 'Admin',
                'last_name' => '',
                'email' => 'cysonya@gmail.com',
                'password' => bcrypt('converge123'),
                'type' => 'admin',
                'api_token' => str_random(60)
            ],
            [
                'first_name' => 'Jerry',
                'last_name' => 'Wierwille',
                'email' => 'jerry.wierwille@gmail.com',
                'password' => bcrypt('converge123'),
                'type' => 'admin',
                'api_token' => str_random(60)
            ],
            [
                'first_name' => 'Sean',
                'last_name' => 'Finnegan',
                'email' => 'sean@lhim.org',
                'password' => bcrypt('converge123'),
                'type' => 'admin',
                'api_token' => str_random(60)
            ]
        ];
        foreach ($users as $user) {
            \App\User::create($user);
        }
    }
}
