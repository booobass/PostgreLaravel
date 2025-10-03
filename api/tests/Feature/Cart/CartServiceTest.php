<?php

namespace Tests\Feature\Cart;

use App\Models\Cart;
use App\Models\Product;
use App\Models\User;
use App\Services\CartService;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(TestCase::class, RefreshDatabase::class);

test('can create a cart and decrement product stock', function () {
    $user = User::factory()->create();
    $product = Product::factory()->create([
        'stock' => 10,
        'user_id' => $user->id,
        'image' => 'dummy.jpg'
    ]);

    $service = new CartService();

    $cart = $service->createCart($user, [
        'product_id' => $product->id,
        'quantity' => 3
    ]);

    expect($cart)->toBeInstanceOf(Cart::class);
    expect($cart->quantity)->toBe(3);
    expect($product->fresh()->stock)->toBe(7);
});

test('incremants quantity if cart already exists', function () {
    $user = User::factory()->create();
    $product = Product::factory()->create([
        'stock' => 10,
        'user_id' => $user->id,
        'image' => 'dummy.jpg'
    ]);

    $cart = Cart::create([
        'user_id' => $user->id,
        'product_id' => $product->id,
        'quantity' => 2
    ]);

    $service = new CartService();

    $updateCart = $service->createCart($user, [
        'product_id' => $product->id,
        'quantity' => 3
    ]);

    expect($updateCart->quantity)->toBe(5);
    expect($product->fresh()->stock)->toBe(7);
});

test('throws exception if stock is insufficient', function () {
    $user = User::factory()->create();
    $product = Product::factory()->create([
        'stock' => 2,
        'user_id' => $user->id,
        'image' => 'dummy.jpg'
    ]);

    $service = new CartService();

    $service->createCart($user, [
        'product_id' => $product->id,
        'quantity' => 5
    ]);
})->throws(\Exception::class, '在庫が不足しています');
