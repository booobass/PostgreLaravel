// __tests__/Products.test.tsx
import Products from "@/app/users/products/page"
import { AuthProvider } from "@/context/AuthContext"
import api from "@/lib/axios"
import { Product } from "@/type/type"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { AxiosResponse } from "axios"



const renderWithAuth = (ui: React.ReactNode) => {
  return render(<AuthProvider>{ui}</AuthProvider>)
}

const mockReadProduct = jest.fn()
jest.mock("@/components/ReadProduct", () => ({
  ReadProduct: () => mockReadProduct()
}))

// axios をモック
jest.mock("@/lib/axios")
const mockedApi = api as jest.Mocked<typeof api>

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn()
  })
}))

describe("Products コンポーネント", () => {
  const user = userEvent.setup()

  beforeEach(() => {
    // デフォルトのモック値（通常商品）
    mockReadProduct.mockReturnValue({
      products: [
        { 
          id: 1, 
          name: "テスト商品", 
          price: 1000, 
          description: "テスト",
          stock: 5, 
          image: "http://img.png", 
          pivot: { order_id: 1, product_id: 1, quantity: 3, price: 120 },
          categories: [] 
        }
      ] as Product[],
      loading: false,
      fetchProducts: jest.fn(),
    })
  })


  test("商品が一覧に表示される", () => {
    renderWithAuth(<Products />)
    expect(screen.getByText("テスト商品：¥1000")).toBeInTheDocument()
  })

  test("カート追加ボタンを押すと API が呼ばれる", async () => {
    mockedApi.post.mockResolvedValue({ data: {} } as AxiosResponse)
    renderWithAuth(<Products />)

    const button = screen.getByText("カートに入れる")
    await user.click(button)

    expect(mockedApi.post).toHaveBeenCalledWith(
      "/api/cart/store",
      { product_id: 1, quantity: NaN }, // quantity は初期値 "" を Number() で変換するため NaN になる
      expect.any(Object)
    )
  })
 

test("在庫が0の場合は売り切れ表示になる", () => {
  // このテストだけモックを売り切れ商品に上書き
  mockReadProduct.mockReturnValue({
    products: [
      {
        id: 2,
        name: "売り切れ商品",
        price: 500,
        description: "売り切れ",
        stock: 0,
        image: "http://img2.png",
        pivot: { order_id: 1, product_id: 2, quantity: 1, price: 500 },
        categories: []
      }
    ],
    loading: false,
    fetchProducts: jest.fn(),
  })

    renderWithAuth(<Products />)
    expect(screen.getByText("※売り切れました")).toBeInTheDocument()
  })
})