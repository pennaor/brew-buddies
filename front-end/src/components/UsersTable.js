import PropTypes from 'prop-types';
import { FaTrashAlt } from 'react-icons/fa';

export default function UsersTable({ users, deleteUser }) {
  const tableHeader = ['Cod.', 'Nome', 'E-mail', 'Tipo', 'Excluir'];

  return (
    <table className="userTable-container">
      <thead className="userTable-container-head">
        <tr>
          {tableHeader.map((description, index) => (
            <th key={ index }>{description}</th>
          ))}
        </tr>
      </thead>
      <tbody className="userTable-container-body">
        {users.map((user, index) => (
          <tr
            key={ user.id }
          >
            <td
              data-testid={
                `admin_manage__element-user-table-item-number-${index}`
              }
            >
              {index + 1}
            </td>
            <td
              data-testid={ `admin_manage__element-user-table-name-${index}` }
            >
              {user.name}
            </td>
            <td
              data-testid={ `admin_manage__element-user-table-email-${index}` }
            >
              {user.email}
            </td>
            <td
              data-testid={ `admin_manage__element-user-table-role-${index}` }
            >
              {
                (user.role === 'customer' && 'Cliente')
              || (user.role === 'seller' && 'P. Vendedora')
              || (user.role === 'administrator' && 'Administrador')
              }
            </td>
            <td>
              <button
                name={ user.id }
                type="button"
                data-testid={ `admin_manage__element-user-table-remove-${index}` }
                onClick={ () => deleteUser(Number(user.id)) }
              >
                Excluir
                {' '}
                <FaTrashAlt />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

UsersTable.propTypes = {
  users: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
  deleteUser: PropTypes.func.isRequired,
};
