import { defineStore } from 'pinia';
import router from '@/router';
import { services_wrapper } from '../services/services.wrapper';
import type { ILogin } from '@/interfaces/login';
import { useToast } from "vue-toastification";
import { setUserData, getUserData } from '@/utils/user';

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        access_token: JSON.parse(localStorage.getItem('access_token') || '{}'),
        refresh_token: JSON.parse(localStorage.getItem('refresh_token') || '{}'),
        user: getUserData(),
        returnUrl: null,
    }),
    actions: {
        async login(data: ILogin) {
            const user = await services_wrapper.post(`/auth/login/`, data);
            // update pinia state

            this.user = user;
            this.access_token = user.token;
            // store user details and jwt in local storage to keep user logged in between page refreshes
            setUserData(user.nameUser);
            localStorage.setItem('access_token', JSON.stringify(user.token));
            localStorage.setItem('refresh_token', JSON.stringify(user.refreshToken));
            // redirect to previous url or default to home pagee

            const toast = useToast();
            toast.info(`Bienvenido ${user.nameUser}`, {
                timeout: 5000
            });

            router.push(this.returnUrl || '/');
        },
        logout() {
            this.user = {};
            localStorage.removeItem('user');
            localStorage.clear();
            router.push('/login');
        }
    }
});
