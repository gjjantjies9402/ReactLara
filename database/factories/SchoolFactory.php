<?php

namespace Database\Factories;

use App\Models\School;
use Illuminate\Database\Eloquent\Factories\Factory;

class SchoolFactory extends Factory
{
protected $model = School::class;

public function definition()
{
return [
'name' => $this->faker->company,
'province' => $this->faker->state,
'city' => $this->faker->city,
'street_address' => $this->faker->streetAddress,
];
}
}
