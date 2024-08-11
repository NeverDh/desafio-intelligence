import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../core/axiosInstance';
import Cookies from 'js-cookie';

const api = require('../api/login');

export default function useAuth() {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('token');
        if (token && token !== "undefined") {
            axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
            setAuthenticated(true);
        }
        setLoading(false);
    }, []);

    async function handleLogout() {
        try {
            setAuthenticated(false);
            Cookies.remove('token'); 
            axiosInstance.defaults.headers.Authorization = undefined;
            navigate("/");
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        }
    }

    async function handleLogin(body) {
        try {
            const response = await api.login(body);
            const { token } = response;
            axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
            Cookies.set('token', token); 
            setAuthenticated(true);
            navigate('/home'); // Redireciona para a página principal após o login
        } catch (error) {
            console.error("Erro ao fazer login:", error);
        }
    }

    return { authenticated, loading, handleLogin, handleLogout };
}
