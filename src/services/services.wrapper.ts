import { useAuthStore } from "@/stores/auth.store";
import { useToast } from "vue-toastification";
import type { JwtPayload } from 'jsonwebtoken';
import { setUserData } from "@/utils/user";

const base_url: string = import.meta.env.VITE_API_URL;;

export const services_wrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
};

function request(method: string) {
    return async (url: string, body: FormData | {} | string = {}) => {
        const requestOptions: any = {
            method,
            headers: await authHeader(`${base_url}${url}`)
        };
        if (typeof body === 'string') requestOptions.headers['Conversation-Token'] = body;
        if (body instanceof FormData) {
            if (method === 'POST') requestOptions.body = body;
        } else {
            requestOptions.headers['Content-Type'] = 'application/json';
            if (method === 'POST') requestOptions.body = JSON.stringify(body);
        }
        return fetch(`${base_url}${url}`, requestOptions).then(handleResponse);
    }
}

// helper functions

async function authHeader(url: string) {
    const authStore = useAuthStore();
    let { access_token, refresh_token } = authStore;

    const isLoggedIn = typeof access_token === 'string';
    const isApiUrl = url.startsWith(import.meta.env.VITE_API_URL);

    if (isLoggedIn && isApiUrl) {
        const tokenParts = access_token.split('.');

        try {
            const tokenPayload = JSON.parse(atob(tokenParts[1])) as JwtPayload;

            if (tokenPayload.exp && Date.now() >= tokenPayload.exp * 1000) {
                const response = await fetch(`${base_url}/v1/accounts/refresh-token/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ refresh_token })
                });

                if (response.ok) {
                    const data = await response.json();
                    access_token = data.response.access_token;
                    refresh_token = data.response.refresh_token;
                    setUserData(data.response.user);
                    localStorage.setItem('access_token', JSON.stringify(data.response.access_token));
                    localStorage.setItem('refresh_token', JSON.stringify(data.response.refresh_token));
                } else {
                    authStore.logout();
                    return {};
                }
            }

            return { Authorization: `Bearer ${access_token}` };
        } catch {
            return {};
        }
    }
    return {};
}
function handleResponse(response: any) {
    return response.text().then((text: any) => {
        const data = text && JSON.parse(text);
        console.log(data)
        if (data.status >= 400) {
            const toast = useToast();
            for (const key in data.errors) {
                toast.error(`${data.errors[key][0]}`, {
                    timeout: 5000
                });
                
            }
            const error = data.title;
            return Promise.reject(error);
        }

        return data;
    });
}