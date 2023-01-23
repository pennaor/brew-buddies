import { createContext, useMemo, useState } from 'react';
import { node } from 'prop-types';
import { requestLogin } from '../services/requests';

export const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState([]);
  const [userError, setUserError] = useState('');

  console.log(user);
  const signIn = async (body) => {
    try {
      const { data } = await requestLogin(body);
      localStorage.setItem('user', data);
      setUser(data);
    } catch (error) {
      setUserError(error);
    }
  };

  const value = useMemo(() => ({
    signIn,
    user,
    userError,
  }), [user, userError]);

  return (
    <UserContext.Provider
      value={ value }
    >
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: node,
}.isRequired;

export default UserProvider;
