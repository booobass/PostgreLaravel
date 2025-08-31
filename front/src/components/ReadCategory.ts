"use client"

import api from "@/lib/axios"
import { Category } from "@/type/type"
import { useEffect, useState } from "react"

export const ReadCategory = () => {

    const [categories, setCategories] = useState<Category[]>([])

    const fetchCategories = async () => {
        try {
            const response = await api.get("/api/category", {
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
            })
            setCategories(response.data.categorys)
        } catch {
            alert("カテゴリー取得出来ません")
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    return { categories, fetchCategories }
}