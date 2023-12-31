import { useState } from 'react';
import { createContext } from 'react';

const AuthContext = createContext({
  userName: '',
  accessToken: '',
});

export default AuthContext;

export function AuthContextProvider({ children }) {
  const [auth, setAuth] = useState({
    userName: '',
    accessToken: '',
  });
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
