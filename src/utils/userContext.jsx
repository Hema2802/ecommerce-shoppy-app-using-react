// Importing required hooks from React
import { createContext, useState } from 'react';

// Creating a context object to share user authentication state
export const UserContext = createContext();

// Provider component that wraps part of the app needing user login state
export function UserProvider({ children }) {
  
  // Initial user state: not logged in
  const [user, setUser] = useState({
    isLoggedIn: false,
    name: '',
  });

  /**
   * Logs in the user by updating the state
   * @param {string} name - The name of the user
   */
  const login = (name) => {
    setUser({
      isLoggedIn: true,
      name: name,
    });
  };

  /**
   * Logs out the user by resetting the state
   */
  const logout = () => {
    setUser({
      isLoggedIn: false,
      name: '',
    });
  };

  
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
