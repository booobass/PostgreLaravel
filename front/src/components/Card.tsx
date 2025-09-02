"use client"

import { Product } from "@/type/type"
import Image from "next/image"

const Card = ({items} :{items: Product[]}) => {
    const title = items[0]?.categories?.map((c) => c.name).join(", ") || ""
    return (
        <div>
            <h2>{title}</h2>
            {items.map((s: Product) => (
                <div key={s.id}>
                    <h3>{s.name}</h3>
                    <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${s.image}`}
                    height={100}
                    width={100}
                    alt={s.name}
                    priority
                    />
                    <p>{s.price}円</p>
                </div>
            ))}

        </div>
    )
}

export default Card