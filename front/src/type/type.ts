export type User = {
    id?: number;
    name?: string;
    email: string;
    password?: string;
    role?: string
}

export type Admin = {
    is_admin: boolean;
    role: "Boss" | "Editor" | null;
}

export type AdminUser = User & Admin;

export type AuthContextType = {
    user: AdminUser | null;
    token: string | null;
    loading: boolean;
    login: (user: AdminUser, token: string) => void;
    logout: () => void;
}

export type Category = {
    id: number;
    name: string;
}

export type Product = {
    id: number;
    name: string;
    description: string;
    image?: string;
    price: number;
    stock: number;
    categories?: Category[];
}

export type CartType = {
    id: number;
    user_id: number;
    procuct_id: number;
    quantity: number;
    product?: Product;
}