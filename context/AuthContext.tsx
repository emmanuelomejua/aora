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
  

  export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
};

const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)


    return(
        <AuthContext.Provider value={{state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
