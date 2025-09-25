"use client"

import { ReadCart } from "@/components/ReadCart"
import api from "@/lib/axios"
import { tax } from "@/lib/tax"
import btn from "@/styles/button.module.css"
import form from "@/styles/form.module.css"
import styles from "@/styles/user_product.module.css"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

type Props = {
    name: string;
    pivot: {
        price: number;
        quantity: number;
    }
}

const ShowOrder = () => {
    const [payment, setPayment] = useState<"credit" | "cash">("credit")
    const router = useRouter()

    const handleOrder = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await api.post("/api/order/store",
                {
                    payment: payment,
                    total: totalPrice,
                    status: 0
                },
                {
                    headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
                }
            )
            alert("注文しました")
            console.log("respone", response.data.order)
            const order = response.data.order
            const thanksData = {
                products: order.products.map((p: Props) => ({
                    name: p.name,
                    price: p.pivot.price,
                    quantity: p.pivot.quantity
                    })),
                payment: payment,
                total: totalPrice
            }
            const query = JSON.stringify(thanksData)
            router.push(`/users/thanks/show?data=${query}`)
        } catch {
            alert("注文出来ません")
        }
    }

    const { carts} =  ReadCart()

    const totalQuantity = carts.reduce((sum: number, cart: { quantity: number }) => sum + cart.quantity, 0);
    const subPrice = carts.reduce((sum: number, cart: { product: { price: number }, quantity: number }) => sum + (cart.product.price * cart.quantity), 0);
    const totalPrice = Math.floor(subPrice * tax)

    return (
        <div className="warapper">
            <div className={`${styles.main}`}>
                <div className={`${styles.title}`}>
                    <h3>注文情報入力</h3>
                </div>
                <div className="flex mt-8">
                    <h3 className="font-bold">小計</h3>
                    <div className="ml-8">
                        <h4>商品：{totalQuantity}個</h4>
                        <h4>税込：¥{totalPrice}</h4>
                    </div>
                </div>
                <form onSubmit={handleOrder} className="mt-6">
                    <label className={form.label}>お支払い方法：
                        <select
                            name="payment"
                            value={payment}
                            onChange={(e) => setPayment(e.target.value as "credit" | "cash")}
                            className={form.admin_input}>
                            <option value="credit">クレジット</option>
                            <option value="cash">現金</option>
                        </select>
                    </label>
                    <button className={`${btn.submitBtn} mt-8 ml-28`}>注文する</button>
                </form>
                <div className={`${btn.userLink} mt-8 w-[280px]`}>
                    <Link href={"/users/products"}>商品一覧</Link>
                    <Link href={"/users/cart"}>カート内容</Link>
                </div>
            </div>
        </div>
    )
}

export default ShowOrder