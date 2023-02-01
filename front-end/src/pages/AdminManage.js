import { useEffect, useState } from 'react';
import FormUserRegistration from '../components/FormUserRegistration';
import Header from '../components/Header';
import Loading from '../components/Loading';
import UsersTable from '../components/UsersTable';
import {
  requestAllUsers,
  requestCreateUser,
  requestDeleteUser,
  setToken,
} from '../services/requests';

// const mockUsers = [
//   { id: 1,
//     name: 'Delivery App Admin',
//     email: 'adm@deliveryapp.com',
//     role: 'administrator' },
//   { id: 2, name: 'Fulana Pereira', email: 'fulana@deliveryapp.com', role: 'seller' },
//   { id: 3, name: 'Cliente Zé Birita', email: 'zebirita@email.com', role: 'customer' },
// ];

export default function AdminManage() {
  const [user, setUser] = useState('');
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setfetchError] = useState('');

  const getStorageData = (storageName) => {
    const data = JSON.parse(localStorage.getItem(storageName));
    if (data === null) {
      return [];
    }
    return data;
  };

  const fetchUsers = async () => {
    try {
      setToken(user.token);
      const users = await requestAllUsers();
      console.log(users);
      const filteredUser = users.filter(
        (userResponse) => userResponse.id !== user.id,
      );
      setRegisteredUsers(filteredUser);
    } catch (error) {
      console.log(error);
      setfetchError(error);
    }
  };

  const createUser = async (event, body) => {
    event.preventDefault();
    try {
      setToken(user.token);
      const newUser = await requestCreateUser(body);
      setRegisteredUsers([...registeredUsers, newUser]);
    } catch (error) {
      console.log(error);
      setfetchError(error.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      setToken(user.token);
      await requestDeleteUser(id);
      const restOfUsers = registeredUsers.filter(
        (registredUser) => registredUser.id !== id,
      );
      setRegisteredUsers(restOfUsers);
    } catch (error) {
      console.log(error);
      setfetchError(error.message);
    }
  };

  useEffect(() => {
    setUser(getStorageData('user'));
  }, []);

  useEffect(() => {
    if (user.id) {
      fetchUsers();
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Header { ...user } />
      <div>
        <div>
          <h2>Cadastrar novo usuário</h2>
          {
            fetchError && (
              <p data-testid="admin_manage__element-invalid-register">
                {fetchError}
              </p>)
          }
          <div>
            <FormUserRegistration
              createUser={ createUser }
            />
          </div>
        </div>
        <div>
          <h2>Lista de usuários</h2>
          <UsersTable
            users={ registeredUsers }
            deleteUser={ deleteUser }
          />
        </div>
      </div>
    </div>
  );
}
