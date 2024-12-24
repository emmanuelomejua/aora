import React, { Children, createContext, useContext, useEffect, useState } from "react";


const INITIAL_STATE = {
    user: null,
    loading: false,
    loggedIn: false
}

const AuthContext = createContext(INITIAL_STATE);

export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {

    }, [])

    return(
        <AuthContext.Provider value={{
            loggedIn,
            user,
            loading,
        }}>
            {children}
        </AuthContext.Provider>
    )
}
