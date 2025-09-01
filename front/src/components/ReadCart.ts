"use client"

import api from "@/lib/axios";
import { useEffect, useState } from "react";

export const ReadCart = () => {

    const [carts, setCarts] = useState([]);

    const fetchCart = async () => {
        try {
            const response = await api.get("/api/cart",
                {
                    headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
                }
            )
            setCarts(response.data.carts)
            console.log(response.data.carts)

        } catch {
            alert("カート取得出来ません")
        }
    }

    useEffect(() => {
        fetchCart()
    }, [])

    return { carts, fetchCart }

}
