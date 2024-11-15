<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Faker\Generator as Faker;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserSeeder extends Seeder
{

    public function run()
    {
        User::factory()->count(10)->create();
    }
}
