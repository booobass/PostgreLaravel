<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\CategoryController;
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
    Route::post('/category/store', [CategoryController::class, 'store']);
});
