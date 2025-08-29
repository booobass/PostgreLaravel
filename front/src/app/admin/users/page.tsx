"use client"

import api from "@/lib/axios";
import { useState } from "react";

const AdminUser = () => {

    const [role, setRole] = useState("");

    const handleSubmit = async (e :React.FormEvent) => {
        e.preventDefault()
        try {
            await api.post("/api/admin/store",
                {
                    role: role
                }, {
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}`}
            })
            alert("登録しました")
        } catch {

        }
    }

    console.log("AD", role)

    return (
        <div>
            <h3>権限</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        type="text"
                        name="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)} />
                </label>
                <button>登録</button>
            </form>
        </div>
    )
}

export default AdminUser