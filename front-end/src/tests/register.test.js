import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import { inputRegisterMock, outputRegisterMock } from './mocks/usersMock';
import { allProductsMock } from './mocks/productsMock';
import { requestProducts, requestRegister } from '../services/requests';

const nameTestid = 'common_register__input-name';
const emailTestid = 'common_register__input-email';
const passwordTestid = 'common_register__input-password';
const buttonTestid = 'common_register__button-register';
const errorTestid = 'common_register__element-invalid_register';
const headerNameTestid = 'customer_products__element-navbar-user-full-name';

jest.mock('../services/requests');

describe('Testando a página de Register', () => {
  afterEach(() => {
    jest.resetAllMocks();
    localStorage.clear();
  });
  it(
    'Se os elementos são renderizados e se o botão encontra-se desabilitado',
    () => {
      renderWithRouter(<App />, { route: '/register' });

      const nameInputField = screen.getByTestId(nameTestid);
      const emailInputField = screen.getByTestId(emailTestid);
      const passwordInputField = screen.getByTestId(passwordTestid);
      const registerButton = screen.getByTestId(buttonTestid);

      expect(nameInputField).toBeInTheDocument();
      expect(emailInputField).toBeInTheDocument();
      expect(passwordInputField).toBeInTheDocument();
      expect(registerButton).toBeInTheDocument();
      expect(registerButton).toBeDisabled();
    },
  );

  it(
    'Se o botão encontra-se habilitado ao inserir dados válidos',
    async () => {
      const { user } = renderWithRouter(<App />, { route: '/register' });

      const nameInputField = screen.getByTestId(nameTestid);
      const emailInputField = screen.getByTestId(emailTestid);
      const passwordInputField = screen.getByTestId(passwordTestid);
      const buttonDisabled = screen.getByTestId(buttonTestid);
      expect(buttonDisabled).toBeDisabled();

      await user.type(nameInputField, inputRegisterMock.name);
      await user.type(emailInputField, inputRegisterMock.email);
      await user.type(passwordInputField, inputRegisterMock.password);

      const buttonEnabled = screen.getByTestId('common_register__button-register');
      expect(buttonEnabled).toBeEnabled();
    },
  );
  it(
    'Se o registro for um sucesso muda para a página /customer/products',
    async () => {
      requestRegister.mockImplementation(
        () => Promise.resolve(outputRegisterMock),
      );
      requestProducts.mockImplementation(
        () => Promise.resolve(allProductsMock),
      );

      const { user } = renderWithRouter(<App />, { route: '/register' });

      const nameInputField = screen.getByTestId(nameTestid);
      const emailInputField = screen.getByTestId(emailTestid);
      const passwordInputField = screen.getByTestId(passwordTestid);

      await user.type(nameInputField, inputRegisterMock.name);
      await user.type(emailInputField, inputRegisterMock.email);
      await user.type(passwordInputField, inputRegisterMock.password);

      expect(nameInputField).toHaveAttribute('value', 'Marquinhos Gameplay');
      expect(screen.getByTestId(buttonTestid)).toBeEnabled();
      await user.click(screen.getByTestId(buttonTestid));

      await waitFor(() => {
        expect(screen.getByTestId(headerNameTestid)).toBeInTheDocument();
      });
    },
  );
  it(
    'Se o registro falhar o componente com o erro deve estar visível',
    async () => {
      requestRegister.mockImplementation(
        () => Promise.reject(new Error('Invalid register')),
      );

      const { user } = renderWithRouter(<App />, { route: '/register' });

      const nameInputField = screen.getByTestId(nameTestid);
      const emailInputField = screen.getByTestId(emailTestid);
      const passwordInputField = screen.getByTestId(passwordTestid);

      await user.type(nameInputField, inputRegisterMock.name);
      await user.type(emailInputField, inputRegisterMock.email);
      await user.type(passwordInputField, inputRegisterMock.password);

      expect(nameInputField).toHaveAttribute('value', 'Marquinhos Gameplay');
      expect(screen.getByTestId(buttonTestid)).toBeEnabled();
      await user.click(screen.getByTestId(buttonTestid));

      await waitFor(() => {
        expect(screen.getByTestId(errorTestid)).toBeInTheDocument();
      });
    },
  );
});
