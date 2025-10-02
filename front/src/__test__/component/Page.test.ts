import { render, screen } from "@testing-library/react"
import Page from "../../app/page"

jest.mock("@/components/ReadProduct", () => ({
    CustomerProduct: () => ({
            customerProduct: [
                {
                    id: 1,
                    name: "にんじん",
                    price: 80,
                    image: "http://localhost/carrot.jpg",
                    categories: [{id: 1, name: "旬"}]
                }
            ]
    })
}))

describe("Page コンポーネント", () => {
    it("タイトルが表示される", async () => {
        const PageComponent = await Page()
        render(PageComponent)
        expect(
            screen.getByRole("heading", {name: /L'orto della Nonna/i })
        ).toBeInTheDocument()
    })

    it("ログインとユーザー登録リンクがある", async () => {
        const PageComponent = await Page()
        render(PageComponent)
        expect(screen.getByRole("link", { name: "ログイン" })).toBeInTheDocument()
        expect(screen.getByRole("link", { name: "ユーザー登録" })).toBeInTheDocument()
    })

    it("旬の商品が Card に渡されて表示される", async () => {
        const PageComponent = await Page()
        render(PageComponent)
        expect(screen.getByText((content) => content.startsWith("にんじん"))).toBeInTheDocument()
    })
})