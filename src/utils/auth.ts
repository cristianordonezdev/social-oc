import { useAuthStore } from "@/stores/auth.store";

export const isAuthenticated = (): boolean => {
    const auth: any = useAuthStore()
    return Object.keys(auth.user).length > 0 
}