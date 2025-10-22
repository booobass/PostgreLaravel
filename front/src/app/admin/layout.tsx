"use client"

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AdminHeader from "./header";

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
            router.replace("/")
        } else if(!user.is_admin) {
            router.replace("/users/products")
        }

    }, [user, router, loading])

    if(loading || !user || !user.is_admin) {
        return null
    }
    
    return (
        <div className="w-[1200px] text-xl text-black-500">
            <AdminHeader />
            {children}
        </div>
    )
}