import { createContext, useContext } from 'react';

const defaultValue = null;

export const AuthContext = createContext(defaultValue);
AuthContext.displayName = 'Authentication';

export const useAuthContext = () => useContext(AuthContext);
