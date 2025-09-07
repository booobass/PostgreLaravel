<?php

namespace App\Enums;

enum OrderStatus: int
{
    case Pending = 0;
    case Paid = 1;
    case Shipped = 2;
    case Delivered = 3;
    case Cancelled = 4;

    public function label(): string
    {
        return match($this) {
            self::Pending => '注文受付',
            self::Paid => '支払い済み',
            self::Shipped => '発送済み',
            self::Delivered => '発送完了',
            self::Cancelled => 'キャンセル'
        };
    }
}
