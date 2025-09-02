"use client"

import api from "@/lib/axios"
import { Product } from "@/type/type"
import { useEffect, useState } from "react"

export const ReadProduct = () => {
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

    return {products}

}