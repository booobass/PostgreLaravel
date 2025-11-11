import { AuthProvider } from "@/context/AuthContext"
import { render, screen } from "@testing-library/react"
import { useRouter } from "next/navigation"
import Page from "../../app/page"

process.env.NEXT_PUBLIC_BACKEND_URL = "http://localhost:8000"

const renderWithAuth = (ui: React.ReactNode) => {
  return render(<AuthProvider>{ui}</AuthProvider>)
}

jest.mock("@/components/ReadProduct", () => ({
    CustomerProduct: () => ({
            customerProduct: [
                {
                    id: 1,
                    name: "にんじん",
                    price: 80,
                    image: "http://localhost:8000/carrot.jpg",
                    categories: [{id: 1, name: "旬"}]
                }
            ]
    })
}))

jest.mock("next/navigation", () => ({
    useRouter: jest.fn()
}))

describe("Page コンポーネント", () => {
    const mockPush = jest.fn()

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({push: mockPush})
    })

    afterEach(() => {
        jest.restoreAllMocks()
    })

    test("タイトルが表示される", () => {
        renderWithAuth(<Page />)
        expect(
            screen.getByRole("heading", {name: /L'orto della Nonna/i })
        ).toBeInTheDocument()
    })

    test("ログインとユーザー登録リンクがある", () => {
        renderWithAuth(<Page />)
        expect(screen.getByRole("link", { name: "ログイン" })).toBeInTheDocument()
        expect(screen.getByRole("link", { name: "ユーザー登録" })).toBeInTheDocument()
    })

    test("旬の商品が Card に渡されて表示される", () => {
        renderWithAuth(<Page />)
        expect(screen.getByText((content) => content.startsWith("にんじん"))).toBeInTheDocument()
    })
})