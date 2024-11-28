<?php

namespace Database\Factories;

use App\Models\StudentTeacherRecord;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StudentTeacherRecord>
 */
class StudentTeacherRecordFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'student_teacher_id' => $this->faker->numberBetween(1, 100), // Random student_teacher_id
            'school_id' => $this->faker->numberBetween(1, 10),           // Random school_id
            'status' => $this->faker->randomElement(['active', 'inactive', 'pending']), // Random status
            'notes' => $this->faker->sentence(),  // Random sentence for notes
        ];
    }
}
