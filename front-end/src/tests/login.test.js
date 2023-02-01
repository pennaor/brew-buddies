import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import {
  inputCustomerMock,
  outputCustomerMock,
  inputSellerMock,
  outputSellerMock,
  inputAdminMock,
  outputAdminMock,
  allUsers,
  orders,
  inputRegisterMock,
} from './mocks/usersMock';
import { allProductsMock } from './mocks/productsMock';
import {
  requestLogin,
  requestProducts,
  requestAllUsers,
  requestOrdersBySeller,
} from '../services/requests';

const idEmail = 'common_login__input-email';
const idPassword = 'common_login__input-password';
const idButtonLogin = 'common_login__button-login';
const headerNameTestid = 'customer_products__element-navbar-user-full-name';

jest.mock('../services/requests');

describe('Testando a página de Login', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    localStorage.clear();
  });

  it('Se os elementos são renderizados', () => {
    renderWithRouter(<App />, { route: '/login' });
    const email = screen.getByTestId(idEmail);
    const senha = screen.getByTestId(idPassword);
    const buttonLogin = screen.getByTestId(idButtonLogin);
    const buttonRegister = screen.getByTestId('common_login__button-register');

    expect(email).toBeInTheDocument();
    expect(senha).toBeInTheDocument();

    expect(buttonLogin).toBeInTheDocument();
    expect(buttonRegister).toBeInTheDocument();
  });

  it(
    'Se ao inicia e informar valor errados o botão fica desabilitado',
    async () => {
      const { user } = renderWithRouter(<App />, { route: '/login' });

      const email = screen.getByTestId(idEmail);
      const senha = screen.getByTestId(idPassword);
      const buttonLogin = screen.getByTestId(idButtonLogin);

      expect(buttonLogin).toHaveAttribute('disabled');

      await user.type(email, 'idEmail');
      await user.type(senha, '123');

      expect(buttonLogin).toHaveAttribute('disabled');
    },
  );

  it(
    'Se o login de um costumer for um sucesso muda para a página /customer/products',
    async () => {
      requestLogin.mockImplementation(
        () => Promise.resolve(outputCustomerMock),
      );
      requestProducts.mockImplementation(
        () => Promise.resolve(allProductsMock),
      );
      const { user } = renderWithRouter(<App />, { route: '/login' });
      const email = screen.getByTestId(idEmail);
      const senha = screen.getByTestId(idPassword);
      const buttonLogin = screen.getByTestId(idButtonLogin);

      expect(buttonLogin).toHaveAttribute('disabled');

      await user.type(email, inputCustomerMock.email);
      await user.type(senha, inputCustomerMock.password);

      await user.click(buttonLogin);

      await waitFor(() => {
        expect(screen.getByTestId(headerNameTestid))
          .toBeInTheDocument();
      });
    },
  );

  it('Se ao clicar no botão de registrar muda para a página /register', async () => {
    requestLogin.mockImplementation(
      () => Promise.resolve(outputCustomerMock),
    );

    const { user } = renderWithRouter(<App />, { route: '/login' });

    const buttonRegister = screen.getByTestId('common_login__button-register');
    await user.click(buttonRegister);

    await waitFor(() => {
      expect(screen.getByTestId('common_register__input-name'))
        .toBeInTheDocument();
    });
  });
  it(
    'Se o login de um seller for um sucesso muda para a página /seller/orders',
    async () => {
      requestLogin.mockImplementation(
        () => Promise.resolve(outputSellerMock),
      );
      requestOrdersBySeller.mockImplementation(
        () => Promise.resolve(orders),
      );
      const { user } = renderWithRouter(<App />, { route: '/login' });
      const email = screen.getByTestId(idEmail);
      const senha = screen.getByTestId(idPassword);
      const buttonLogin = screen.getByTestId(idButtonLogin);
      await user.type(email, inputSellerMock.email);
      await user.type(senha, inputSellerMock.password);
      await user.click(buttonLogin);
      await waitFor(() => {
        expect(screen
          .getByTestId(headerNameTestid))
          .toBeInTheDocument();
      });
    },
  );
  it(
    'Se o login de um administrator for um sucesso muda para a página /admin/manage',
    async () => {
      requestLogin.mockImplementation(
        () => Promise.resolve(outputAdminMock),
      );
      requestAllUsers.mockImplementation(
        () => Promise.resolve(allUsers),
      );
      const { user } = renderWithRouter(<App />, { route: '/login' });
      const email = screen.getByTestId(idEmail);
      const senha = screen.getByTestId(idPassword);
      const buttonLogin = screen.getByTestId(idButtonLogin);
      expect(buttonLogin).toHaveAttribute('disabled');
      await user.type(email, inputAdminMock.email);
      await user.type(senha, inputAdminMock.password);
      await user.click(buttonLogin);
      await waitFor(() => {
        expect(screen.getByTestId(headerNameTestid))
          .toBeInTheDocument();
      });
    },
  );
  it(
    'Se o registro falhar o componente com o erro deve estar visível',
    async () => {
      requestLogin.mockImplementation(
        () => Promise.reject(new Error('Invalid login')),
      );
      const { user } = renderWithRouter(<App />, { route: '/login' });
      const email = screen.getByTestId(idEmail);
      const senha = screen.getByTestId(idPassword);
      await user.type(email, inputRegisterMock.email);
      await user.type(senha, inputRegisterMock.password);
      expect(email).toHaveAttribute('value', 'Mgameplay@bol.com');
      expect(screen.getByTestId(idButtonLogin)).toBeEnabled();
      await user.click(screen.getByTestId(idButtonLogin));
      await waitFor(() => {
        expect(screen.getByTestId('common_login__element-invalid-email'))
          .toBeInTheDocument();
      });
    },
  );
  it(
    `Se ja estiver um customer salvo no localStorage,
     muda para a página /customer/products`,
    async () => {
      localStorage.setItem(
        'user',
        JSON.stringify(outputCustomerMock),
      );
      requestProducts.mockImplementation(
        () => Promise.resolve(allProductsMock),
      );
      requestAllUsers.mockImplementation(
        () => Promise.resolve(allUsers),
      );
      renderWithRouter(<App />, { route: '/login' });
      await waitFor(() => {
        expect(screen.getByTestId(headerNameTestid))
          .toBeInTheDocument();
      });
    },
  );
  it(
    'Se ja estiver um seller salvo no localStorage muda para a página /seller/orders',
    async () => {
      localStorage.setItem(
        'user',
        JSON.stringify(outputSellerMock),
      );
      requestProducts.mockImplementation(
        () => Promise.resolve(outputSellerMock),
      );
      requestAllUsers.mockImplementation(
        () => Promise.resolve(orders),
      );
      renderWithRouter(<App />, { route: '/login' });
      await waitFor(() => {
        expect(screen
          .getByTestId(
            headerNameTestid,
          ))
          .toBeInTheDocument();
      });
    },
  );
  it(
    'Se ja estiver um admin salvo no localStorage muda para a página /admin/manage',
    async () => {
      localStorage.setItem(
        'user',
        JSON.stringify(outputAdminMock),
      );
      requestAllUsers.mockImplementation(
        () => Promise.resolve(allUsers),
      );

      renderWithRouter(<App />, { route: '/login' });
      await waitFor(() => {
        expect(screen.getByTestId(headerNameTestid))
          .toBeInTheDocument();
      });
    },
  );
});
