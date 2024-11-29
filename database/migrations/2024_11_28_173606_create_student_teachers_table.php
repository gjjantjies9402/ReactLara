<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentTeachersTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('student_teachers', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('location_province');
            $table->string('location_city');
            $table->string('location_street');
            $table->string('university');
            $table->string('status')->default('inactive'); // Added the status column
            $table->foreignId('school_id')->constrained('schools')->onDelete('cascade'); // Foreign key to schools table
            $table->string('school_name')->nullable(); // Add a column to store school name
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('student_teachers');
    }
}
