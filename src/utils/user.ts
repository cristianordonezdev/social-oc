import CryptoJS from 'crypto-js'

const secret_key = import.meta.env.VITE_SECRET_KEY_CRYPTO;

export const getUserData = (): any => {

    const encrypted_data = localStorage.getItem('user');
    console.log(encrypted_data, 'clo se')
    if (encrypted_data) {
        console.log('apoco entre aca')
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