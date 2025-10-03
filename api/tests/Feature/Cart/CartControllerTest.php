<?php

use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

use function Pest\Laravel\actingAs;

uses(TestCase::class, RefreshDatabase::class);

test('creates a cart and reduces product stock', function () {
    $user = User::factory()->create();
    actingAs($user);

    $product = Product::factory()->create([
        'stock' => 10,
        'user_id' => $user->id,
        'image' => 'dummy.jpg'
    ]);

    $response = $this->postJson('/api/cart/store', [
        'product_id' => $product->id,
        'quantity' => 3
    ]);

    $response->assertOK()->assertJsonPath('cart.quantity', 3);

    $this->assertDatabaseHas('carts', [
        'user_id' => $user->id,
        'product_id' => $product->id,
        'quantity' => 3,
    ]);

    expect($product->fresh()->stock)->toBe(7);

});
