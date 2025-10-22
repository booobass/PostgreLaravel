<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Services\OrderService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class OrderController extends Controller
{
    protected $orderService;

    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::with(['user', 'products'])->get();

        return response()->json(['orders' => $orders]);
    }

    public function userOrders()
    {
        $orders = Order::where('user_id', Auth::id())->with('products')->get();

        return response()->json(['orders' => $orders]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'payment' => 'required|string',
            'total' => 'required|integer',
            'status' => 'required|integer'
        ]);

        $order = $this->orderService->createOrder(Auth::user(), $validated);

        return response()->json(['order' => $order->load('products')]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        Gate::authorize('delete', $order);

        $this->orderService->deleteOrder($order->id);

        return response()->json(['message' => '削除しました']);
    }

    public function updateStatus(Request $request, Order $order)
    {
        Gate::authorize('updateStatus', $order);

        $validated = $request->validate([
            'status' => 'required|integer'
        ]);

        $order->status = $validated['status'];
        $order->save();

        return response()->json(['order' => $order]);
    }
}
