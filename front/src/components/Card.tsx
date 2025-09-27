"use client"

import { zen } from "@/fonts/fonts"
import category from "@/styles/category.module.css"
import { Product } from "@/type/type"
import Image from "next/image"

const Card = ({items} :{items: Product[]}) => {
    const title = items[0]?.categories?.map((c) => c.name).join(", ") || ""
    return (
        <div className={`${zen.className}`}>
            {title ? (
                <div className="mt-8">
                    <div className={`${category.main}`}>
                        <h2>{title}</h2>
                    </div>
                    {items.map((s: Product) => (
                        <div key={s.id}>
                            <div>
                                <Image
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${s.image}`}
                                height={100}
                                width={100}
                                alt={s.name}
                                priority
                                />
                                <div className="flex font-[700] text-xl">
                                    <h3>{s.name}：</h3>
                                    <p>¥{s.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            ) : (null)}

        </div>
    )
}

export default Card