"use client"

import api from "@/lib/axios"
import { Product } from "@/type/type"
import { useCallback, useEffect, useMemo, useState } from "react"

type Props = {
    keyword?: string
    category_id?: string
    sort?: string
}

export const ReadProduct = (params: Props = {}, isAuth = true) => {
    const [products, setProducts] = useState<Product[]>([])
    const [lastPage, setLastPage] = useState(1)
    const [loading, setLoading] = useState(false)

    const stableParams = useMemo(() => ({
        keyword: params.keyword,
        category_id: params.category_id,
        sort: params.sort
    }), [
        params.keyword,
        params.category_id,
        params.sort
    ])

    // useEffect(() => {

    //     const fetchProducts = async () => {
    //         try {
    //             setLoading(true)
    //             const response = await api.get("/api/product", {
    //                 headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
    //                 params: stableParams
    //             })
    //             setProducts(response.data.products.data)
    //             setLastPage(response.data.products.last_page)
    //             console.log("search",response.data.products)
    
    //         } catch {
    //             alert("商品取得出来ません")
    //         } finally {
    //             setLoading(false)
    //         }
    //     }
    //     fetchProducts()
    // }, [stableParams])

    const fetchProducts = useCallback(async () => {
        if(!isAuth) return
        try {
            setLoading(true)
            const response = await api.get("/api/product", {
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
                params: stableParams
            })
            setProducts(response.data.products.data)
            setLastPage(response.data.products.last_page)
        } catch {
            alert("商品取得出来ません")
        } finally {
            setLoading(false)
        }
    }, [stableParams, isAuth])

    useEffect(() => {
        fetchProducts()
    }, [fetchProducts])



    return {products, lastPage, loading, fetchProducts}

}

export const CustomerProduct = () => {

    const [customerProduct, setCustomerProduct] = useState<Product[]>([])

    const fetchCustomerProduct = useCallback(async () => {
        try {
            const response = await api.get("/api/product/customer")
            // console.log("customer", response.data.products)
            setCustomerProduct(response.data.products)
        } catch {
            alert("商品取得できません")
        }
    }, [])

    useEffect(() => {
        fetchCustomerProduct()
    }, [fetchCustomerProduct])

    return {customerProduct}

}