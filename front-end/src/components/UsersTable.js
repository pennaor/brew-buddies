import PropTypes from 'prop-types';

export default function UsersTable({ users, deleteUser }) {
  const tableHeader = ['Item', 'Nome', 'E-mail', 'Tipo', 'Excluir'];

  return (
    <table>
      <thead>
        <tr>
          {tableHeader.map((description, index) => (
            <th key={ index }>{description}</th>
          ))}
        </tr>
      </thead>
      <tbody>
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
