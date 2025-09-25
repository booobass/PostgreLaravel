"use client"

import LogoutButton from "@/components/LogoutButton";
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
        } else if(!user.is_admin) {
            router.replace("/users/products")
        }

    }, [user, router, loading])

    if(loading || !user || !user.is_admin) {
        return null
    }
    
    return (
        <div className="w-[1200px] max-w-7xl text-xl text-black-500">
            {children}
            <LogoutButton />
        </div>
    )
}