export type User = {
    id?: number;
    name?: string;
    email: string;
    password: string;
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