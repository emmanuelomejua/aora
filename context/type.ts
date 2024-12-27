export type AuthState = {
    loggedIn: boolean;
    user: any; 
    loading: boolean;
  };


export type AuthAction =
| { type: 'SET_LOGGED_IN'; payload: boolean }
| { type: 'SET_USER'; payload: any }
| { type: 'SET_LOADING'; payload: boolean };
