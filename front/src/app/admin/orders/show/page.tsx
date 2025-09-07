"use client"

import api from "@/lib/axios"
import { OrderType } from "@/type/type"
import { useEffect, useState } from "react"

const ShowOrder = () => {

    const [order, setOrder] = useState<OrderType[]>([])

    const fetchOrder = async () => {
        const response = await api.get("/api/order",
            {
                headers: {"Authorization":  `Bearer ${localStorage.getItem("token")}`}
            }
        )
        console.log(response.data)
        setOrder(response.data.orders)
    }

    useEffect(() => {
        fetchOrder()
    }, [])

    return (
        <div>
            <h4>注文管理</h4>
            <div>
                <table>
                    
                </table>
                {order.map((o :OrderType) => (
                    <div key={o.id}>
                        <p>{o.payment}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ShowOrder