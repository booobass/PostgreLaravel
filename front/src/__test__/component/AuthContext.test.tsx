import { AuthProvider, useAuth } from "@/context/AuthContext"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

const localStorageMock = (() => {
    let store: Record<string, string> = {}

    return {
        getItem: jest.fn((key) => store[key] || null),
        setItem: jest.fn((key, value) => {store[key] = value.toString()}),
        removeItem: jest.fn((key) => {delete store[key]}),
        clear: jest.fn(() => {store = {}})
    }
})()
Object.defineProperty(window, "localStorage", {value: localStorageMock})

const TestComponent = () => {
    const {user, token, loading, login, logout} = useAuth()

    return (
        <div>
            <p data-testid="user">{user ? user.name : "null"}</p>
            <p data-testid="token">{token || "null"}</p>
            <p data-testid="loading">{loading.toString()}</p>
            <button onClick={() => login({id: 1, name: "Admin", email: "jest@example.com",is_admin: true, role: "Boss"}, "abc123")}>Login</button>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

describe("AuthProvider", () => {
    beforeEach(() => {
        jest.clearAllMocks()
        localStorageMock.clear()
    })

    test("初期状態でuser/tokenはnull, loadingはfalse", async () => {
        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        )

        expect(await screen.findByTestId("user")).toHaveTextContent("null")
        expect(screen.getByTestId("token")).toHaveTextContent("null")
        expect(screen.getByTestId("loading")).toHaveTextContent("false")
    })

    test("loginでuser/tokenがセット, localStorageに保存", async () => {
        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        )
        const user = userEvent.setup()

        await user.click(screen.getByText("Login"))

        expect(screen.getByTestId("user")).toHaveTextContent("Admin")
        expect(screen.getByTestId("token")).toHaveTextContent("abc123")
        expect(localStorage.setItem).toHaveBeenCalledWith("user", JSON.stringify({id: 1, name: "Admin", email: "jest@example.com",is_admin: true, role: "Boss"}))
        expect(localStorage.setItem).toHaveBeenCalledWith("token", "abc123")
    })

    test("logoutでuser/tokenがリセット, localStorageから削除", async () => {
        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        )
        const user = userEvent.setup()

        await user.click(screen.getByText("Login"))
        await user.click(screen.getByText("Logout"))

        expect(screen.getByTestId("user")).toHaveTextContent("null")
        expect(screen.getByTestId("token")).toHaveTextContent("null")
        expect(localStorage.removeItem).toHaveBeenCalledWith("user")
        expect(localStorage.removeItem).toHaveBeenCalledWith("token")
    })
})