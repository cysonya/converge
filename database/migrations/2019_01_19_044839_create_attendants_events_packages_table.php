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
      $table->decimal('price', 13, 2);

      $table->integer('quantity_available')->nullable()->default(null);
      $table->integer('quantity_sold')->default(0);

      $table->tinyInteger('is_paused')->default(0);

      $table->timestamps();
      $table->softDeletes();
    });

    Schema::create('event_groups', function (Blueprint $table) {
      $table->increments('id');
      $table->unsignedInteger('event_id')->index();

      $table->string('description');
      $table->timestamps();
      $table->softDeletes();

      $table->foreign('event_id')->references('id')->on('events')->onDelete('cascade');
    });

    Schema::create('attendants', function (Blueprint $table) {
      $table->increments('id');
      // $table->unsignedInteger('order_id')->index();
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
      $table->foreign('group_id')->references('id')->on('event_groups')->onDelete('cascade');
      // $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');
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
      Schema::dropIfExists('packages');
      Schema::dropIfExists('attendants');
  }
}
