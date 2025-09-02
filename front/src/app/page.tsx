"use client"

import Card from "@/components/Card"
import { ReadProduct } from "@/components/ReadProduct"
import { jose } from "@/fonts/fonts"
import { Category, Product } from "@/type/type"
import Link from "next/link"

const Page = () => {
  const {products} = ReadProduct()
  console.log(products)

  const specials = products.filter((p: Product) => (
    p.categories?.some((c: Category) => c.name === "特売"))
  )

  const seasonals = products.filter((p: Product) => (
    p.categories?.some((c: Category) => c.name === "旬"))
  )

  const newproducts = products.filter((p: Product) => (
    p.categories?.some((c: Category) => c.name === "もうすぐ発売"))
  )

  const superlative: Product[] = []
  const special: Product[] = []
  const seasonal: Product[] = []
  const newproduct: Product[] = []

  products.forEach((p: Product) => {
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

  console.log("Seasonal", seasonals)

  console.log("Special", specials)
  return (
    <div>
      <h1 className={`${jose.className} text-5xl font-extrabold`}>L&apos;orto della Nonna</h1>
        <Card items={superlative} />
        <Card items={seasonal} />
        <Card items={special} />
        <Card items={newproducts} />
      <footer className="display: flex">
        <p className="bg-[#eebbcd]">
          お時間ありましたら<br />
          ごゆっくりどうぞ
        </p>
        <div className="bg-[#e8d3d1]">
          <Link href={"./users/login"}>ログイン</Link>
        </div>
        <div className="bg-[#a8bf93]">
          <Link href={"./users/register"}>ユーザー登録</Link>
        </div>
      </footer>
    </div>
  )
}

export default Page