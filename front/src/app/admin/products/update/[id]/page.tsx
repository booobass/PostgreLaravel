"use client"

import { ReadCategory } from "@/components/ReadCategory"
import api from "@/lib/axios"
import { Category } from "@/type/type"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"

const AdminUpdate = () => {

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

    const params = useParams()
    const id = params.id as string

    useEffect(() => {
        const getSingleProduct = async (id: string) => {
            const response = await api.get(`/api/product/${id}`)
            const singleProduct = await response.data.product
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
        } catch {
            alert("更新出来ません")
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

    const [updateCategories, setUpdateCategories] = useState<number[]>([])
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
        <div>
            <h4>商品更新</h4>
                <form onSubmit={handleSubmit}>
                    <label>商品名：
                        <input
                            type="text"
                            name="name"
                            value={products.name}
                            onChange={handleChange} />
                    </label>
                    <label>値段：
                        <input
                            type="text"
                            name="price"
                            value={products.price}
                            onChange={handleChange} />
                    </label>
                    <div>
                        <p>現在の写真</p>
                        {typeof products.image === "string" && products.image && (
                            <Image
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${products.image}`}
                                height={50}
                                width={50}
                                alt={`${products.name}`}/>
                        )}
                    </div>
                    <label>写真変更
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            {isDragActive}
                            <p>ここに画像をドロップして下さい</p>
                        </div>
                        {products.image && <p>選択した画像：{products.image instanceof File ? products.image.name : products.image}</p>}
                    </label>
                    <label>商品説明：
                        <textarea
                            name="description"
                            value={products.description}
                            onChange={handleChange}
                            rows={5} ></textarea>
                    </label>
                    {categories.map((c :Category) => (
                        <label key={c.id}>{c.name}
                            <input
                                type="checkbox"
                                name="categories"
                                value={c.id}
                                checked={updateCategories.includes(c.id)}
                                onChange={handleCategoryChange} />
                        </label>
                    ))}
                    <label>在庫数：
                        <input
                            type="number"
                            name="stock"
                            value={products.stock}
                            onChange={handleChange} />
                    </label>
                    <button>登録</button>
                </form>
                <Link href={"../../products/show"}>キャンセル</Link>        
        </div>
    )

}

export default AdminUpdate