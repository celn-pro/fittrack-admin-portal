import { currentUserVar } from '../apollo/client';

export const login = (token: string, user: { id: string; name: string; email: string; fitnessGoal?: string; isProfileComplete: boolean }) => {
  localStorage.setItem('authToken', token);
  currentUserVar(user);
};

export const logout = () => {
  localStorage.removeItem('authToken');
  currentUserVar(null);
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('authToken') && !!currentUserVar();
};