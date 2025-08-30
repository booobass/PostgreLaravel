<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'price',
        'description',
        'image',
        'stock',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function categories()
    {
        return $this->belongsToManyt(Category::class, 'category_product');
    }

}
