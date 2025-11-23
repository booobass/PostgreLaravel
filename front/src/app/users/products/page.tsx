"use client"
import { ReadProduct } from "@/components/ReadProduct"
import Search from "@/components/Search"
import api from "@/lib/axios"
import btn from "@/styles/button.module.css"
import form from "@/styles/form.module.css"
import styles from "@/styles/user_product.module.css"
import { Product } from "@/type/type"
import { AxiosError } from "axios"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import UserHeader from "../header"
 

const Products = () => {

    const router = useRouter()
    
    const [params, setParams] = useState({})
    
    const [quantity, setQuantity] = useState<{[key: number]: string}>({})
    
    const [error, setError] = useState<{ [key: number]: string | null}>({})

    const [isAuth, setIsAuth] = useState(false)
    console.log("PP", params)

    
    useEffect(() => {
        const token = localStorage.getItem("token")
        if(!token) {
            alert("ログインしてください")
            router.push("/")
            return
        } else {
            setIsAuth(true)
        }
    }, [router])

    const {products, loading, fetchProducts} = ReadProduct(params, isAuth)


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
            fetchProducts()
        } catch (err: unknown) {
            alert("カートに入れられません")
            if (err instanceof AxiosError) {
                const message = err.response?.data.error || "エラーが発生しました"
                setError((prev) => ({...prev, [product_id]: message}))
            }
        }
    }
    console.log("QQ",quantity)
    console.log("categ", products)

if(!isAuth) {
    return (
        <div className="flex justify-center items-center h-screen">Loading...</div>
    )
}

    return (
        <div className="warapper">
            <div className={`${styles.main}`}>
                <UserHeader />

                <div className={`${styles.title} mt-3`}>
                    <h3>商品一覧</h3>
                </div>
                <Search onSearch={setParams} />
                {loading && <p>読み込み中、、、</p>}
                <div className={`${styles.product} mt-8`}>
                    {products.map((product :Product) => (
                        <div key={product.id} className={`${styles.content}`}>
                            <div>
                                {product.categories?.length !== 0 ? (
                                    <p className={`${styles.category}`}>
                                        {product.categories?.map(category => category.name).join(", ")}
                                    </p>
                                ) : (
                                    <p></p>
                                )}
                                {/* <p className={`${styles.category}`}>
                                    {product.categories ? product.categories.map(category => category.name).join(", ") : null}
                                </p> */}
                                <div className="flex mt-3 justify-center">
                                    <div className="relative w-[100px] h-[90px]">
                                        <Image
                                            src={`${product.image_url}`}
                                            alt={product.name}
                                            fill
                                            sizes="100px"
                                            className="object-cover object-center rounded-sm"
                                            />
                                    </div>
                                    <div className="ml-6 content-center">
                                        <p className="font-bold">{product.name}：¥{product.price}</p>
                                        <p>在庫：{product.stock}個</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-center mt-3">{product.description}</p>
                                </div>
                            </div>
                            <form onSubmit={(e) => handleCart(e, product.id)}>
                                <input type="hidden" name="product_id" value={product.id} />
                                {
                                    product.stock > 0 ? (
                                        <label className={`${form.label} text-center font-bold mt-3`}>購入数：
                                            <input
                                                type="number"
                                                name="quantity"
                                                value={quantity[product.id] || ""}
                                                onChange={(e) => setQuantity({...quantity, [product.id]: e.target.value})}
                                                className={`${form.admin_input} w-[80px]`} />
                                        </label>
                                    ) : <p className="p-1 font-bold">※売り切れました</p>
                                }
                                <button
                                    disabled={product.stock <= 0}
                                    className={`${btn.submitBtn} mt-3 ml-26 mb-6`}
                                >カートに入れる
                                </button>
                                {error[product.id] && <p
                                    onClick={() => setError((prev) => ({...prev, [product.id]: null}))} 
                                    className="text-red-500">{error[product.id]}OK?</p>}
                            </form>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Products