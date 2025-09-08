"use client"

import { DeleteOrder } from "@/components/DeleteOrder"
import api from "@/lib/axios"
import { OrderType } from "@/type/type"
import Link from "next/link"
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
    
    const {handleDelete} = DeleteOrder(fetchOrder)

    const [orderStatus, setOrderStatus] = useState("");

    console.log("OS", orderStatus)

    const statusChange = async (e: React.FormEvent, id: number) => {
        e.preventDefault()
        try {
            await api.post(`/api/order/${id}/status`, {
                status: Number(orderStatus)
            }, {
                headers: {
                    "X-HTTP-Method-Override": "PATCH",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            fetchOrder()
            alert("変更完了")
        } catch {
            alert("変更失敗")
        }
    }

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
                            <th>状態更新</th>
                            <th>完了</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.map((o) => (
                            <Fragment key={o.id}>
                                {o.products.map((p, index) => (
                                <tr key={p.id}>
                                    {index === 0 && (
                                        <>
                                            <td rowSpan={o.products.length}>{o.id}</td>
                                            <td rowSpan={o.products.length}>{o.user.name}</td>
                                            <td rowSpan={o.products.length}>{o.user.email}</td>
                                        </>
                                    )}
                                    <td>{p.name}</td>
                                    <td>{p.pivot.quantity}</td>
                                    <td>{p.pivot.price}</td>
                                    {index === 0 && (
                                        <>
                                            <td rowSpan={o.products.length}>{o.total}</td>
                                            <td rowSpan={o.products.length}>{o.payment}</td>
                                            <td rowSpan={o.products.length}>{o.status_label}</td>
                                            <td rowSpan={o.products.length}>
                                                <select
                                                    name="status"
                                                    onChange={(e) => setOrderStatus(e.target.value)}
                                                >
                                                    <option value="">選択</option>
                                                    <option value="1">支払い済み</option>
                                                    <option value="2">発送済み</option>
                                                    <option value="3">発送完了</option>
                                                    <option value="4">キャンセル</option>
                                                </select>
                                                <button onClick={(e) => statusChange(e, o.id)}>変更</button>
                                            </td>
                                            <td rowSpan={o.products.length}>
                                                <button onClick={() => handleDelete(o.id)}>削除</button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                                ))}
                            </Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
            <Link href={"/admin/users"}>ユーザー管理</Link>
        </div>
    )
}

export default ShowOrder