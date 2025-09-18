"use client"

import { ReadProduct } from "@/components/ReadProduct"
import Search from "@/components/Search"
import styles from "@/styles/admin_product.module.css"
import btn from "@/styles/button.module.css"
import { Product } from "@/type/type"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const AdminShow = () => {

    const [params, setParams] = useState({})
    const {products, loading} = ReadProduct(params)

    return (
        <div className="warapper">
            <div className={`${styles.main} w-[800px]`}>
                <h4 className="text-xl font-bold">商品管理</h4>
                <Search onSearch={setParams} />
                {loading && <p>読み込み中、、、</p>}
                <div>
                    {products.map((product: Product) => (
                        <div key={product.id} className={`${styles.product} mt-6`}>
                            <div>
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${product.image}`}
                                    height={100}
                                    width={100}
                                    alt={product.name}
                                    priority
                                />
                            </div>
                            <div className="w-[250px] ml-6 text-center">
                                <p>{product.name}{"  "}¥{product.price}：{product.stock}個</p>
                                <p>{product.categories?.map(category => category.name).join("、")}</p>
                            </div>
                            <div>
                                <p className="w-[200px] ml-6 text-base">{product.description}</p>
                            </div>
                            <div className="w-[120px] items-center flex justify-around">
                                <Link href={`../products/update/${product.id}`}  className={`${btn.adminBtn} inline-block`}>編集</Link>
                                <Link href={`../products/delete/${product.id}`}  className={`${btn.adminBtn} inline-block`}>削除</Link>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={`${btn.linkBtn} mt-10 w-[400px]`}>
                    <Link href={"../products/create"}>商品登録</Link>
                    <Link href={"../users"}>ユーザー管理</Link>
                </div>
            </div>
        </div>
    )

}

export default AdminShow