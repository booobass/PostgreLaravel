"use client"

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({children}: {children: React.ReactNode}) {

    // const authContext = useAuth()
    // const user = authContext?.user
    const {user, loading} = useAuth()
    const router = useRouter()

    useEffect(() => {

        if(loading) {
            return
        }

        console.log("layout", user)

        if(!user) {
            router.replace("/users/login")
            return
        }

        if(!user.is_admin) {
            router.replace("/users/products")
            return
        }

        if(user.role === "Boss") {
            router.replace("/admin/users")
            return
        } else if (user.role === "Editor") {
            router.replace("/admin/products")
        }
    }, [user, router, loading])
    return <>{children}</>
}