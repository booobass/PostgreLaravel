"use client"

import { useAuth } from "@/context/AuthContext"
import api from "@/lib/axios"
import { User } from "@/type/type"
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
            console.log(response.data)
        } catch {
            alert("ログイン出来ません")
        }
    }

    return (
        <div>
            <h2>ログイン</h2>
            <form onSubmit={handleSubmit}>
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
                <button>ログイン</button>
            </form>
        </div>
    )
}

export default Login