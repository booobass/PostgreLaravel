"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const AdminHeader = () => {

    const pathname = usePathname()

    const isProductPage = pathname.startsWith("/admin/products")
    const isCategoryPage = pathname.startsWith("/admin/categories")


    return (
        <header className="justify-items-center">
            <nav className="flex gap-8">
                <Link
                    href={"/admin/users"}
                    className={`${pathname === "/admin/users" ? "bg-gray-300" : ""} p-2`}>ユーザー
                </Link>
                <Link
                    href={"/admin/orders/show"}
                    className={`${pathname === "/admin/orders/show" ? "bg-gray-300" : ""} p-2`}>オーダー
                </Link>
                <Link
                    href={"/admin/products/show"}
                    className={`${isProductPage ? "bg-gray-300" : ""} p-2`}>プロダクト
                </Link>
                <Link
                    href={"/admin/categories/show"}
                    className={`${isCategoryPage ? "bg-gray-300" : ""} p-2`}>カテゴリ
                </Link>
            </nav>
            {isProductPage && (
                <nav className="flex gap-6">
                    <Link
                        href={"/admin/products/show"}
                        className={`${pathname === "/admin/products/show" ? "bg-gray-200" : ""} p-1`}
                    >一覧</Link>
                    <Link
                        href={"/admin/products/create"}
                        className={`${pathname === "/admin/products/create" ? "bg-gray-200" : ""} p-1`}
                    >作成</Link>
                </nav>
            )}
            {isCategoryPage && (
                <nav className="flex gap-6">
                    <Link
                        href={"/admin/categories/show"}
                        className={`${pathname === "/admin/categories/show" ? "bg-gray-200" : ""} p-1`}
                    >一覧</Link>
                    <Link
                        href={"/admin/categories/create"}
                        className={`${pathname === "/admin/categories/create" ? "bg-gray-200" : ""} p-1`}
                    >作成</Link>
                </nav>
            )}
        </header>
    )
}

export default AdminHeader