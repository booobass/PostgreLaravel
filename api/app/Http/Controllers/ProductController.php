<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::with('categories')->get();
        return response()->json(['products' => $products]);
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
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'stock' => 'required|integer|min:0',
            'categories' => 'nullable|array',
            'categories.*' => 'integer|exists:categories,id',
        ]);

        if($request->hasFile('image')) {
            $original = request()->file('image')->getClientOriginalName();
            $name = date('YmdHis') . '_' . $original;
            request()->file('image')->move('storage/images', $name);
            $validated['image'] = $name;
        }

        $categories = $validated['categories'] ?? [];
        unset($validated['categories']);

        $product = new Product($validated);
        $product->user_id = Auth::user()->id;
        $product->save();

        if(!empty($categories)) {
            $product->categories()->sync($categories);
        }

        return response()->json(['product' => $product->load('categories')]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
