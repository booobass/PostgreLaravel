"use client"

import styles from "@/styles/user_product.module.css"
import { notFound, useSearchParams } from "next/navigation"
import UserHeader from "../../header"

type Props = {
    name: string;
    price: number;
    quantity: number;  
}

const ThanksUser = () => {

    const params = useSearchParams()
    const data = params.get("data")

    if(!data) {
        notFound()
    }

    const thanksData = JSON.parse(data)

    console.log(thanksData)

    return (
        <div className="warapper">
            <div className={`${styles.main}`}>
                <UserHeader />
                <div className={`${styles.title} mt-4`}>
                    <h4>注文完了</h4>
                </div>
                <div className="mt-8 font-bold">
                    <p>ご購入ありがとうございました</p>
                </div>
                <div className="mt-6">
                    <div className={`${styles.border_s} w-[180px]`}>
                        <h3 className={`font-bold`}>購入内容</h3>
                    </div>
                    <div className={`${styles.border} mt-5 text-right`}>
                        {thanksData.products.map((p: Props, i: number) => (
                            <div key={i}>
                                {i === 0 ? (
                                    <p><span className="font-bold">商品</span>：{p.name}（¥{p.price}）：{p.quantity}個</p>
                                ) : (
                                    <p>{p.name}（¥{p.price}）：{p.quantity}個</p>
                                )}
                            </div>
                        ))}
                        <div>
                            <p className="mt-3"><span className="font-bold">合計</span>（税込）：¥{thanksData.total}</p>
                        </div>
                        <div className="mt-1">
                            <p><span className="font-bold">お支払い方法</span>：{thanksData.payment === "cash" ? "現金" : "クレジット"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default ThanksUser