import {
  SET_USER,
  LOGOUT_USER,
  SET_ROLES,
  SET_THEME,
  SET_LANGUAGE,
  SET_LOGIN_LOADING,
  SET_LOGIN_ERROR
} from '../actionTypes';

const initialState = {
  user: {},
  addressList: [],
  creditCards: [],
  roles: [],
  theme: 'light',
  language: 'en',
  loginLoading: false,
  loginError: null as string | null
};

interface Action {
  type: string;
  payload?: 
    | typeof initialState.user
    | typeof initialState.roles
    | typeof initialState.theme
    | typeof initialState.language
    | undefined;
}

const clientReducer = (state = initialState, action: Action) => {
  console.log('ClientReducer - Action type:', action.type);
  console.log('ClientReducer - Action payload:', action.payload);
  
  switch (action.type) {
    case SET_USER:
      console.log('ClientReducer - Setting user:', action.payload);
      return {
        ...state,
        user: action.payload
      };
    
    case LOGOUT_USER:
      return {
        ...state,
        user: {},
        addressList: [],
        creditCards: []
      };
    
    case SET_ROLES:
      return {
        ...state,
        roles: action.payload
      };
    
    case SET_THEME:
      return {
        ...state,
        theme: action.payload
      };
    
    case SET_LANGUAGE:
      return {
        ...state,
        language: action.payload
      };
    
    case SET_LOGIN_LOADING:
      return {
        ...state,
        loginLoading: action.payload
      };
    
    case SET_LOGIN_ERROR:
      return {
        ...state,
        loginError: action.payload
      };
    
    default:
      return state;
  }
};

export default clientReducer;
