"use client"

import { ReadProduct } from "@/components/ReadProduct"
import api from "@/lib/axios"
import btn from "@/styles/button.module.css"
import styles from "@/styles/form.module.css"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"

const AdminDelete = () => {

    const router = useRouter()

    const {products} = ReadProduct()

    const params = useParams()
    const id = params.id as string

    const singleProduct = products.find((e) => (String(e.id) === id))

    console.log(singleProduct)

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await api.delete(`/api/product/${id}`,
                {
                    headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
                }
            )
            alert("削除しました")
            router.push("/admin/products/show")
        } catch {
            alert("削除出来ません")
        }
    }

    return (
        <div className="warapper">
            <div className={`${styles.admin_main} w-[600px]`}>
                <h4 className="text-xl font-bold">商品削除</h4>
                <p className="mt-8">{singleProduct?.name}を削除してもよろしいですか？</p>
                <div className={`${btn.linkBtn} mt-8 w-[300px]`}>
                    <button onClick={handleDelete} className="font-bold">削除</button>
                    <Link href={"../../products/show"}>キャンセル</Link>
                </div>
            </div>
        </div>
    )
}

export default AdminDelete