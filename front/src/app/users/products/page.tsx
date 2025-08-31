"use client"
import api from "@/lib/axios"
import { Product } from "@/type/type"
import Image from "next/image"
import { useEffect, useState } from "react"

 

const Products = () => {

    const [products, setProducts] = useState<Product[]>([])

    const fetchProducts = async () => {
        try {
            const response = await api.get("/api/product", {
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
            })
            setProducts(response.data.products)
            console.log(response.data.products)

        } catch {
            alert("商品取得出来ません")
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const [quantity, setQuantity] = useState<{[key: number]: string}>({})

    console.log("QQ",quantity)

    const handleCart = async (e: React.FormEvent<HTMLFormElement>, product_id: number) => {
        e.preventDefault()
        try {
            await api.post("/api/cart/store",
                {
                    product_id: product_id,
                    quantity: Number(quantity[product_id])
                },
                {
                    headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
                }
            )
            alert("カートに入りました")
            setQuantity({...quantity, [product_id]: ""})
        } catch {
            alert("カートに入れられません")
        }
    }


    return (
        <div>
            <h3>商品一覧</h3>
            <div>
                {products.map((product :Product) => (
                    <div key={product.id}>
                        <div>
                            <h4>{product.name}</h4>
                            <p>{product.price}</p>
                            <Image
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${product.image}`}
                                height={100}
                                width={100}
                                alt={product.name}
                                priority
                                />
                            <p>{product.description}</p>
                            <p>{product.categories?.map(category => category.name).join(", ")}</p>
                        </div>
                        <div>
                            <form onSubmit={(e) => handleCart(e, product.id)}>
                                <input type="hidden" name="product_id" value={product.id} />
                                <label>個数：
                                    <input
                                        type="number"
                                        name="quantity"
                                        value={quantity[product.id] || ""}
                                        onChange={(e) => setQuantity({...quantity, [product.id]: e.target.value})} />
                                </label>
                                <button>カートに入れる</button>
                            </form>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Products