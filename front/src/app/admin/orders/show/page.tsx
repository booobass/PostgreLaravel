"use client"

import { DeleteOrder } from "@/components/DeleteOrder"
import api from "@/lib/axios"
import btn from "@/styles/button.module.css"
import tb from "@/styles/table.module.css"
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
    
    const {handleDelete} = DeleteOrder(fetchOrder)

    const [orderStatus, setOrderStatus] = useState("");

    // console.log("OS", orderStatus)

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
            alert("権限がありません")
        }
    }

    return (
        <div className="warapper">
            <div className={`${tb.main} w-6xl`}>
                <h4 className="text-xl font-bold">注文管理</h4>
                {order.length !== 0 ? (
                    <table className="mt-4">
                        <thead>
                            <tr className="text-left">
                                <th>名前</th>
                                <th>Email</th>
                                <th>商品名</th>
                                <th>個数</th>
                                <th>単価</th>
                                <th>合計</th>
                                <th>支払い方法</th>
                                <th>状態</th>
                                <th colSpan={2}>状態更新</th>
                                <th>注文削除</th>
                            </tr>
                        </thead>
                        <tbody className={tb.tbody}>
                            {order.map((o) => (
                                <Fragment key={o.id}>
                                    {o.products.map((p, index) => (
                                    <tr key={p.id} className="border-b">
                                        {index === 0 && (
                                            <>
                                                <td rowSpan={o.products.length}>{o.user.name}</td>
                                                <td rowSpan={o.products.length}>{o.user.email}</td>
                                            </>
                                        )}
                                        <td>{p.name}</td>
                                        <td>{p.pivot.quantity}個</td>
                                        <td>¥{p.pivot.price}</td>
                                        {index === 0 && (
                                            <>
                                                <td rowSpan={o.products.length}>¥{o.total}</td>
                                                <td rowSpan={o.products.length}>{o.payment === "credit" ? "クレジット" : "現金"}</td>
                                                <td rowSpan={o.products.length}>{o.status_label}</td>
                                                <td rowSpan={o.products.length}>
                                                    <select
                                                        name="status"
                                                        onChange={(e) => setOrderStatus(e.target.value)}
                                                        className={btn.adminBtn}
                                                    >
                                                        <option value="">選択</option>
                                                        <option value="1">支払い済み</option>
                                                        <option value="2">発送済み</option>
                                                        <option value="3">発送完了</option>
                                                        <option value="4">キャンセル</option>
                                                    </select>
                                                </td>
                                                <td rowSpan={o.products.length}>
                                                    <button onClick={(e) => statusChange(e, o.id)} className={btn.adminBtn}>変更</button>
                                                </td>
                                                <td rowSpan={o.products.length}>
                                                    <button onClick={() => handleDelete(o.id)} className={btn.adminBtn}>削除</button>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                    ))}
                                </Fragment>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="mt-8 font-bold">現在、注文はありません</p>
                )}
            </div>
        </div>
    )
}

export default ShowOrder