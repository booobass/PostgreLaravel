"use client"

import { zen } from "@/fonts/fonts"
import api from "@/lib/axios"
import btn from "@/styles/button.module.css"
import styles from "@/styles/form.module.css"
import { User } from "@/type/type"
import { useRouter } from "next/navigation"
import { useState } from "react"

const Register = () => {

    const router = useRouter()

    const [user, setUser] = useState<User>({
        name: "",
        email: "",
        password: ""
    })

    const handleChange = (e :React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await api.post("/api/register",
                {
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    password_confirmation: user.password
                }
            )
            alert("登録しました")
            router.push("/users/login")
        } catch {
            alert("登録出来ません")
        }
    }

    return (
        <div className="warapper">
            <div className={`${styles.main} ${zen.className}`}>
                <h2 className="text-2xl font-bold">ユーザー登録ページ</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <label className={`${styles.label} font-[500]`}>ユーザー名：
                        <input
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            required
                            className={styles.input} />
                    </label>
                    <label className={`${styles.label} font-[500] mt-3`}>メールアドレス：
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
                            className={styles.input} />
                    </label>
                    <button className={`${btn.submitBtn} mt-6 ml-44`}>登録</button>
                </form>
            </div>
        </div>
    )
}

export default Register