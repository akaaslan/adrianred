import {
  SET_USER,
  LOGOUT_USER,
  SET_ROLES,
  SET_THEME,
  SET_LANGUAGE
} from '../actionTypes';

// Action Creators - Client
export const setUser = (user: any) => ({
  type: SET_USER,
  payload: user
});

export const logoutUser = () => ({
  type: LOGOUT_USER
});

export const setRoles = (roles: any[]) => ({
  type: SET_ROLES,
  payload: roles
});

export const setTheme = (theme: string) => ({
  type: SET_THEME,
  payload: theme
});

export const setLanguage = (language: string) => ({
  type: SET_LANGUAGE,
  payload: language
});
