import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import {
  outputAdminMock,
  allUsers,
  inputRegisterMock,
  outputRegisterMock,
} from './mocks/usersMock';
import {
  requestAllUsers,
  requestCreateUser,
  requestDeleteUser,
} from '../services/requests';

const headerNameTestid = 'customer_products__element-navbar-user-full-name';
const inputNameTestid = 'admin_manage__input-name';
const inputEmailTestid = 'admin_manage__input-email';
const inputPasswordTestid = 'admin_manage__input-password';
const selectRoleTestid = 'admin_manage__select-role';
const deleteButtonTestid = 'admin_manage__element-user-table-remove';
const registerButtonTestid = 'admin_manage__button-register';
const errorMessageTestid = 'admin_manage__element-invalid-register';

const route = '/admin/manage';

jest.mock('../services/requests');

describe.only('Testando a página de adminManage', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    localStorage.clear();
    localStorage.setItem('user', JSON.stringify(outputAdminMock));
  });
  it(
    'Se os elementos são renderizados e se o botão cadastrar encontra-se desabilitado',
    async () => {
      requestAllUsers.mockImplementation(
        () => Promise.resolve(allUsers),
      );

      renderWithRouter(<App />, { route });

      const tableLineNumber = 4;

      await waitFor(() => {
        expect(screen.getAllByRole('row')).toHaveLength(tableLineNumber);
      });

      expect(screen.getByTestId(headerNameTestid)).toBeInTheDocument();
      expect(screen.getByTestId(inputNameTestid)).toBeInTheDocument();
      expect(screen.getByTestId(inputEmailTestid)).toBeInTheDocument();
      expect(screen.getByTestId(inputPasswordTestid)).toBeInTheDocument();
      expect(screen.getByTestId(selectRoleTestid)).toBeInTheDocument();
      expect(screen.getByTestId(registerButtonTestid)).toBeDisabled();
    },
  );
  it(
    'Se é possível cadastrar um novo usuário com sucesso',
    async () => {
      const { token, ...outputRegister } = outputRegisterMock;

      requestAllUsers.mockImplementation(
        () => Promise.resolve(allUsers),
      );

      requestCreateUser.mockImplementation(
        () => Promise.resolve(outputRegister),
      );

      const { user } = renderWithRouter(<App />, { route });

      const tableLineNumber = 4;

      await waitFor(() => {
        expect(screen.getAllByRole('row')).toHaveLength(tableLineNumber);
      });

      const inputName = screen.getByTestId(inputNameTestid);
      const inputEmail = screen.getByTestId(inputEmailTestid);
      const inputpassword = screen.getByTestId(inputPasswordTestid);
      const selectRole = screen.getByTestId(selectRoleTestid);

      await user.type(inputName, inputRegisterMock.name);
      await user.type(inputEmail, inputRegisterMock.email);
      await user.type(inputpassword, inputRegisterMock.password);
      await user.selectOptions(selectRole, 'customer');

      expect(screen.getByTestId(registerButtonTestid)).toBeEnabled();
      const registerButton = screen.getByTestId(registerButtonTestid);

      await user.click(registerButton);

      const tableLineNumberAfterNewUser = 5;

      await waitFor(() => {
        expect(screen.getAllByRole('row')).toHaveLength(tableLineNumberAfterNewUser);
      });
    },
  );

  it(
    'Se ao falhar o cadastrar é exibida uma mensagem com erro',
    async () => {
      requestAllUsers.mockImplementation(
        () => Promise.resolve(allUsers),
      );

      requestCreateUser.mockImplementation(
        () => Promise.reject(new Error('Invalid register')),
      );

      const { user } = renderWithRouter(<App />, { route });

      const tableLineNumber = 4;

      await waitFor(() => {
        expect(screen.getAllByRole('row')).toHaveLength(tableLineNumber);
      });

      const inputName = screen.getByTestId(inputNameTestid);
      const inputEmail = screen.getByTestId(inputEmailTestid);
      const inputpassword = screen.getByTestId(inputPasswordTestid);
      const selectRole = screen.getByTestId(selectRoleTestid);

      await user.type(inputName, inputRegisterMock.name);
      await user.type(inputEmail, inputRegisterMock.email);
      await user.type(inputpassword, inputRegisterMock.password);
      await user.selectOptions(selectRole, 'customer');

      expect(screen.getByTestId(registerButtonTestid)).toBeEnabled();
      const registerButton = screen.getByTestId(registerButtonTestid);

      await user.click(registerButton);

      await waitFor(() => {
        expect(screen.getByTestId(errorMessageTestid)).toBeInTheDocument();
      });
    },
  );

  it(
    'Se é possível excluir um usuário',
    async () => {
      requestAllUsers.mockImplementation(
        () => Promise.resolve(allUsers),
      );

      requestDeleteUser.mockImplementation(
        () => Promise.resolve(null),
      );

      const { user } = renderWithRouter(<App />, { route });

      const tableLineNumber = 4;

      await waitFor(() => {
        expect(screen.getAllByRole('row')).toHaveLength(tableLineNumber);
      });

      const deleteButton = screen.getByTestId(`${deleteButtonTestid}-1`);

      await user.click(deleteButton);

      const tableLineNumberAfterNewUser = 3;

      await waitFor(() => {
        expect(screen.getAllByRole('row')).toHaveLength(tableLineNumberAfterNewUser);
      });
    },
  );

  it(
    'Se ao falhar a exclusão de um usuário é exibida uma mensagem com o erro',
    async () => {
      requestAllUsers.mockImplementation(
        () => Promise.resolve(allUsers),
      );

      requestDeleteUser.mockImplementation(
        () => Promise.reject(new Error('Request fail')),
      );

      const { user } = renderWithRouter(<App />, { route });

      const tableLineNumber = 4;

      await waitFor(() => {
        expect(screen.getAllByRole('row')).toHaveLength(tableLineNumber);
      });

      const deleteButton = screen.getByTestId(`${deleteButtonTestid}-1`);

      await user.click(deleteButton);

      await waitFor(() => {
        expect(screen.getByTestId(errorMessageTestid)).toBeInTheDocument();
      });
    },
  );

  it(
    'Se ao falhar a requisição de usuários na API é exibida uma mensagem com o erro',
    async () => {
      requestAllUsers.mockImplementation(
        () => Promise.reject(new Error('Request fail')),
      );

      renderWithRouter(<App />, { route });

      await waitFor(() => {
        expect(screen.getByTestId(errorMessageTestid)).toBeInTheDocument();
      });
    },
  );

  it(
    'Redireciona para /login caso não encontre um user salvo no storage',
    async () => {
      localStorage.clear();

      requestAllUsers.mockImplementation(
        () => Promise.resolve(allUsers),
      );

      renderWithRouter(<App />, { route });

      await waitFor(() => {
        expect(screen.getByTestId('common_login__button-login')).toBeInTheDocument();
      });
    },
  );
});
