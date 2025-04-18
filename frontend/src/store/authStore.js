import {create} from "zustand";
import axios from "axios"

const API_URL = "http://localhost:3000/api/auth";

//axios will put cookies in the request by default
axios.defaults.withCredentials = true

export const useAuthStore = create((set)=> ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,

    signup: async(email, password, name) => {
        set(({isLoading: true, error: null}));
        try {
            console.log("hello");
            
            const response = await axios.post(`${API_URL}/signup`, {email,password,name});
            console.log("Signup API response:", response);
            set({user: response.data.user,isAuthenticated: true, isLoading: false});
        }catch(error){
            set({error: error.response.data.message || "Error signing up", isLoading: false});
            throw error;
        }
    },
    verifyEmail: async (verificationCode) => {
        try {
            const code = verificationCode
            const response = await axios.post(`${API_URL}/verify-email`, {code});
            set({ user: response.data.user, isAuthenticated: true, isLoading: false});
            return response.data;
        } catch (error) {
            set({ error: error.response.data.message || "Error verifying email", isLoading: false});
            throw error;
        }        
    },

    checkAuth: async () => {
        try {
            const response = await axios.get(`${API_URL}/check-auth`);
            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth : false,})
        } catch (error) {
            set({error: null, isCheckingAuth: false, isAuthenticated: false });
        }
    }
    
}))