"use client"

import { ReadCategory } from "@/components/ReadCategory"
import api from "@/lib/axios"
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

    console.log("UC", name)

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
            alert("更新できません")
        }
    }

    return (
        <div>
            <h4>カテゴリー編集</h4>
            <form onSubmit={handleUpdate}>
                <label>カテゴリー名：
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                </label>
                <button>更新</button>
            </form>
            <Link href={"/admin/categories/show"}>キャンセル</Link>
        </div>
    )

}

export default UpdateCategory