"use client"

import { useAuth } from "@/context/AuthContext"
import { zen } from "@/fonts/fonts"
import api from "@/lib/axios"
import btn from "@/styles/button.module.css"
import styles from "@/styles/form.module.css"
import { User } from "@/type/type"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

const Login = () => {
    const [user, setUser] = useState<User>({
        email: "",
        password: "",
    })

    const handleChange = (e :React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const {login} = useAuth()

    const router = useRouter()

    const handleSubmit = async (e :React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await api.post("/api/login",
                {
                    email: user.email,
                    password: user.password,
                    password_confirmation: user.password
                }
            )
            const token = await response.data.token
            localStorage.setItem("token", token)
            login(response.data.user, response.data.token)
            alert("ログインしました")
            console.log("UL", response.data)
            if(response.data.user.is_admin && response.data.user.role === "Boss") {
                router.push("../../admin/users")
            } else if(response.data.user.is_admin) {
                router.push("../../admin/products/show")
            } else {
                router.push("../users/products")
            }
        } catch {
            alert("ログイン出来ません")
        }
    }

    return (
        <div className="warapper">
            <div className={`${styles.main} ${zen.className}`}>
                <h2 className="text-2xl font-bold">ログインページ</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <label className={`${styles.label} font-[500]`}>メールアドレス：
                        <input
                            type="text"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            required
                            className={styles.input} />
                    </label>
                    <label className={`${styles.label} font-[500] mt-3`}>パスワード：
                        <input
                            type="text"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            required
                            className={`${styles.input}`} />
                    </label>
                    <button className={`${btn.submitBtn} mt-6 ml-38`}>ログイン</button>
                </form>
                <div className="mt-6 ml-30">
                    <Link href={"/"}>トップページに戻る</Link>
                </div>
            </div>
        </div>
    )
}

export default Login