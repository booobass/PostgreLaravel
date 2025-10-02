import Search from "@/components/Search"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

jest.mock("@/components/ReadCategory", () => ({
    ReadCategory: () => ({
        categories: [
            {id: 1, name: "カテゴリー１"},
            {id: 2, name: "カテゴリー２"}
        ]
    })
}))

describe("Product Search", () => {

    let keywordInput: HTMLInputElement
    let categorySelect: HTMLSelectElement
    let sortSelect: HTMLSelectElement
    let mockOnSearch: jest.Mock

    beforeEach(() => {
        mockOnSearch = jest.fn()
        render(<Search onSearch={mockOnSearch} />)
        keywordInput = screen.getByLabelText("商品検索：")
        categorySelect = screen.getByLabelText("カテゴリー検索：")
        sortSelect = screen.getByLabelText("価格と在庫検索：")
    })
    

    test("Searchコンポーネントがレンタリングされる", () => {

        expect(keywordInput).toBeInTheDocument()
        expect(categorySelect).toBeInTheDocument()
        expect(sortSelect).toBeInTheDocument()
        expect(screen.getByRole("button", {name: "検索"})).toBeInTheDocument()
    })

    test("入力、セレクト変更ができる", async () => {
        await userEvent.type(keywordInput, "テスト商品")
        expect(keywordInput).toHaveValue("テスト商品")

        await userEvent.selectOptions(categorySelect, "1")
        expect(categorySelect).toHaveValue("1")

        await userEvent.selectOptions(sortSelect, "price_asc")
        expect(sortSelect).toHaveValue("price_asc")
    })

    test("検索ボタンを押すとonSearchが呼ばれる", async () => {

        await userEvent.type(keywordInput, "テスト")
        await userEvent.selectOptions(categorySelect, "2")
        await userEvent.selectOptions(sortSelect, "stock_desc")

        const button = screen.getByRole("button", {name: "検索"})
        await userEvent.click(button)

        expect(mockOnSearch).toHaveBeenCalledWith({
            keyword: "テスト",
            category_id: "2",
            sort: "stock_desc"
        })
    })
})