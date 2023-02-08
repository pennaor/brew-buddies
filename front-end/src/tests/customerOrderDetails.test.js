import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import { outputCustomerMock } from './mocks/usersMock';
import { orderByIdMock } from './mocks/ordersMock';
import { requestChangeStatusOrder, requestOrderById } from '../services/requests';

const prefix = 'customer_order_details__';

const orderIdTestid = `${prefix}element-order-details-label-order-id`;
const sellerNameTestid = `${prefix}element-order-details-label-seller-name`;
const orderDateTestid = `${prefix}element-order-details-label-order-date`;
const orderStatusTestid = `${prefix}element-order-details-label-delivery-status-`;
const deliveredButtonTestid = `${prefix}button-delivery-check`;
const totalPriceTestid = `${prefix}element-order-total-price`;

const route = '/customer/orders/3';
const inTransit = 'Em Trânsito';
const errorMessageMock = 'Fail request';

jest.mock('../services/requests');

describe('Testando a página de customerOrderDetails', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    localStorage.clear();
    localStorage.setItem('user', JSON.stringify(outputCustomerMock));
  });
  it(
    'Se os elementos são renderizados e se o botão encontra-se desabilitado',
    async () => {
      requestOrderById.mockImplementation(
        () => Promise.resolve(orderByIdMock),
      );

      renderWithRouter(<App />, { route });

      const tableLineNumber = 4;
      await waitFor(() => {
        expect(screen.getAllByRole('row')).toHaveLength(tableLineNumber);
      });
      expect(screen.getByTestId(orderIdTestid)).toBeInTheDocument();
      expect(screen.getByTestId(sellerNameTestid)).toBeInTheDocument();
      expect(screen.getByTestId(orderDateTestid)).toBeInTheDocument();
      expect(screen.getByTestId(orderStatusTestid)).toBeInTheDocument();
      expect(screen.getByTestId(totalPriceTestid)).toBeInTheDocument();
      expect(screen.getByTestId(deliveredButtonTestid)).toBeDisabled();
    },
  );

  it(
    'Se o botão encontra-se habilitado e se clicar nele altera o status para entregue',
    async () => {
      requestOrderById.mockImplementation(
        () => Promise.resolve({ ...orderByIdMock, status: inTransit }),
      );

      requestChangeStatusOrder.mockImplementation(
        () => Promise.resolve({ ...orderByIdMock, status: 'Entregue' }),
      );

      const { user } = renderWithRouter(<App />, { route });

      await waitFor(() => {
        expect(screen.getByTestId(deliveredButtonTestid)).toBeEnabled();
      });

      const buttonChangeStatus = screen.getByTestId(deliveredButtonTestid);
      await user.click(buttonChangeStatus);

      expect(screen.getByTestId(orderStatusTestid)).toHaveTextContent('Entregue');
    },
  );

  it(
    'Se a função de mudar o status falhar o status permance "Em Trânsito"',
    async () => {
      requestOrderById.mockImplementation(
        () => Promise.resolve({ ...orderByIdMock, status: inTransit }),
      );

      requestChangeStatusOrder.mockImplementation(
        () => Promise.reject(new Error(errorMessageMock)),
      );

      const { user } = renderWithRouter(<App />, { route });

      await waitFor(() => {
        expect(screen.getByTestId(deliveredButtonTestid)).toBeEnabled();
      });

      const buttonChangeStatus = screen.getByTestId(deliveredButtonTestid);

      const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
      await user.click(buttonChangeStatus);

      expect(screen.getByTestId(orderStatusTestid)).toHaveTextContent('Em Trânsito');
      expect(spy).toHaveBeenCalledWith(errorMessageMock);
    },
  );

  it(
    'Redireciona para /login caso não encontre um user salvo no storage',
    async () => {
      localStorage.clear();

      requestOrderById.mockImplementation(
        () => Promise.resolve(orderByIdMock),
      );

      renderWithRouter(<App />, { route });

      await waitFor(() => {
        expect(screen.getByTestId('common_login__button-login')).toBeInTheDocument();
      });
    },
  );

  it(
    'Em caso de falha no requerimento do pedido para API dispara um console log',
    async () => {
      requestOrderById.mockImplementation(
        () => Promise.reject(new Error(errorMessageMock)),
      );

      const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
      renderWithRouter(<App />, { route });

      await waitFor(() => {
        expect(spy).toHaveBeenCalledWith(errorMessageMock);
      });
    },
  );
});
