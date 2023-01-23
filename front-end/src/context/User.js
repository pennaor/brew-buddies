import { createContext } from 'react';
import { node } from 'prop-types';

const UserContext = createContext();

function UserProvider({ children }) {
  return (
    <UserContext.Provider>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: node,
}.isRequired;

export default UserProvider;
