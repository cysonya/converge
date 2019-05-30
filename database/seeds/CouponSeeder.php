<?php

use Illuminate\Database\Seeder;

class CouponSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('coupons')->insert([
            'code' => "SPEAKER19",
            'type' => 'package_off',
            'expiry_date' => Carbon\Carbon::createFromFormat('Y-m-d', '2019-08-04')
        ]);      
    }
}
