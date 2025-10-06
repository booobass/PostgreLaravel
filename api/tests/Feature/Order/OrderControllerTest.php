<?php

use App\Enums\OrderStatus;
use App\Models\Cart;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

use function Pest\Laravel\actingAs;

uses(TestCase::class, RefreshDatabase::class);

test('creates order, order products and clears cart via api', function () {
    $user = User::factory()->create();
    actingAs($user);

    $product1 = Product::factory()->create(['price' => 100, 'user_id' => $user->id]);
    $product2 = Product::factory()->create(['price' => 200, 'user_id' => $user->id]);

    Cart::factory()->create([
        'user_id' => $user->id, 'product_id' => $product1->id, 'quantity' => 2
    ]);
    Cart::factory()->create([
        'user_id' => $user->id, 'product_id' => $product2->id, 'quantity' => 1
    ]);

    $response = $this->postJson('/api/order/store', [
        'payment' => 'card',
        'total' => 0,
        'status' => OrderStatus::Pending
    ]);



    $response->assertOk()->assertJsonStructure([
        'order' => [
            'id',
            'user_id',
            'total',
            'status',
            'products' => [
                [
                    'id',
                    'pivot' => ['product_id', 'quantity', 'price']
                ]
            ]
        ]
    ]);



    $this->assertDatabaseHas('orders', [
        'user_id' => $user->id,
        'total' => 400,
        'status' => OrderStatus::Pending
    ]);

    $this->assertDatabaseHas('order_products', [
        'product_id' => $product1->id,
        'quantity' => 2,
        'price' => 100,
    ]);
    $this->assertDatabaseHas('order_products', [
        'product_id' => $product2->id,
        'quantity' => 1,
        'price' => 200,
    ]);

    expect(Cart::where('user_id', $user->id)->count())->toBe(0);
});
