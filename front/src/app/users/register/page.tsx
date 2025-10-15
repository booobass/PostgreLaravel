"use client"

import { zen } from "@/fonts/fonts"
import api from "@/lib/axios"
import btn from "@/styles/button.module.css"
import styles from "@/styles/form.module.css"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

const Register = () => {

    const router = useRouter()

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
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
                    password_confirmation: user.password_confirmation
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
                    <div className="text-right">
                        <label className={`${styles.label} font-[500]`}>ユーザー名：
                            <input
                                type="text"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                                required
                                className={`${styles.input} max-sm:block`} />
                        </label>
                        <label className={`${styles.label} font-[500] mt-3`}>メールアドレス：
                            <input
                                type="text"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                required
                                className={`${styles.input} max-sm:block`} />
                        </label>
                        <label className={`${styles.label} font-[500] mt-3`}>パスワード：
                            <input
                                type="text"
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                                required
                                className={`${styles.input} max-sm:block`} />
                        </label>
                        <label className={`${styles.label} font-[500] mt-3`}>パスワード確認：
                            <input
                                type="text"
                                name="password_confirmation"
                                value={user.password_confirmation}
                                onChange={handleChange}
                                required
                                className={`${styles.input} max-sm:block`} />
                        </label>
                        {user.password === user.password_confirmation ? null : (
                            <p>パスワードが一致しません</p>
                        )}
                    </div>
                    <button className={`${btn.submitBtn} mt-6 ml-44`}>登録</button>
                </form>
                <div className="mt-6 ml-30">
                    <Link href={"/"}>トップページに戻る</Link>
                </div>
            </div>
        </div>
    )
}

export default Register