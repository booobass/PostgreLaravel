"use client"
import { ReadProduct } from "@/components/ReadProduct"
import Search from "@/components/Search"
import api from "@/lib/axios"
import { Product } from "@/type/type"
import { AxiosError } from "axios"
import Image from "next/image"
import { useState } from "react"

 

const Products = () => {

    
    const [params, setParams] = useState({})
    
    const {products, loading} = ReadProduct(params)

    const [quantity, setQuantity] = useState<{[key: number]: string}>({})

    const [error, setError] = useState<{ [key: number]: string | null}>({})

    console.log("QQ",quantity)

    const handleCart = async (e: React.FormEvent<HTMLFormElement>, product_id: number) => {
        e.preventDefault()
        try {
            setError((prev) => ({...prev, [product_id]: null}))
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
        } catch (err: unknown) {
            alert("カートに入れられません")
            if (err instanceof AxiosError) {
                const message = err.response?.data.error || "エラーが発生しました"
                setError((prev) => ({...prev, [product_id]: message}))
            }
        }
    }


    return (
        <div>
            <h3>商品一覧</h3>
            <Search onSearch={setParams} />
            {loading && <p>読み込み中、、、</p>}
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
                            <p>{product.stock}個</p>
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
                                {error[product.id] && <p
                                    onClick={() => setError((prev) => ({...prev, [product.id]: null}))} 
                                    className="text-red-500">{error[product.id]}OK?</p>}
                            </form>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Products