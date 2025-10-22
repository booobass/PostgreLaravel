"use client"

import LogoutButton from "@/components/LogoutButton"
import btn from "@/styles/button.module.css"
import Link from "next/link"
import { usePathname } from "next/navigation"

const AdminHeader = () => {

    const pathname = usePathname()

    const isProductPage = pathname.startsWith("/admin/products")
    const isCategoryPage = pathname.startsWith("/admin/categories")


    return (
        <header className="justify-items-center">
            <nav className={`${btn.linkBtn} flex gap-8`}>
                <Link
                    href={"/"}
                    className={`${pathname !== "/" ? "text-gray-400" : ""} p-2 hover:font-bold hover:text-[#666]`}>トップページ
                </Link>
                <Link
                    href={"/admin/users"}
                    className={`${pathname !== "/admin/users" ? "text-gray-400" : ""} p-2 hover:font-bold hover:text-[#666]`}>ユーザー管理
                </Link>
                <Link
                    href={"/admin/orders/show"}
                    className={`${pathname !== "/admin/orders/show" ? "text-gray-400" : ""} p-2 hover:font-bold hover:text-[#666]`}>注文管理
                </Link>
                <Link
                    href={"/admin/products/show"}
                    className={`${!isProductPage ? "text-gray-400" : ""} p-2 hover:font-bold hover:text-[#666]`}>商品管理
                </Link>
                <Link
                    href={"/admin/categories/show"}
                    className={`${!isCategoryPage ? "text-gray-400" : ""} p-2 hover:font-bold hover:text-[#666]`}>カテゴリー管理
                </Link>
                <div className="p-2 text-gray-400 hover:font-bold hover:text-gray-800">
                    <LogoutButton />
                </div>
            </nav>
            {isProductPage && (
                <nav className={`${btn.linkBtn} flex gap-6 mt-4`}>
                    <Link
                        href={"/admin/products/show"}
                        className={`${pathname !== "/admin/products/show" ? "text-gray-500" : ""} p-1 hover:font-bold hover:text-[#666]`}
                    >商品管理</Link>
                    <Link
                        href={"/admin/products/create"}
                        className={`${pathname !== "/admin/products/create" ? "text-gray-500" : ""} p-1 hover:font-bold hover:text-[#666]`}
                    >商品登録</Link>
                </nav>
            )}
            {isCategoryPage && (
                <nav className={`${btn.linkBtn} flex gap-6 mt-4`}>
                    <Link
                        href={"/admin/categories/show"}
                        className={`${pathname !== "/admin/categories/show" ? "text-gray-500" : ""} p-1 hover:font-bold hover:text-[#666]`}
                    >カテゴリー管理</Link>
                    <Link
                        href={"/admin/categories/create"}
                        className={`${pathname !== "/admin/categories/create" ? "text-gray-500" : ""} p-1 hover:font-bold hover:text-[#666]`}
                    >カテゴリー作成</Link>
                </nav>
            )}
        </header>
    )
}

export default AdminHeader