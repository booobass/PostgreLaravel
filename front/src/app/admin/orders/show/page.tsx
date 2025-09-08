"use client"

import { DeleteOrder } from "@/components/DeleteOrder"
import api from "@/lib/axios"
import { OrderType } from "@/type/type"
import { Fragment, useEffect, useState } from "react"

const ShowOrder = () => {

    const [order, setOrder] = useState<OrderType[]>([])

    
    const fetchOrder = async () => {
        const response = await api.get("/api/order",
            {
                headers: {"Authorization":  `Bearer ${localStorage.getItem("token")}`}
            }
        )
        console.log("OD",response.data.orders)
        setOrder(response.data.orders)
    }
    
    useEffect(() => {
        fetchOrder()
    }, [])
    
    const {handleDelete} = DeleteOrder()

    return (
        <div>
            <h4>注文管理</h4>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>名前</th>
                            <th>Email</th>
                            <th>商品名</th>
                            <th>個数</th>
                            <th>単価</th>
                            <th>合計</th>
                            <th>支払い方法</th>
                            <th>状態</th>
                            <th>完了</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.map((o) => (
                            <tr key={o.id}>
                                <td>{o.id}</td>
                                <td>{o.user.name}</td>
                                <td>{o.user.email}</td>
                                {o.products.map((p) => (
                                    <Fragment key={p.id}>
                                        <td>{p.name}</td>
                                        <td>{p.pivot.quantity}</td>
                                        <td>{p.pivot.price}</td>
                                    </Fragment>
                                ))}
                                <td>{o.total}</td>
                                <td>{o.payment}</td>
                                <td>{o.status_label}</td>
                                <td>
                                    <button onClick={() => handleDelete(o.id)}>削除</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ShowOrder