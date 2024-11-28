<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class BlacklistRecord extends Model
{
    /** @use HasFactory<\Database\Factories\BlacklistRecordFactory> */
    use HasFactory, Notifiable;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'student_teacher_id',
        'school_id',
        'reason',
        'proof',
    ];

    /**
     * Get the student teacher associated with the blacklist record.
     */
    public function studentTeacher()
    {
        return $this->belongsTo(StudentTeacher::class);
    }

    /**
     * Get the school associated with the blacklist record.
     */
    public function school()
    {
        return $this->belongsTo(School::class);
    }
}
