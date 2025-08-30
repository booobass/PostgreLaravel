"use client"

import { AdminUser, AuthContextType } from "@/type/type"
import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({children}: {children: React.ReactNode}) => {

    const [user, setUser] = useState<AdminUser | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const savedUser = localStorage.getItem("user")
        const savedToken = localStorage.getItem("token")

        if(savedUser && savedToken) {
            setUser(JSON.parse(savedUser))
            setToken(savedToken)
        }
        setLoading(false)
    }, [])

    const login = (user: AdminUser, token: string) => {
        setUser(user)
        setToken(token)
        localStorage.setItem("user", JSON.stringify(user))
        localStorage.setItem("token", token)
    }

    const logout = () => {
        setUser(null)
        setToken(null)
        localStorage.removeItem("user")
        localStorage.removeItem("token")
    }

    return (
        <AuthContext.Provider value={{user, token, loading, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error("useAuth must be used within AuthProvider")
    return ctx
  }