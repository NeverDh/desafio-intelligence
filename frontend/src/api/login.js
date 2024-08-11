import axiosInstance from '../core/axiosInstance';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const process = require('../env');

export const login = async (body) => {
  try{
      const response = await axiosInstance.post(`${process.env.URL}/auth/login`, body);
      if (response.status === 201){
        return response.data;
      }

    }catch(e){
      console.log(e)
     toast.error(e.response.data['message']);
    }
  return false;
}

