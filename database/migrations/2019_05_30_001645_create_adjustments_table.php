<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAdjustmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('adjustments', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('order_id')->index();
            $table->string('label');
            $table->enum('type', ['coupon']);
            $table->smallInteger('rate')->nullable();
            $table->decimal('amount', 8, 2);
            $table->timestamps();
            
            $table->foreign('order_id')->references('id')->on('orders');
        });
        Schema::create('coupons', function (Blueprint $table) {
            $table->increments('id');
            $table->string('code', 32)->unique()->index();
            $table->string('description', 255)->nullable();
            $table->enum('type', ['percent', 'amount', 'package_off']);
            $table->smallInteger('discount_amount')->nullable();
            $table->smallInteger('discount_rate')->nullable();
            $table->dateTime('expiry_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('adjustments');
        Schema::dropIfExists('coupons');
    }
}
