"use client"

import { ReadCategory } from "@/components/ReadCategory"
import api from "@/lib/axios"
import btn from "@/styles/button.module.css"
import styles from "@/styles/form.module.css"
import { Category } from "@/type/type"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"

const AdminProducts = () => {

    const router = useRouter()

    const [product, setProduct] = useState({
        name: "",
        price: "",
        description: "",
        stock: ""
    })

    const [image, setImage] = useState<File | null>(null)

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if(acceptedFiles.length > 0) {
            setImage(acceptedFiles[0])
        }
    }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: {
            'image/*': [".png", ".jpg", ".jpeg", ".gif"]
        },
        maxFiles: 1,
        maxSize: 5 * 1024 * 1024,
        validator: (file) => {
            if(file.size > 5 * 1024 * 1024) {
                return {
                    code: "file-too-large",
                    message: "ファイルサイズが大きすぎます"
                }
            }
            return null
        }
    })

    const handleChange = (e :React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })
    }

    const [selectedCategories, setSelectedCategories] = useState<number[]>([])

    const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value)
        if(e.target.checked) {
            setSelectedCategories([...selectedCategories, value])
        } else {
            setSelectedCategories(selectedCategories.filter(c => c !== value))
        }
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append("name", product.name)
            formData.append("price", product.price)
            formData.append("description", product.description)
            formData.append("stock", product.stock)
            
            if(image) {
                formData.append("image", image)
            }

            selectedCategories.forEach(c => {
                formData.append("categories[]", String(c))
            })

            console.log(formData)

            await api.post("/api/product/store", 
                formData,
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "multipart/form-data"
                    }
                }
            )
            alert("商品を登録しました")
            router.push("/admin/products/show")
        } catch {
            alert("商品登録に失敗しました")
        }
    }

    const { categories } = ReadCategory()
    console.log(categories)

    return (
        <div className="warapper">
            <div className={`${styles.admin_main} w-[700px]`}>
                <h4 className="text-xl font-bold">商品登録</h4>
                <form onSubmit={handleSubmit} className={styles.admin_form}>
                    <label className={`${styles.label}`}>商品名：
                        <input
                            type="text"
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                            className={styles.admin_input} />
                    </label>
                    <label className={`${styles.label} mt-3`}>値段：
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                            className={styles.admin_input} />
                    </label>
                    <label className={`${styles.label} mt-3`}>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            {isDragActive}
                            <p>ここに画像をドロップして下さい</p>
                        </div>
                        {image && <p>選択した画像：{image.name}</p>}
                    </label>
                    <label className={`${styles.label} mt-3`}>商品説明：
                        <textarea
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            rows={1}
                            className={styles.admin_input} ></textarea>
                    </label>
                    <p className="mt-3">カテゴリー選択</p>
                    {categories.map((c :Category) => (                       
                        <label key={c.id} className={`${styles.label}`}>{c.name}：
                            <input
                                type="checkbox"
                                name="categories"
                                value={c.id}
                                checked={selectedCategories.includes(c.id)}
                                onChange={handleCategoryChange}
                                className={styles.admin_input} />
                        </label>
                    ))}
                    <label className={`${styles.label} mt-3`}>在庫数：
                        <input
                            type="number"
                            name="stock"
                            value={product.stock}
                            onChange={handleChange}
                            className={styles.admin_input} />
                    </label>
                    <button className={`${btn.adminBtn} mt-6 ml-50 font-bold`}>登録</button>
                </form>
                <div className={`${btn.linkBtn} mt-10 w-[500px]`}>
                    <Link href={"/admin/categories/create"}>カテゴリー作成</Link>
                    <Link href={"/admin/products/show"}>商品管理</Link>
                    <Link href={"/admin/users"}>ユーザー管理</Link>
                </div>
            </div>
        </div>
    )
}

export default AdminProducts