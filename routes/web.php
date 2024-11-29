<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\SchoolController;
use App\Http\Controllers\StudentTeacherController;
use App\Http\Controllers\BlacklistRecordController;
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    // Profile routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Resource routes
    Route::resource('schools', SchoolController::class);
    Route::resource('student-teachers', StudentTeacherController::class);
    Route::resource('blacklist-records', BlacklistRecordController::class);


    Route::post('/api/schools', [SchoolController::class, 'store']);
    Route::post('/upload-csv', [SchoolController::class, 'uploadCsv']);
    Route::get('/api/schools', [SchoolController::class, 'index']);
    Route::get('/schools/{id}', [SchoolController::class, 'show']);
    Route::put('/schools/{id}', [SchoolController::class, 'update']);

    Route::post('/api/student-teachers', [StudentTeacherController::class, 'store']);
    Route::post('/upload-csv-student', [StudentTeacherController::class, 'uploadCsv']);
    Route::get('/api/student-teachers', [StudentTeacherController::class, 'index']);
    Route::get('/student-teachers/{id}', [StudentTeacherController::class, 'show']);
    Route::put('/student-teachers/{id}', [StudentTeacherController::class, 'update']);
    
    Route::post('/api/blacklist-records', [BlacklistRecordController::class, 'store']);
    Route::post('/upload-csv-blacklist', [BlacklistRecordController::class, 'uploadCsv']);
    Route::get('/api/blacklist-records', [BlacklistRecordController::class, 'index']);
    Route::get('/blacklist-records/{id}', [BlacklistRecordController::class, 'show']);
    Route::put('/blacklist-records/{id}', [BlacklistRecordController::class, 'update']);
});

require __DIR__.'/auth.php';