import { useEffect, useState } from 'react';
import FormUserRegistration from '../components/FormUserRegistration';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { requestCreateUser, setToken } from '../services/requests';

const mockUsers = [
  { id: 1,
    name: 'Delivery App Admin',
    email: 'adm@deliveryapp.com',
    role: 'administrator' },
  { id: 2, name: 'Fulana Pereira', email: 'fulana@deliveryapp.com', role: 'seller' },
  { id: 3, name: 'Cliente Zé Birita', email: 'zebirita@email.com', role: 'customer' },
];

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
      // const response = await requestAllUsers(id);
      setRegisteredUsers(mockUsers);
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

  useEffect(() => {
    setUser(getStorageData('user'));
    fetchUsers();
    setLoading(false);
  }, []);

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
              <p data-testid="admin_manage__element-invalid-email">
                {fetchError}
              </p>)
          }
          <div>
            <FormUserRegistration
              createUser={ createUser }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
