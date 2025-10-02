import { Product } from "@/type/type"
import { categorizeProducts } from "@/utils/productFilter"

describe("categorizeProducts", () => {
    const makeProduct = (id: number, categories: string[]): Product => ({
        id,
        name: `Product ${id}`,
        categories: categories.map(name => ({id, name}))
    } as Product)

    it("特売と旬の両方含む場合は superlative に入る", () => {
        const products = [makeProduct(1, ["特売", "旬"])]
        const result = categorizeProducts(products)

        expect(result.superlative).toHaveLength(1)
        expect(result.special).toHaveLength(0)
        expect(result.seasonal).toHaveLength(0)
        expect(result.newproduct).toHaveLength(0)
    })

    it("特売だけの場合は special に入る", () => {
        const products = [makeProduct(2, ["特売"])]
        const result = categorizeProducts(products)

        expect(result.special).toHaveLength(1)
    })

    it("旬だけの場合は seasonal に入る", () => {
        const products = [makeProduct(3, ["旬"])]
        const result = categorizeProducts(products)
    
        expect(result.seasonal).toHaveLength(1)
    })

    it("もうすぐ発売だけの場合は newproduct に入る", () => {
        const products = [makeProduct(4, ["もうすぐ発売"])]
        const result = categorizeProducts(products)
    
        expect(result.newproduct).toHaveLength(1)
    })

    it("カテゴリに該当しない場合はどこにも入らない", () => {
        const products = [makeProduct(5, ["その他"])]
        const result = categorizeProducts(products)
    
        expect(result.superlative).toHaveLength(0)
        expect(result.special).toHaveLength(0)
        expect(result.seasonal).toHaveLength(0)
        expect(result.newproduct).toHaveLength(0)
    })
})