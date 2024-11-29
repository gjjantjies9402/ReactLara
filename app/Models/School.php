<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class School extends Model
{
    /** @use HasFactory<\Database\Factories\SchoolFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'email',
        'location',
        'name',
        'status',
    ];

    /**
     * Get the blacklist records associated with the school.
     */
    public function blacklistRecords()
    {
        return $this->hasMany(BlacklistRecord::class);
    }

    /**
     * Get the student teachers that have been blacklisted by this school.
     */
    public function blacklistedStudentTeachers()
    {
        return $this->hasManyThrough(
            StudentTeacher::class,
            BlacklistRecord::class,
            'school_id', // Foreign key on BlacklistRecord table
            'id',        // Foreign key on StudentTeacher table
            'id',        // Local key on School table
            'student_teacher_id' // Local key on BlacklistRecord table
        );
    }
}
