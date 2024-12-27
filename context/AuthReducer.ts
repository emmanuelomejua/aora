import { AuthState, AuthAction } from './type';


const AuthReducer = (state: AuthState, action: AuthAction) => {
    switch (action.type) {
        case 'SET_LOGGED_IN':
            return{
                ...state, loggedIn: action.payload
            }
        case 'SET_USER':
            return{
                ...state, user: action.payload
            }
        case 'SET_LOADING':
            return{
                ...state, loading: action.payload 
            }
        default:
            throw new Error(`Unhandled action type: ${action}`);
    }
}

export default AuthReducer;
