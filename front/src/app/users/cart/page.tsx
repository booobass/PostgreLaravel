"use client"

import { ReadCart } from "@/components/ReadCart";
import api from "@/lib/axios";
import { CartType } from "@/type/type";
import Image from "next/image";
import Link from "next/link";

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
        <div>
            <h3>カート内容</h3>
            {carts.map((cart :CartType) => (
                <div key={cart.id}>
                    <h3>{cart.product?.name}</h3>
                    <Image
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${cart.product?.image}`}
                        height={100}
                        width={100}
                        alt={cart.product?.name || ""}
                        priority
                    />
                    <p>{cart.quantity}個</p>
                    <button onClick={() => handleDelete(cart.id)}>カートから削除</button>
                </div>
            ))}
            <Link href={"../users/order/show"}>注文画面に進む</Link>
            <Link href={"../users/products"}>戻る</Link>
        </div>
    )
}

export default Cart