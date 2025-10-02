"use client"

import Card from "@/components/Card"
import { CustomerProduct } from "@/components/ReadProduct"
import { jose, zen } from "@/fonts/fonts"
import border from "@/styles/border.module.css"
import { Category, Product } from "@/type/type"
import Link from "next/link"
import './globals.css'

const Page = () => {

  const {customerProduct} = CustomerProduct()
  console.log("cp", customerProduct)

  // const specials = products.filter((p: Product) => (
  //   p.categories?.some((c: Category) => c.name === "特売"))
  // )

  // const seasonals = products.filter((p: Product) => (
  //   p.categories?.some((c: Category) => c.name === "旬"))
  // )

  // const newproducts = products.filter((p: Product) => (
  //   p.categories?.some((c: Category) => c.name === "もうすぐ発売"))
  // )

  const superlative: Product[] = []
  const special: Product[] = []
  const seasonal: Product[] = []
  const newproduct: Product[] = []

  customerProduct.forEach((p: Product) => {
    const categoryNames = p.categories?.map((c: Category) => c.name) || []

    if (categoryNames.includes("特売") && categoryNames.includes("旬")) {
      superlative.push(p)
    } else if (categoryNames.includes("特売")) {
      special.push(p)
    } else if (categoryNames.includes("旬")) {
      seasonal.push(p)
    } else if (categoryNames.includes("もうすぐ発売")) {
      newproduct.push(p)
    }
  })

  // console.log("Seasonal", seasonals)

  // console.log("Special", specials)
  return (
    <div className="warapper">
      <div className="w-[1000px] justify-items-center">
          <div>
            <h1 className={`${jose.className} ${border.solid_l} text-5xl font-extrabold`}>L&apos;orto della Nonna</h1>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <Card items={superlative} />
            <Card items={seasonal} />
            <Card items={special} />
            <Card items={newproduct} />
          </div>
        <footer className={`mt-16 w-[800px]`}>
          <div className={`${zen.className} ${border.solid_s} flex justify-evenly font-[500]`}>
            <p>自家栽培のお野菜をどうぞ</p>
            <Link href={"/users/login"}>ログイン</Link>
            <Link href={"/users/register"}>ユーザー登録</Link>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Page