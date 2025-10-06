<?php

use App\Enums\OrderStatus;
use App\Models\Order;
use App\Models\User;
use App\Services\OrderService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

use function Pest\Laravel\actingAs;

uses(TestCase::class, RefreshDatabase::class);

test('store calls createOrder service and returns json response', function () {
    $user = User::factory()->create();
    actingAs($user);

    $mockService = Mockery::mock(OrderService::class);
    $mockService->shouldReceive('createOrder')
        ->once()
        ->withArgs (function($passedUser, $data) use ($user) {
            return $passedUser->id ===  $user->id && $data['payment'] === 'card';
        })
        ->andReturn(Order::factory()->make());

    $this->app->instance(OrderService::class, $mockService);

    $response = $this->postJson('/api/order/store', [
        'payment' => 'card',
        'total' => 0,
        'status' => OrderStatus::Pending,
    ]);

    $response->assertOk()->assertJsonStructure(['order']);
});
