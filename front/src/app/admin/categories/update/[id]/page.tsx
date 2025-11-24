"use client"

import { ReadCategory } from "@/components/ReadCategory"
import api from "@/lib/axios"
import btn from "@/styles/button.module.css"
import styles from "@/styles/form.module.css"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const UpdateCategory = () => {

    const router = useRouter()

    const param = useParams()
    const id = param.id as string

    const {categories} = ReadCategory()

    const singleCategory = categories.find((e) => (String(e.id) === id))

    const [name, setName] = useState("")

    useEffect(() => {
        if(singleCategory) {
            setName(singleCategory.name)
        }
    }, [singleCategory])

    // console.log("UC", name)

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await api.post(`/api/category/${id}`,
                {
                    name: name
                }, {
                    headers: {
                        "X-HTTP-Method-Override": "PATCH",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )
            alert("更新しました")
            router.push("/admin/categories/show")
        } catch {
            alert("権限がありません")
        }
    }

    return (
        <div className="warapper">
            <div className={`${styles.admin_main} w-[700px]`}>
                <h4 className="text-xl font-bold">カテゴリー編集</h4>
                <form onSubmit={handleUpdate} className={styles.admin_form}>
                    <label className={styles.label}>カテゴリー名：
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={styles.admin_input} />
                    </label>
                    <button className={`${btn.adminBtn} mt-6 ml-60 font-bold`}>更新</button>
                </form>
                <div className={`${btn.linkBtn} w-[180px]`}>
                    <Link href={"/admin/categories/show"}>キャンセル</Link>
                </div>
            </div>
        </div>
    )

}

export default UpdateCategory