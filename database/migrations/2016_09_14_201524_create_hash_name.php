<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHashName extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('hash_names', function (Blueprint $table) {
            $table->increments('id');
            $table->string('md5', 34)->unique();
            $table->string('name');
            $table->unsignedBigInteger('size');
            $table->unsignedInteger('classification_type_id')->nullable();
            $table->unsignedInteger('file_type_id')->nullable();

            $table->foreign('classification_type_id')
                    ->references('id')
                    ->on('classification_types');
            $table->foreign('file_type_id')
                ->references('id')
                ->on('file_types');

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
        Schema::dropIfExists('hash_names');
    }
}
