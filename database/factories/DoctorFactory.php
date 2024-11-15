<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Doctor;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Doctor>
 */
class DoctorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Doctor::class;

    public function definition()
    {
        return [
            'user_id' => User::factory()->create(['role' => 'doctor'])->id,
            'specialty' => $this->faker->randomElement([
                'Cardiology',
                'Neurology',
                'Pediatrics',
                'Dermatology',
                'Psychiatry',
            ]),
        ];
    }
}
