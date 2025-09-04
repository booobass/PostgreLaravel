"use client"

import { ReadProduct } from "@/components/ReadProduct"
import { Product } from "@/type/type"
import Image from "next/image"
import Link from "next/link"

const AdminShow = () => {
    const {products} = ReadProduct()

    return (
        <div>
            <h4>商品管理</h4>
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
                    </div>
                ))}
            </div>
        </div>
    )

}

export default AdminShow