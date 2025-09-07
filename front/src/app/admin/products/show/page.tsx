"use client"

import { ReadProduct } from "@/components/ReadProduct"
import Search from "@/components/Search"
import { Product } from "@/type/type"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const AdminShow = () => {

    const [params, setParams] = useState({})
    const {products, loading} = ReadProduct(params)

    return (
        <div>
            <h4>商品管理</h4>
            <Search onSearch={setParams} />
            {loading && <p>読み込み中、、、</p>}
            <div>
                {products.map((product: Product) => (
                    <div key={product.id}>
                        <Image
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${product.image}`}
                            height={100}
                            width={100}
                            alt={product.name}
                            priority
                        />
                        <p>{product.name}</p>
                        <p>{product.price}</p>
                        <p>{product.stock}</p>
                        <p>{product.categories?.map(category => category.name).join("、")}</p>
                        <p>{product.description}</p>
                        <Link href={`../products/update/${product.id}`}>編集</Link>
                        <Link href={`../products/delete/${product.id}`}>削除</Link>
                    </div>
                ))}
            </div>
            <Link href={"../products/create"}>商品登録</Link>
            <Link href={"../users"}>ユーザー管理</Link>
        </div>
    )

}

export default AdminShow