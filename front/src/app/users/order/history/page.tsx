"use client"

import api from "@/lib/axios"
import tb from "@/styles/table.module.css"
import styles from "@/styles/user_product.module.css"
import { OrderType } from "@/type/type"
import { Fragment, useEffect, useState } from "react"
import UserHeader from "../../header"


const OrderHistory = () => {

    const [orders, setOrders] = useState<OrderType[]>([])

    const fetchHistory = async () => {
        const response = await api.get("/api/order/user", {
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
        })
        setOrders(response.data.orders)
        console.log("OH", response.data.orders)
    }

    useEffect(() => {
        fetchHistory()
    }, [])

    console.log("order", orders)

    return (
        <div className="warapper">
            <div className={styles.main}>
                <UserHeader />
                <div className={`${styles.title} mt-4`}>
                    <h3>購入履歴</h3>
                </div>
                {orders.length !== 0 ? (
                    <div className="mt-8 overflow-x-auto max-w-full sm:max-w-[680px]">
                        <table className="min-w-[680px] w-full">
                            <thead>
                                <tr>
                                    <th>注文日</th>
                                    <th>お支払い方法</th>
                                    <th>商品名</th>
                                    <th>個数</th>
                                    <th>価格</th>
                                    <th>お支払い金額</th>
                                    <th>注文状況</th>
                                </tr>
                            </thead>
                            <tbody className={tb.tbody}>
                                {orders.map((o) => (
                                    <Fragment key={o.id}>
                                        {o.products.map((p, index) => (
                                            <tr key={p.id} className="border-b text-center">
                                                {index === 0 && (
                                                    <>
                                                        <td rowSpan={o.products.length}>
                                                            {new Date(o.created_at).toLocaleDateString("ja-JP", {
                                                                month: "long",
                                                                day: "numeric",
                                                                weekday: "short"
                                                            })}
                                                        </td>
                                                        <td rowSpan={o.products.length}>{o.payment === "credit" ? "クレジット払い" : "現金払い"}</td>
                                                    </>
                                                )}
                                                <td>{p.name}</td>
                                                <td>{p.pivot.quantity}個</td>
                                                <td>¥{p.pivot.price}</td>
                                                {index === 0 && (
                                                    <>
                                                        <td rowSpan={o.products.length }>¥{o.total}</td>
                                                        <td rowSpan={o.products.length}>{o.status_label}</td>
                                                    </>
                                                )}
                                            </tr>
                                        ))}
                                    </Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="mt-8 font-bold">注文履歴はありません</p>
                )}
            </div>
        </div>
    )

}

export default OrderHistory