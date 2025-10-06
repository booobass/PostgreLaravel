<?php

namespace App\Models;

use App\Enums\OrderStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'payment',
        'total',
        'status'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function orderProducts()
    {
        return $this->hasMany(OrderProduct::class);
    }

    protected $casts = [
        'status' => OrderStatus::class
    ];

    protected $appends = ['status_label'];

    public function getStatusLabelAttribute()
    {
        return $this->status->label();
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'order_products')
         ->withPivot('quantity', 'price');
    }

}
