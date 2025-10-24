"use client"

import { ReadCategory } from "@/components/ReadCategory"
import api from "@/lib/axios"
import btn from "@/styles/button.module.css"
import styles from "@/styles/form.module.css"
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
            alert("権限がありません")
        }

    }

    return (
        <div className="warapper">
            <div className={`${styles.admin_main} w-[600px]`}>
                <h4 className="text-xl font-bold">カテゴリー削除</h4>
                <p className="mt-8">{singleCategory?.name}を削除してもよろしいですか？</p>
                <div className={`${btn.linkBtn} mt-8 w-[380px]`}>
                    <button onClick={handleDelete} className="font-bold">削除</button>
                    <Link href={"/admin/categories/show"}>キャンセル</Link>
                </div>
            </div>
        </div>
    )

}

export default DeleteCategory