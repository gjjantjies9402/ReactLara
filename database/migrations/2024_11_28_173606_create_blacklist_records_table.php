<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBlacklistRecordsTable extends Migration
{
    
        public function up()
        {
            Schema::create('blacklist_records', function (Blueprint $table) {
                $table->id();
                $table->foreignId('student_teacher_id')->constrained()->onDelete('cascade');
                $table->foreignId('school_id')->constrained()->onDelete('cascade');
                $table->string('reason', 1000);
                $table->string('proof')->nullable();
                $table->timestamps();
            });
        }
    
        public function down()
        {
            Schema::dropIfExists('blacklist_records');
        }
}