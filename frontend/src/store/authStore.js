import {create, } from "zustand";
import axios from "axios"
import dotenv from 'dotenv'

const API_URL = import.meta.env.VITE_API_URL;

//axios will put cookies in the request by default
axios.defaults.withCredentials = true

export const useAuthStore = create((set)=> ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    message: null,

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
    login : async (email, password) => {
        set({ isLoading: true, error: null});
        try {
            const response = await axios.post(`${API_URL}/login`,{email, password});
            set({
                isAuthenticated: true,
                user: response.data.user,
                error: null,
                isLoading: false
            });
        } catch (error) {
            set({ error: error.response?.data?.messsage || "Error logging in", isLoading: false});
        }
    },
    checkAuth: async () => {
        try {
            const response = await axios.get(`${API_URL}/check-auth`);
            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth : false,})
        } catch (error) {
            set({error: null, isCheckingAuth: false, isAuthenticated: false });
        }
    },
    
    logout: async () => {
        set({ isLoading: true, error: null})
        try {
            const response = await axios.post(`${API_URL}/logout`);
            set({ user: null, isAuthenticated: false, error: null, isLoading: false});
        } catch (error) {
            set({ error: "Error logging out", isLoading: false});
            throw error;
        }

    },

    forgotPassword: async (email) => {
        set({isLoading: true, error: null});
        try {
            const response = await axios.post(`${API_URL}/forgot-password`, {email});
            set({message: response.data.message, isLoading: false})
        } catch (error) {
            set({
                isLoading: false,
            })
        }
    },
    resetPassword: async(token, password) => {
        set({isLoading: true, error: null, })
        try {
            const response = axios.post(`${API_URL}/reset-password/${token}`, {password})
            set({ message: (await response).data.message, isLoading: false })
        } catch (error) {
            set({
                isLoading: false,
                error: error.response.data.message || "Error resetting password",
            });
            throw error
        }
    }   
}))