import { createContext, Dispatch, ReactNode, useContext, useEffect, useReducer } from "react";
import AuthReducer from './AuthReducer'
import { AuthAction, AuthState } from "./type";
import { getCurrentUser } from "@/lib/appwrite";

const INITIAL_STATE = {
    user: {},
    loading: false,
    loggedIn: false
}

const AuthContext = createContext<{
    state: AuthState;
    dispatch: Dispatch<AuthAction>;
} | undefined>(undefined);
  

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
};



const AuthProvider = ({ children }: { children: ReactNode }) => {
    
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)
    
    useEffect(() => {
       const fatchUser = async () => {
        dispatch({type: 'SET_LOADING', payload: true});
        try {
            const user = getCurrentUser();
            if(user){
                dispatch({ type: 'SET_USER', payload: user });
                dispatch({ type: 'SET_LOGGED_IN', payload: true });
            } else {
                dispatch({ type: 'SET_USER', payload: {} });
                dispatch({ type: 'SET_LOGGED_IN', payload: false });
            }
        } catch (error) {
            console.error('Failed to fetch user:', error);
        } finally {
            dispatch({type: 'SET_LOADING', payload: false})
        }
        }
        fatchUser();
    }, [])

    return(
        <AuthContext.Provider value={{state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
