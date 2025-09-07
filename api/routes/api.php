<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [RegisteredUserController::class, 'store'])
    ->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]); // CSRFチェックを無効化

Route::post('/login', [AuthenticatedSessionController::class, 'store'])
    ->middleware('guest');

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth:sanctum');

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/admin/store', [AdminController::class, 'store']);
    Route::post('/product/store', [ProductController::class, 'store']);
    Route::get('/product', [ProductController::class, 'index']);
    Route::patch('/product/{product}', [ProductController::class, 'update']);
    Route::delete('/product/{product}', [ProductController::class, 'destroy']);
    Route::post('/category/store', [CategoryController::class, 'store']);
    Route::get('/category', [CategoryController::class, 'index']);
    Route::post('/cart/store', [CartController::class, 'store']);
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/order/store', [OrderController::class, 'store']);
    Route::get('/order', [OrderController::class, 'index']);
});

Route::get('/product/{product}', [ProductController::class, 'show']);
Route::get('/user', [AuthenticatedSessionController::class, 'index']);
