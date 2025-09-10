"use client"

import { ReadCategory } from "@/components/ReadCategory"
import Link from "next/link"

const ShowCategory = () => {

    const {categories} = ReadCategory()


    console.log("SC", categories)

    return (
        <div>
            <h4>カテゴリー</h4>
            <table>
                <thead>
                    <tr>
                        <th colSpan={3}>カテゴリー</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((c) => (
                        <tr key={c.id}>
                            <td>{c.name}</td>
                            <td>編集</td>
                            <td>
                                <Link href={`/admin/categories/delete/${c.id}`}>削除</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ShowCategory