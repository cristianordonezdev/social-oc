import CryptoJS from 'crypto-js'

const secret_key = import.meta.env.VITE_SECRET_KEY_CRYPTO;

export const getUserData = (): any => {

    const encrypted_data = localStorage.getItem('user');
    if (encrypted_data) {
        const bytes = CryptoJS.AES.decrypt(encrypted_data, secret_key);
        const decrypted_data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decrypted_data;
    }
    return {};
}

export const setUserData = (data: any): void => {
    const data_string = JSON.stringify(data);
    const encrypted_data = CryptoJS.AES.encrypt(data_string, secret_key).toString();
    localStorage.setItem('user', encrypted_data);
}

export const decodeJWT = () => {
    const token = localStorage.getItem('access_token') ?? "";
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/'); // Corregir el base64
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    return JSON.parse(jsonPayload)["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
  };