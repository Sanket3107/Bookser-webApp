import axios from 'axios';

interface User{
    email: string;
    password: string;
}
const endPoint = `${import.meta.env.VITE_API_URL}/auth`;
export const registerUser = (user : User) => axios.post(`${endPoint}/register`, user);