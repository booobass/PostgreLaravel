"use client"

import btn from "@/styles/button.module.css"
import styles from "@/styles/user_product.module.css"
import Link from "next/link"

const ThanksUser = () => {
    return (
        <div className="warapper">
            <div className={`${styles.main}`}>
                <div className={`${styles.title}`}>
                    <h4>注文完了</h4>
                </div>
                <div className="mt-8 font-bold">
                    <p>ご購入ありがとうございました</p>
                </div>
                <div className={`${btn.userLink} mt-8 w-[280px]`}>
                    <Link href={"/users/products"}>商品一覧</Link>
                    <Link href={"/users/order/history"}>購入履歴</Link>
                </div>
            </div>
        </div>
        
    )
}

export default ThanksUser