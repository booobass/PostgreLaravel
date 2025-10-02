import { Category, Product } from "@/type/type";

export const categorizeProducts = (products: Product[]) => {

    const superlative: Product[] = []
    const special: Product[] = []
    const seasonal: Product[] = []
    const newproduct: Product[] = []

    products.forEach((p: Product) => {
        
        const categoryNames = p.categories?.map((c: Category) => c.name) || []

        if(categoryNames.includes("特売") && categoryNames.includes("旬")) {
            superlative.push(p)
        } else if (categoryNames.includes("特売")) {
            special.push(p);
        } else if (categoryNames.includes("旬")) {
            seasonal.push(p)
        } else if (categoryNames.includes("もうすぐ発売")) {
            newproduct.push(p)
        }
    })

    return {superlative, special, seasonal, newproduct}
}