"use client"

import { ReadCategory } from "@/components/ReadCategory"
import api from "@/lib/axios"
import btn from "@/styles/button.module.css"
import styles from "@/styles/form.module.css"
import { Category } from "@/type/type"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"

const AdminUpdate = () => {

    const router = useRouter()

    const [products, setProduct] = useState({
        name: "",
        price: "",
        description: "",
        stock: "",
        image: "" as File | string
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProduct({
            ...products,
            [e.target.name]: e.target.value
        })
    }
    
    const [updateCategories, setUpdateCategories] = useState<number[]>([])

    const params = useParams()
    const id = params.id as string

    useEffect(() => {
        const getSingleProduct = async (id: string) => {
            const response = await api.get(`/api/product/${id}`)
            const singleProduct = await response.data.product
            console.log("sP", singleProduct)
            setProduct({
                name: singleProduct.name,
                price: singleProduct.price,
                description: singleProduct.description,
                stock: singleProduct.stock,
                image: singleProduct.image
            })

            if(singleProduct.categories) {
                setUpdateCategories(singleProduct.categories.map((c: Category) => c.id))
            }
        }
        getSingleProduct(id as string)
    }, [id])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append("name", products.name)
            formData.append("price", products.price)
            formData.append("description", products.description)
            formData.append("stock", products.stock)
            if(products.image instanceof File) {
                formData.append("image", products.image)
            }

            updateCategories.forEach(c => {
                formData.append("categories[]", String(c))
            })

            await api.post(`/api/product/${id}`,
                formData,
                {
                    headers: {
                        "X-HTTP-Method-Override": "PATCH",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "multipart/form-data"
                    }
                }
            )
            alert("更新しました")
            router.push("/admin/products/show")
        } catch {
            alert("権限がありません")
        }
    }

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if(acceptedFiles.length > 0) {
            setProduct({...products, image: acceptedFiles[0]})
        }
    }, [products])
    
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

    const {categories} = ReadCategory()

    console.log("cc", categories)
    console.log("Uc", updateCategories)

    const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value)
        if(e.target.checked) {
            setUpdateCategories([...updateCategories, value])
        } else {
            setUpdateCategories(updateCategories.filter(c => c !== value))
        }
    }
    

    return (
        <div className="warapper">
            <div className={`${styles.admin_main} w-[700px]`}>
                <h4 className="text-xl font-bold">商品更新</h4>
                <form onSubmit={handleSubmit} className={styles.admin_form}>
                    <label className={`${styles.label}`}>商品名：
                        <input
                            type="text"
                            name="name"
                            value={products.name}
                            onChange={handleChange}
                            className={styles.admin_input} />
                    </label>
                    <label className={`${styles.label} mt-3`}>値段：
                        <input
                            type="text"
                            name="price"
                            value={products.price}
                            onChange={handleChange}
                            className={`${styles.admin_input} w-[130px]`} />
                    </label>
                    <div className="mt-3">
                        <p>現在の写真</p>
                        {typeof products.image === "string" && products.image && (
                            <div className="relative w-[90px] h-[80px]">
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/images/${products.image}`}
                                    alt={`${products.name}`}
                                    fill
                                    sizes="90px"
                                    className="object-cover object-center rounded-sm"
                                />                                   
                            </div>
                        )}
                    </div>
                    <label className={`${styles.label} mt-3`}>写真変更
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            {isDragActive}
                            <p>ここに画像をドロップして下さい</p>
                        </div>
                        {products.image && <p>選択した画像：{products.image instanceof File ? products.image.name : products.image}</p>}
                    </label>
                    <label className={`${styles.label} mt-3`}>商品説明：
                        <textarea
                            name="description"
                            value={products.description}
                            onChange={handleChange}
                            rows={1}
                            className={styles.admin_input} ></textarea>
                    </label>
                    {categories.map((c :Category) => (
                        <label key={c.id} className={`${styles.label} mt-3`}>{c.name}：
                            <input
                                type="checkbox"
                                name="categories"
                                value={c.id}
                                checked={updateCategories.includes(c.id)}
                                onChange={handleCategoryChange}
                                className={styles.admin_input} />
                        </label>
                    ))}
                    <label className={`${styles.label}`}>在庫数：
                        <input
                            type="number"
                            name="stock"
                            value={products.stock}
                            onChange={handleChange}
                            className={`${styles.admin_input} w-[80px]`} />
                    </label>
                    <button className={`${btn.adminBtn} mt-6 ml-55 font-bold`}>更新</button>
                </form>
                <div className={`${btn.linkBtn} mt-3 w-[160px]`}>
                    <Link href={"../../products/show"}>キャンセル</Link>        
                </div>
            </div>
        </div>
    )

}

export default AdminUpdate