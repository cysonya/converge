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
        DB::table('users')->insert([
        	'first_name' => 'Admin',
        	'last_name' => '',
        	'email' => 'admin@converge.com',
        	'password' => bcrypt('converge123'),
        	'type' => 'admin'
        ]);
    }
}
