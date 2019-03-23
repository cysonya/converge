<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAttendantsEventsPackagesTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('events', function (Blueprint $table) {
      $table->increments('id');
      $table->string('title');
      $table->text('description')->nullable();

      $table->dateTime('start_date')->nullable();
      $table->dateTime('end_date')->nullable();

      $table->text('social_share_text')->nullable();
      $table->timestamps();
      $table->softDeletes();
    });

    Schema::create('packages', function (Blueprint $table) {
      $table->increments('id');

      $table->unsignedInteger('event_id')->index();
      $table->foreign('event_id')->references('id')->on('events')->onDelete('cascade');

      $table->string('title');
      $table->text('description')->nullable();
      $table->integer('quantity_available')->nullable()->default(null);
      $table->integer('quantity_sold')->default(0);
      $table->tinyInteger('is_paused')->default(0);

      $table->timestamps();
      $table->softDeletes();
    });

    Schema::create('orders', function (Blueprint $table) {
      $table->increments('id');
      $table->unsignedInteger('event_id')->index();
      $table->string('number');

      $table->string('first_name');
      $table->string('last_name');
      $table->string('email');
      $table->string('stripe_customer_id')->nullable();
      $table->decimal('order_total', 13, 2)->default(0.00);

      $table->enum('status', ['completed', 'refunded', 'partially refunded'])->nullable();

      $table->text('notes')->nullable();
      $table->timestamps();
      $table->softDeletes();

      $table->foreign('event_id')->references('id')->on('events')->onDelete('cascade');
    });

    /*
     * Packages / Orders pivot table
     */
    Schema::create('order_package', function ($table) {
      $table->increments('id');
      $table->integer('order_id')->unsigned()->index();
      $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');
      $table->integer('package_id')->unsigned()->index();
      $table->foreign('package_id')->references('id')->on('packages')->onDelete('cascade');
    });

    Schema::create('payments', function (Blueprint $table) {
      $table->increments('id');
      $table->unsignedInteger('order_id')->index();
      $table->unsignedInteger('event_id')->index();

      $table->enum('payment_type', ['order', 'refund', 'donation']);
      $table->decimal('amount', 13, 2);
      $table->string('transaction_id');
      $table->datetime('transaction_date');


      $table->timestamps();
      $table->softDeletes();

      $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');
      $table->foreign('event_id')->references('id')->on('events')->onDelete('cascade');
    });

    Schema::create('groups', function (Blueprint $table) {
      $table->increments('id');
      $table->unsignedInteger('event_id')->index();

      $table->string('description');
      $table->timestamps();
      $table->softDeletes();

      $table->foreign('event_id')->references('id')->on('events')->onDelete('cascade');
    });

    Schema::create('attendants', function (Blueprint $table) {
      $table->increments('id');
      $table->unsignedInteger('order_id')->index();
      $table->unsignedInteger('event_id')->index();
      $table->unsignedInteger('package_id')->index();
      $table->unsignedInteger('group_id')->index();

      $table->string('first_name');
      $table->string('last_name');
      $table->string('email');
      $table->json('custom_properties');

      $table->boolean('is_refunded')->default(0);
      $table->boolean('is_cancelled')->default(false);

      $table->timestamps();
      $table->softDeletes();

      $table->foreign('event_id')->references('id')->on('events')->onDelete('cascade');
      $table->foreign('package_id')->references('id')->on('packages')->onDelete('cascade');
      $table->foreign('group_id')->references('id')->on('groups')->onDelete('cascade');
      $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');
    });

    /*
     * Groups / Packages pivot table
     */
    Schema::create('group_package', function ($table) {
      $table->increments('id');
      $table->integer('group_id')->unsigned()->index();
      $table->foreign('group_id')->references('id')->on('groups')->onDelete('cascade');
      $table->integer('package_id')->unsigned()->index();
      $table->foreign('package_id')->references('id')->on('packages')->onDelete('cascade');

      $table->decimal('price', 13, 2);
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
      Schema::dropIfExists('events');
      Schema::dropIfExists('orders');
      Schema::dropIfExists('payments');
      Schema::dropIfExists('packages');
      Schema::dropIfExists('order_package');
      Schema::dropIfExists('group_package');
      Schema::dropIfExists('groups');
      Schema::dropIfExists('attendants');
  }
}
