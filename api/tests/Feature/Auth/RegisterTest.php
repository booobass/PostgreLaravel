<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

uses(TestCase::class, RefreshDatabase::class);

it('can register a user', function () {

    $response = $this->postJson('/api/register', [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $response->assertStatus(201)->assertJsonStructure([
        'user' => ['id', 'name', 'email'],
        'token'
    ]);

    $this->assertDatabaseHas('users', [
        'email' => 'test@example.com',
    ]);
});

it('cannot register with invalid data', function () {
    $response = $this->postJson('/api/register', [
        'name' => '',
        'email' => 'not-an-email',
        'password' => 'short',
    ]);

    $response->assertStatus(422); // バリデーションエラー
});
