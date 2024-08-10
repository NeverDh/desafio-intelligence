import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axiosInstance from '../core/axiosInstance';


const api = require('../api/login')

export default function useAuth(){
    const [authenticated, setAuthenticated] = useState(true);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect( () => {
        // const token = localStorage.getItem('token')
        // const user = localStorage.getItem('user')
        // if(token && token !== "undefined" && user !== "undefined" && user){
        //     axiosInstance.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
        //     setAuthenticated(true);
        // }
        setAuthenticated(true);
        setLoading(false);
    },[]);

    async function handleLogout(){
        try {
            setAuthenticated(false);
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            axiosInstance.defaults.headers.Authorization = undefined
            navigate("/")
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            
        }
    }

    async function handleLogin(body){
        try {
            setAuthenticated(true);
            navigate("/home")
        //     const response = await api.loginApi(body);
            
        //     const {accessToken, idUser} = response;
        //     axiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`
           
        //     localStorage.setItem('token', JSON.stringify(accessToken))
        //     const user = await api.findById(idUser);

        //     const treatedUser = utils.treatData(user)
        //     if (treatedUser && treatedUser != "undefined"){
        //         localStorage.setItem("user", JSON.stringify(treatedUser))
        //         setAuthenticated(true);
        //         navigate("/home")
        //     }
        //     else{
        //         toast.error("Problemas com o usuario! Contate o suporte.")
        //         throw new Error("Problemas com usuario! Contate o suporte.")
        //     }
            
        } catch (error) {
        //     console.error("Erro ao fazer login:", error);
            
        }
    }

    return {authenticated, loading, handleLogin, handleLogout}

}
