<?php

use App\Http\Controllers\SchoolController;
use App\Http\Controllers\StudentTeacherController;
use App\Http\Controllers\BlacklistRecordController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('/api/schools', [SchoolController::class, 'store']);
Route::get('/schools', [SchoolController::class, 'index']);
Route::get('/schools/{id}', [SchoolController::class, 'show']);
Route::put('/schools/{id}', [SchoolController::class, 'update']);


