"use client"

import { useAuth } from "@/context/AuthContext"
import api from "@/lib/axios"
import { useRouter } from "next/navigation"

const DemoLogin = () => {

    const router = useRouter()

    const {login} = useAuth()

    const handleUserLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await api.post("/api/login", {
                email: "demo@example.com",
                password: "password",
                password_confirmation: "password"
            })
            const token = await response.data.token
            const user = await response.data.user
            localStorage.setItem("token", token)
            login(user, token)
            router.push("/users/products")
        } catch {
            alert("失敗しました")
        }
    }

    const handleAdminLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await api.post("/api/login", {
                email: "admin@example.com",
                password: "password",
                password_confirmation: "password"
            })
            const token = await response.data.token
            const user = await response.data.user
            localStorage.setItem("token", token)
            login(user, token)
            router.push("/admin/users")
        } catch {
            alert("失敗しました")
        }
    }

    return (
        <div className="mt-6 text-center">
            <p className="font-bold text-red-700">このデモでは実際の個人情報を登録しないで下さい</p>
            <p className="font-bold">下記からログインして下さい</p>
            <p className="text-red-800">尚、デモ管理者は更新、削除は出来ません</p>
            <div className="flex gap-6 mt-2">
                <button onClick={handleUserLogin} className="border-b">デモユーザーでログイン</button>
                <button onClick={handleAdminLogin} className="border-b">デモ管理者でログイン</button>
            </div>
        </div>
    )
}

export default DemoLogin