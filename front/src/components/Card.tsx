"use client"

import { zen } from "@/fonts/fonts"
import border from "@/styles/border.module.css"
import category from "@/styles/category.module.css"
import { Product } from "@/type/type"
import Image from "next/image"

const Card = ({items} :{items: Product[]}) => {
    const title = items[0]?.categories?.map((c) => c.name).join(", ") || ""
    return (
        <div className={`${zen.className}`}>
            {title ? (
                <div className={`${border.dashed_s} mt-8 pb-3`}>
                    <div className={`${category.main}`}>
                        <h2>{title}</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-4 ml-8">
                        {items.map((s: Product) => (
                            <div key={s.id}>
                                <div className="justify-items-center">
                                    <div className="relative w-[100px] h-[90px]">
                                        <Image
                                            // src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/images/${s.image}`}
                                            src={s.image_url}
                                            alt={s.name}
                                            priority
                                            fill
                                            sizes="100px"
                                            className="object-cover object-center rounded-sm"
                                        />
                                    </div>
                                    <div className="md:flex font-[700] text-xl">
                                        <h3>{s.name}：</h3>
                                        <p>¥{s.price}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            ) : (null)}

        </div>
    )
}

export default Card