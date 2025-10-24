<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\User;
use Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DemoUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminUser = User::updateOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin',
                'password' => Hash::make('password'),
            ]
        );

        Admin::updateOrCreate(
            ['user_id' => $adminUser->id],
            ['role' => 'Boss']
        );

        $demoUser = User::updateOrCreate(
            ['email' => 'demo@example.com'],
            [
                'name' => 'Demo',
                'password' => Hash::make('password'),
            ]
        );

        Admin::updateOrCreate(
            ['user_id' => $demoUser->id],
            ['role' => 'User']
        );
    }
}
