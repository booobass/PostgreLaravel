<?php

use App\Enums\OrderStatus;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderProduct;
use App\Models\Product;
use App\Models\User;
use App\Services\OrderService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

uses(TestCase::class, RefreshDatabase::class);

test('createOrder creates order and order products and clears cart', function () {
    $user = User::factory()->create();
    $product1 = Product::factory()->create(['price' => 100, 'user_id' => $user->id]);
    $product2 = Product::factory()->create(['price' => 200, 'user_id' => $user->id]);

    Cart::factory()->create([
        'user_id' => $user->id, 'product_id' => $product1->id, 'quantity' => 2
    ]);
    Cart::factory()->create([
        'user_id' => $user->id, 'product_id' => $product2->id, 'quantity' => 1
    ]);

    $service = new OrderService();
    $order = $service->createOrder($user, [
        'payment' => 'card',
        'total' => 0,
        'status' => OrderStatus::Pending
    ]);

    expect($order)->toBeInstanceOf(Order::class);
    expect($order->total)->toBe(400);
    expect($order->products)->toHaveCount(2);
    expect(Cart::where('user_id', $user->id)->count())->toBe(0);

    expect(OrderProduct::where('order_id', $order->id)
        ->where('product_id', $product1->id)
        ->first()->quantity)
        ->toBe(2);
    expect(OrderProduct::where('order_id', $order->id)
        ->where('product_id', $product2->id)
        ->first()->quantity)
        ->toBe(1);
});
