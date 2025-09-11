"use client"

import { ReadCategory } from "@/components/ReadCategory"
import Link from "next/link"

const ShowCategory = () => {

    const {categories} = ReadCategory()


    console.log("SC", categories)

    return (
        <div>
            <h4>カテゴリー一覧</h4>
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
                            <td>
                                <Link href={`/admin/categories/update/${c.id}`}>編集</Link>
                            </td>
                            <td>
                                <Link href={`/admin/categories/delete/${c.id}`}>削除</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link href={"/admin/categories/create"}>カテゴリー作成</Link>
            <Link href={"/admin/products/create"}>商品登録</Link>
        </div>
    )
}

export default ShowCategory