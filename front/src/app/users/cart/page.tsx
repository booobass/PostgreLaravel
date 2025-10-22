"use client"

import { ReadCart } from "@/components/ReadCart";
import api from "@/lib/axios";
import btn from "@/styles/button.module.css";
import styles from "@/styles/user_product.module.css";
import { CartType } from "@/type/type";
import Image from "next/image";
import Link from "next/link";
import UserHeader from "../header";

const Cart = () => {

    // const [carts, setCarts] = useState([]);

    // const fetchCart = async () => {
    //     try {
    //         const response = await api.get("/api/cart",
    //             {
    //                 headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    //             }
    //         )
    //         setCarts(response.data.carts)
    //         console.log(response.data.carts)

    //     } catch {
    //         alert("カート取得出来ません")
    //     }
    // }

    // useEffect(() => {
    //     fetchCart()
    // }, [])

    const { carts, fetchCart} = ReadCart();

    const handleDelete = async (id: number) => {
        try {
            await api.delete(`/api/cart/${id}`,
                {
                    headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
                }
            )
            alert("カートから削除しました")
            fetchCart()
        } catch {
            alert("削除出来ません")
        }
    }


    return (
        <div className="warapper">
            <div className={`${styles.main}`}>
                <UserHeader />
                <div className={`${styles.title} mt-4`}>
                    <h3>カート内容</h3>
                </div>
                    <div className={`${btn.userLink} mt-8 w-[280px]`}>
                    <Link
                        href={"../users/order/show"}
                        className={`${carts.length === 0 ? "pointer-events-none" : ""} hover:font-bold`}
                    >
                        注文画面に進む
                    </Link>
                    <Link href={"../users/products"} className="hover:font-bold">戻る</Link>
                </div>

                {carts.length !== 0 ? (
                    <div className={`${styles.product} mt-8`}>
                        {carts.map((cart :CartType) => (
                            <div key={cart.id} className={`${styles.content}`}>
                                <div className="flex justify-center mt-3">
                                    <div className="relative w-[100px] h-[90px]">
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${cart.product?.image}`}
                                            alt={cart.product?.name || ""}
                                            priority
                                            fill
                                            sizes="100px"
                                            className="object-cover object-center rounded-sm"
                                            />
                                    </div>
                                    <div className="content-center ml-6">
                                        <p className="font-bold">{cart.product?.name}</p>
                                        <p>¥{cart.product?.price}：{cart.quantity}個</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDelete(cart.id)}
                                    className={`${btn.submitBtn} mt-6 ml-26 mb-6`}
                                >カートから削除
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="mt-8 font-bold">カートは空です</p>
                )}
            </div>
        </div>
    )
}

export default Cart