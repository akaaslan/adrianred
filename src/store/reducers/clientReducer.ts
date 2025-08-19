import {
  SET_USER,
  LOGOUT_USER,
  SET_ROLES,
  SET_THEME,
  SET_LANGUAGE
} from '../actionTypes';

const initialState = {
  user: {},
  addressList: [],
  creditCards: [],
  roles: [],
  theme: 'light',
  language: 'en'
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
  switch (action.type) {
    case SET_USER:
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
    
    default:
      return state;
  }
};

export default clientReducer;
