"use client"

import { ReadCategory } from "@/components/ReadCategory"
import btn from "@/styles/button.module.css"
import tb from "@/styles/table.module.css"
import Link from "next/link"

const ShowCategory = () => {

    const {categories} = ReadCategory()


    console.log("SC", categories)

    return (
        <div className="warapper">
            <div className={`${tb.main} w-[600px]`}>
                <h4 className="text-xl font-bold">カテゴリー管理</h4>
                <table className="mt-6">
                    <thead>
                        <tr>
                            <th className="w-[230px]">カテゴリー名</th>
                            <th colSpan={2}>変更</th>
                        </tr>
                    </thead>
                    <tbody className={tb.tbody}>
                        {categories.map((c) => (
                            <tr key={c.id}>
                                <td className="text-center">{c.name}</td>
                                <td>
                                    <Link href={`/admin/categories/update/${c.id}`} className={btn.adminBtn}>編集</Link>
                                </td>
                                <td>
                                    <Link href={`/admin/categories/delete/${c.id}`} className={btn.adminBtn}>削除</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ShowCategory