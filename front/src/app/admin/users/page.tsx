"use client"

import api from "@/lib/axios";
import btn from "@/styles/button.module.css";
import tb from "@/styles/table.module.css";
import { User } from "@/type/type";
import { useEffect, useState } from "react";

const AdminUser = () => {

    const [users, setUsers] = useState<User[]>([])

    const fetchUsers = async () => {
        const response = await api.get("/api/user", {
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
        })
        setUsers(response.data.users)
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const [info, setInfo] = useState({
        user_id: "",
        role: ""
    })

    // console.log("IN", info)
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
                },
            )
            alert("更新しました")
            fetchUsers()
        } catch {
            alert("権限がありません")
        }
    }


    return (
        <div className="warapper">
            <div className={`${tb.main} w-2xl`}>
                <h3 className="text-xl font-bold">ユーザー管理</h3>
                <table className={`mt-4`}>
                    <thead>
                        <tr className="text-left">
                            <th>名前</th>
                            <th>Email</th>
                            <th>権限</th>
                            <th colSpan={2}>変更</th>
                        </tr>
                    </thead>
                    <tbody className={tb.tbody}>
                        {users.map((u: User) => (
                            <tr key={u.id}>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>{u.role ?? "User"}</td>
                                <td>
                                    {u.role === "Boss" ? null : (
                                        <select
                                            name="role"
                                            onChange={(e) => handleChange(e, String(u.id))}
                                            className={btn.adminBtn}
                                        >
                                            <option value="">User</option>
                                            <option value="Boss">Boss</option>
                                            <option value="Editor">Editor</option>
                                        </select>
                                    )}
                                </td>
                                <td>
                                    {u.role === "Boss" ? null : (
                                        <button onClick={updateRole} className={btn.adminBtn}>更新</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminUser