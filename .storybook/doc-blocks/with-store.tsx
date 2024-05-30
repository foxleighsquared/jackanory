import React, { createContext } from 'react';
import Store from 'lib/services/store';
import { Provider } from 'react-redux';
import users from 'lib/mocks/users';
import User from 'lib/types/user';
interface Props {
  children: React.ReactNode;
}

export const AuthContext = createContext<{
  user: User;
  logout?: () => void;
}>({ user: users[0] });

/** A Fake AuthProvider for use in Storybook */
const AuthProvider: React.FC<React.PropsWithChildren<object>> = ({
  children
}) => {
  const logout = () => {
    alert('Logout has no effect in Storybook');
  };

  return (
    <AuthContext.Provider value={{ user: users[0], logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const WithStore: React.FC<Props> = ({ children }) => {
  const { store } = Store.useWrappedStore({});
  return (
    <Provider store={store}>
      <AuthProvider>{children}</AuthProvider>
    </Provider>
  );
};

export default WithStore;
