<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function customer()
    {
        $products = Product::with('categories')->get();

        return response()->json(['products' => $products]);
    }

    public function index(Request $request)
    {
        $query = Product::with('categories');

        if($request->filled('keyword')) {
            $query->where(function($q) use ($request) {
                $q->where('name', 'like', '%' . $request->keyword . '%');
            });
        }

        if($request->filled('category_id')) {
            $query->whereHas('categories', function($q) use ($request) {
                $q->where('categories.id', $request->category_id);
            });
        }

        if($request->filled('sort')) {
            switch($request->sort) {
                case 'price_asc': $query->orderBy('price', 'asc'); break;
                case 'price_desc': $query->orderBy('price', 'desc'); break;
                case 'stock_asc': $query->orderBy('stock', 'asc'); break;
                case 'stock_desc': $query->orderBy('stock', 'desc'); break;
            }
        }

        $products = $query->paginate(10);

        return response()->json(['products' => $products]);
        // $products = Product::with('categories')->get();
        // return response()->json(['products' => $products]);
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
            'image' => 'required|image|max:2048',
            'stock' => 'required|integer|min:0',
            'categories' => 'nullable|array',
            'categories.*' => 'integer|exists:categories,id',
        ]);

        if($request->hasFile('image')) {
            // $original = request()->file('image')->getClientOriginalName();
            // $name = date('YmdHis') . '_' . $original;
            // request()->file('image')->move('storage/images', $name);
            // $validated['image'] = $name;
            $path = $request->file('image')->store('images', 's3');
            $validated['image'] = $path;
        }

        $categories = $validated['categories'] ?? [];
        unset($validated['categories']);

        $product = new Product($validated);
        $product->user_id = Auth::user()->id;
        $product->save();

        if(!empty($categories)) {
            $product->categories()->sync($categories);
        }

        $product->image_url = $product->image ? Storage::disk('s3')->url($product->image) : null;

        return response()->json(['product' => $product->load('categories')]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // $product = Product::find($id);

        // return response()->json(['product' => $product->load('categories')]);
        $product = Product::with('categories')->findOrFail($id);
        $product->image_url = Storage::disk('s3')->url($product->image);

        return response()->json(['product' => $product]);
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
        Gate::authorize('update', $product);

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
            if($product->image) {
                Storage::disk('s3')->delete($product->image);
            }
            $path = $request->file('image')->store('images', 's3');
            $validated['image'] = $path;
        }

        $categories = $validated['categories'] ?? [];
        unset($validated['categories']);

        // products テーブルの更新
        $product->update($validated);

        // 中間テーブルの同期
        $product->categories()->sync($categories);

        $product->image_url = $product->image ? Storage::disk('s3')->url($product->image) : null;

        return response()->json(['product' => $product->load('categories')]);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        Gate::authorize('delete', $product);

        if($product->image) {
            Storage::disk('s3')->delete($product->image);
        }

        $product->categories()->detach();
        $product->delete();

        return response()->json(['product' => $product]);
    }

}
