import { createContext, Dispatch, ReactNode, useContext, useEffect, useReducer } from "react";
import AuthReducer from './AuthReducer'
import { AuthAction, AuthState } from "./type";

const INITIAL_STATE = {
    user: {},
    loading: false,
    loggedIn: false
}

const AuthContext = createContext<{
    state: AuthState;
    dispatch: Dispatch<AuthAction>;
  } | undefined>(undefined);

export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(state.user))
    })

    return(
        <AuthContext.Provider value={{state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
