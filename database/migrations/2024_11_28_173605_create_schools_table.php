<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSchoolsTable extends Migration
{
    public function up()
    {
        Schema::create('schools', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('location');
            $table->string('email');
            $table->enum('status', ['active', 'inactive']);
            $table->timestamps();
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('schools');
    }
    
}
