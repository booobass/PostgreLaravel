"use client"

import Link from "next/link"

const ThanksUser = () => {
    return (
        <div>
            <h2>お買い上げありがとうございます</h2>
            <Link href={"/users/order/history"}>購入履歴ページ</Link>
            <Link href={"/users/products"}>商品一覧ページ</Link>
        </div>
        
    )
}

export default ThanksUser