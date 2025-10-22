"use client"

import LogoutButton from "@/components/LogoutButton"
import { jose } from "@/fonts/fonts"
import border from "@/styles/border.module.css"
import btn from "@/styles/button.module.css"
import Link from "next/link"

const UserHeader = () => {

    return (
        <header className="flex flex-col items-center">
            <div>
                <Link href={"/"}>
                    <h1 className={`${jose.className} ${border.solid_l} text-5xl font-extrabold max-sm:text-4xl max-sm:font-bold`}>L&apos;orto della Nonna</h1>
                </Link>
            </div>
            <nav className={`${btn.userLink} w-[360px] mt-4`}>
                <Link href={"/users/products"} className="hover:font-bold">商品一覧</Link>
                <Link href={"/users/cart"} className="hover:font-bold">カート内容</Link>
                <Link href={"/users/order/history"} className="hover:font-bold">購入履歴</Link>
                <div className="hover:font-bold">
                    <LogoutButton />
                </div>
            </nav>
        </header>
    )
}

export default UserHeader