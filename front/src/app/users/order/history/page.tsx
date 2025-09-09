"use client"

import api from "@/lib/axios"
import { OrderType } from "@/type/type"
import Link from "next/link"
import { Fragment, useEffect, useState } from "react"


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

    return (
        <div>
            <h3>注文履歴</h3>
            <table>
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
                <tbody>
                    {orders.map((o) => (
                        <Fragment key={o.id}>
                            {o.products.map((p, index) => (
                                <tr key={p.id}>
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
                                    <td>{p.pivot.quantity}</td>
                                    <td>{p.pivot.price}</td>
                                    {index === 0 && (
                                        <>
                                            <td rowSpan={o.products.length}>{o.total}</td>
                                            <td rowSpan={o.products.length}>{o.status_label}</td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </Fragment>
                    ))}
                </tbody>
            </table>
            <Link href={"/users/products"}>商品購入画面</Link>
        </div>
    )

}

export default OrderHistory