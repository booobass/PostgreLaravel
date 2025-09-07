"use client"

import api from "@/lib/axios"
import Link from "next/link"
import { useParams } from "next/navigation"

const AdminDelete = () => {

    const params = useParams()
    const id = params.id as string

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await api.delete(`/api/product/${id}`,
                {
                    headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
                }
            )
            alert("削除しました")
        } catch {
            alert("削除出来ません")
        }
    }

    return (
        <div>
            <h4>商品削除</h4>
            <p>削除してもよろしいですか？</p>
            <button onClick={handleDelete}>削除</button>
            <Link href={"../../products/show"}>キャンセル</Link>
        </div>
    )
}

export default AdminDelete