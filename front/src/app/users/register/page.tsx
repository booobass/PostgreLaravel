"use client"

import api from "@/lib/axios"
import { User } from "@/type/type"
import { useState } from "react"

const Register = () => {

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
        } catch {
            alert("登録出来ません")
        }
    }

    return (
        <div>
            <h2>ユーザー登録</h2>
            <form onSubmit={handleSubmit}>
                <label>ユーザー名：
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        required />
                </label>
                <label>メールアドレス：
                    <input
                        type="text"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required />
                </label>
                <label>パスワード：
                    <input
                        type="text"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        required />
                </label>
                <button>登録</button>
            </form>
        </div>
    )
}

export default Register