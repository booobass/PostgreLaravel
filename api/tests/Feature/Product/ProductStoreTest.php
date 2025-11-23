<?php

namespace Tests\Feature\Product;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

uses(TestCase::class, RefreshDatabase::class);

test('can create a product with categories and image', function () {
    Storage::fake('s3');

    $user = User::factory()->create();
    $this->actingAs($user, 'sanctum');

    $category1 = Category::factory()->create();
    $category2 = Category::factory()->create();

    $file = UploadedFile::fake()->image('product.jpg');

    $response = $this->postJson('/api/product/store', [
        'name' => 'テスト商品',
        'price' => 1234,
        'description' => 'これは説明です',
        'image' => $file,
        'stock' => 10,
        'categories' => [$category1->id, $category2->id]
    ]);

    $response->assertStatus(200); //ステータス確認

    $this->assertDatabaseHas('products', [
        'name' => 'テスト商品',
        'price' => 1234,
        'user_id' => $user->id
    ]);

    $product = Product::first();
    expect($product->categories)->toHaveCount(2);

    Storage::disk('s3')->assertExists($product->image);
});

test('fails to create a product with invalid data', function () {
    $user = User::factory()->create();
    $this->actingAs($user, 'sanctum');

    $response = $this->postJson('/api/product/store', [
        'name' => '',
        'price' => 'abc',
        'stock' => -1
    ]);

    $response->assertStatus(422); //Unprocessable Entity
    $response->assertJsonValidationErrors(['name', 'price', 'stock']);
});
