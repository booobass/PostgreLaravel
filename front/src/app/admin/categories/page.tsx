"use client"

import api from "@/lib/axios"
import { useState } from "react"

const CreateCategory = () => {

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
        </div>
    )
}

export default CreateCategory