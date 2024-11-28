<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('blacklist_records', function (Blueprint $table) {
        $table->id();
        $table->unsignedBigInteger('student_teacher_id');
        $table->unsignedBigInteger('school_id');
        $table->text('reason');
        $table->string('proof')->nullable();
        $table->timestamps();

        $table->foreign('student_teacher_id')->references('id')->on('student_teachers')->onDelete('cascade');
        $table->foreign('school_id')->references('id')->on('schools')->onDelete('cascade');
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blacklist_records');
    }
};
