<?php

namespace Database\Factories;

use App\Models\BlacklistRecord;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BlacklistRecord>
 */
class BlacklistRecordFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'school_id' => $this->faker->numberBetween(1, 10), // Assuming there are 10 schools in your database
            'student_teacher_id' => $this->faker->numberBetween(1, 100), // Assuming you have 100 student-teachers
            'reason' => $this->faker->sentence(), // A random reason for the blacklist
            'status' => $this->faker->randomElement(['active', 'inactive']), // Random status (active or inactive)
            'created_at' => $this->faker->dateTimeThisYear(), // Random date within this year
            'updated_at' => $this->faker->dateTimeThisYear(), // Random updated date within this year
        ];
    }
}
