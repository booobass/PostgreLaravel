<?php

use App\Models\Cart;
use App\Models\User;
use App\Services\CartService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

use function Pest\Laravel\actingAs;

uses(TestCase::class, RefreshDatabase::class);

test('calls createCart service and returns json response', function () {
    $user = User::factory()->create();
    actingAs($user);

    $mockService = Mockery::mock(CartService::class);
    $mockService->shouldReceive('createCart')
        ->once()
        ->with($user, ['product_id' => 1, 'quantity' => 2])
        ->andReturn(new Cart(['id' => 99, 'product_id' => 1, 'quantity' => 2]));

    $this->app->instance(CartService::class, $mockService);

    $response = $this->postJson('/api/cart/store', [
        'product_id' => 1,
        'quantity'   => 2,
    ]);

    $response->assertOk()
             ->assertJson([
                 'cart' => ['product_id' => 1, 'quantity' => 2],
             ]);
});
