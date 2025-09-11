"use client"

import { ReadCategory } from "@/components/ReadCategory"
import api from "@/lib/axios"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"

const DeleteCategory = () => {

    const router = useRouter()

    const {categories} = ReadCategory()

    const params = useParams()
    const id = params.id as string

    const singleCategory = categories.find((e) => (String(e.id) === id))

    console.log("SC", singleCategory);


    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await api.delete(`/api/category/${id}`,
                {
                    headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
                }
            )
            router.push("/admin/categories/show")
            alert("削除しました")

        } catch {
            alert("削除出来ません")
        }

    }

    return (
        <div>
            <h4>カテゴリー削除</h4>
            <p>{singleCategory?.name}を削除してもよろしいですか？</p>
            <button onClick={handleDelete}>削除</button>
            <Link href={"/admin/categories/show"}>キャンセル</Link>
        </div>
    )

}

export default DeleteCategory