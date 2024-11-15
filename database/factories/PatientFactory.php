<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Patient;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Patient>
 */
class PatientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
   protected $model = Patient::class;

    public function definition()
    {
        return [
            'user_id' => User::factory()->create(['role' => 'patient'])->id,
            'birthDate' => $this->faker->date(),
        ];
    }
}
