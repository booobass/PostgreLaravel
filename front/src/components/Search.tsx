"use client"

import { Category } from "@/type/type";
import { useState } from "react";
import { ReadCategory } from "./ReadCategory";

type Props = {
    onSearch: (params: {
        keyword?: string;
        category_id?: string;
        sort?: string;
    }) => void
}

const Search = ({onSearch}: Props) => {
    const [keyword, setKeyword] = useState("")
    const [category, setCategory] = useState("")
    const [sort, setSort] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSearch({keyword, category_id: category, sort})
    }

    const {categories} = ReadCategory()

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        type="text"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)} />
                </label>
                <label>
                    <select
                        value={category}
                        name="category"
                        onChange={(e) => setCategory(e.target.value)}>
                        <option value="">全カテゴリー</option>
                        {categories.map((c: Category) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                </label>
                <label>
                    <select
                        name="stock"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}>
                        <option value="">並び替えなし</option>
                        <option value="price_asc">価格が安い順</option>
                        <option value="price_desc">価格が高い順</option>
                        <option value="stock_asc">在庫が少ない順</option>
                        <option value="stock_desc">在庫が多い順</option>
                    </select>
                </label>
                <button>検索</button>
            </form>
        </div>
    )
}

export default Search