"use client"

import api from "@/lib/axios"
import btn from "@/styles/button.module.css"
import styles from "@/styles/form.module.css"
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
        <div className="warapper">
            <div className={`${styles.admin_main} w-[600px]`}>
                <h4 className="text-xl font-bold">カテゴリー作成</h4>
                <form onSubmit={handleSubmit} className={styles.admin_form}>
                    <label className={styles.label}>カテゴリー名：
                        <input
                            type="text"
                            name="name"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className={styles.admin_input} />
                    </label>
                    <button className={`${btn.adminBtn} mt-6 ml-50 font-bold`}>登録</button>
                </form>
            </div>
        </div>
    )
}

export default CreateCategory