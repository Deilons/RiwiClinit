<?php

namespace Database\Seeders;

use App\Models\Appointment;
use Illuminate\Database\Seeder;
use App\Models\Doctor;
use App\Models\Patient;


class AppointmentSeeder extends Seeder
{
    public function run()
    {
        Appointment::factory(10)->create([
            'doctor_id' => Doctor::inRandomOrder()->first()->id,
            'patient_id' => Patient::inRandomOrder()->first()->id,
        ]);
    }
}

