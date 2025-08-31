"use client"
import api from "@/lib/axios"
import { Product } from "@/type/type"
import Image from "next/image"
import { useEffect, useState } from "react"

 

const Products = () => {

    const [products, setProducts] = useState<Product[]>([])

    const fetchProducts = async () => {
        try {
            const response = await api.get("/api/product", {
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
            })
            setProducts(response.data.products)
            console.log(response.data.products)

        } catch {
            alert("商品取得出来ません")
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])


    return (
        <div>
            <h3>商品一覧</h3>
            <div>
                {products.map((product :Product) => (
                    <div key={product.id}>
                        <h4>{product.name}</h4>
                        <p>{product.price}</p>
                        <Image
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${product.image}`}
                            height={100}
                            width={100}
                            alt={product.name}
                            priority
                            />
                        <p>{product.description}</p>
                        <p>{product.categories?.map(category => category.name).join(", ")}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Products