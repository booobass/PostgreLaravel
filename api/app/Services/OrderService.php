<?php

namespace App\Services;

use App\Enums\OrderStatus;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderProduct;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class OrderService
{
    public function createOrder(User $user, array $orderData)
    {
        return DB::transaction(function () use ($user, $orderData) {

            $cartProducts = Cart::where('user_id', $user->id)->get();

            $order = Order::create([
                'user_id' => $user->id,
                'payment' => $orderData['payment'],
                'total' => $cartProducts->sum(fn($product) => $product->quantity * $product->product->price),
                'status' => OrderStatus::Pending
            ]);

            foreach($cartProducts as $cartProduct) {
                OrderProduct::create([
                    'order_id' => $order->id,
                    'product_id' => $cartProduct->product_id,
                    'quantity' => $cartProduct->quantity,
                    'price' => $cartProduct->product->price,
                ]);
            }

            Cart::where('user_id', $user->id)->delete();

            return $order;

        });
    }
}
