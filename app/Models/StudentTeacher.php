<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class StudentTeacher extends Model
{
    /** @use HasFactory<\Database\Factories\StudentTeacherRecordFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'province',
        'city',
        'street_address',
        'university',
    ];

    /**
     * Get the blacklist records associated with the student teacher.
     */
    public function blacklistRecords()
    {
        return $this->hasMany(BlacklistRecord::class);
    }

    /**
     * Get the schools that have blacklisted this student teacher.
     */
    public function blacklistingSchools()
    {
        return $this->belongsToMany(
            School::class,
            'blacklist_records',
            'student_teacher_id',
            'school_id'
        )->withPivot('reason', 'proof', 'created_at', 'updated_at');
    }
}
