"use client"

import api from "@/lib/axios"
import { Product } from "@/type/type"
import { useCallback, useEffect, useState } from "react"

type Props = {
    keyword?: string
    category_id?: string
    sort?: string
}

export const ReadProduct = (params: Props = {}) => {
    const [products, setProducts] = useState<Product[]>([])
    const [lastPage, setLastPage] = useState(1)
    const [loading, setLoading] = useState(false)

    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true)
            const response = await api.get("/api/product", {
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
                params
            })
            setProducts(response.data.products.data)
            setLastPage(response.data.products.last_page)
            console.log("search",response.data.products)

        } catch {
            alert("商品取得出来ません")
        } finally {
            setLoading(false)
        }
    }, [params])


    useEffect(() => {
            fetchProducts()
        }, [fetchProducts])

    return {products, lastPage, loading}

}