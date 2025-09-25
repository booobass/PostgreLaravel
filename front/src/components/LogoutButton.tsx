"use client"

import { useAuth } from "@/context/AuthContext"
import api from "@/lib/axios"
import btn from "@/styles/button.module.css"
import { useRouter } from "next/navigation"

const LogoutButton = () => {

    const router = useRouter()

    const {logout} = useAuth()

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await api.post("/api/logout",
                {},
                {
                    headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
                }    
            )
            localStorage.removeItem("token")
            logout()
            alert("ログアウトしました")
            router.push("/")
        } catch {
            alert("ログアウトできません")
        }
    }

    return (
        <div className="warapper w-[800px]">
            <button onClick={handleDelete} className={btn.logout}>ログアウト</button>
        </div>
    )
}

export default LogoutButton