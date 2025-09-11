"use client"

import api from "@/lib/axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

const CreateCategory = () => {

    const router = useRouter()

    const [category, setCategory] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await api.post("/api/category/store", {
                name: category
            }, {
                headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
            })
            alert("カテゴリー登録")
            router.push("/admin/products/create")
        } catch {
            alert("登録出来ません")
        }
    }

    return (
        <div>
            <h4>カテゴリー作成</h4>
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        type="text"
                        name="name"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)} />
                </label>
                <button>登録</button>
            </form>
            <Link href={"/admin/categories/show"}>カテゴリー一覧</Link>
            <Link href={"/admin/products/create"}>商品登録</Link>
        </div>
    )
}

export default CreateCategory