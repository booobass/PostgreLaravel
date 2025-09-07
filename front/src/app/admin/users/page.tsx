"use client"

import api from "@/lib/axios";
import { User } from "@/type/type";
import Link from "next/link";
import { useEffect, useState } from "react";

const AdminUser = () => {

    const [users, setUsers] = useState<User[]>([])

    const fetchUsers = async () => {
        const response = await api.get("/api/user", {
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
        })
        console.log("AU", response.data)
        setUsers(response.data.users)
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const [info, setInfo] = useState({
        user_id: "",
        role: ""
    })

    console.log("IN", info)
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>, userId: string) => {
        setInfo({
            user_id: userId,
            role: e.target.value
        })
    }

    const updateRole = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await api.post("/api/admin/store",
                {
                    user_id: info.user_id,
                    role: info.role === "" ? null : info.role
                }, {
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}`}
            })
            alert("登録しました")
            fetchUsers()
        } catch {

        }
    }


    return (
        <div>
            <h3>権限</h3>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>名前</th>
                        <th>Email</th>
                        <th>権限</th>
                        <th>変更</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u: User) => (
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td>{u.role ?? "User"}</td>
                            <td>
                                <select
                                    name="role"
                                    onChange={(e) => handleChange(e, String(u.id))}
                                >
                                    <option value="">User</option>
                                    <option value="Boss">Boss</option>
                                    <option value="Editor">Editor</option>
                                </select>
                                <button onClick={updateRole}>更新</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link href={"/admin/products/show"}>商品管理</Link>
            <Link href={"/admin/products/create"}>商品登録</Link>
        </div>
    )
}

export default AdminUser