<?php

namespace App\Service;

use App\Models\Cart;
use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CartService
{
    public function createCart(User $user, array $cartData)
    {
        return DB::transaction(function () use ($user, $cartData) {

            // 商品を取得
        $product = Product::findOrFail($cartData['product_id']);

        if ($product->stock < $cartData['quantity']) {
            throw new \Exception('在庫が不足しています。');
        }

        // 既存のカートを取得
        $cart = Cart::where('user_id', $user->id)
            ->where('product_id', $cartData['product_id'])
            ->first();

        if ($cart) {
            // 既存カートがあれば数量を加算
            $cart->quantity += $cartData['quantity'];
            $cart->save();
        } else {
            // 新規カートを作成
            $cart = Cart::create([
                'user_id'    => $user->id,
                'product_id' => $cartData['product_id'],
                'quantity'   => $cartData['quantity'],
            ]);
        }

        // Productの在庫を減らす
        $product->stock -= $cartData['quantity'];
        $product->save();

        return $cart;
        });
    }

    public function deleteCart(int $id)
    {
        DB::transaction(function () use ($id) {

            $cart = Cart::where('user_id', Auth::id())->findOrFail($id);

            $product = Product::findOrFail($cart->product_id);
            $product->stock += $cart->quantity;
            $product->save();

            $cart->delete();
        });
    }
}
