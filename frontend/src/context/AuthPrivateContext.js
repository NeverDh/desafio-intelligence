import React, { createContext } from 'react';
import useAuth from '../hooks/useAuth';

const context = createContext();


function AuthPrivateProvider({children}){

    const{authenticated, handleLogin, loading, handleLogout} = useAuth();


    return (
        <context.Provider value={{authenticated, handleLogin, loading, handleLogout}}>
            {children}
        </context.Provider>
    )

}

export { context, AuthPrivateProvider}