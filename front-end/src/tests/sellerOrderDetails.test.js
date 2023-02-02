import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import { outputSellerMock } from './mocks/usersMock';
import { orderByIdMock } from './mocks/ordersMock';
import { requestOrderById, requestChangeStatusOrder } from '../services/requests';

const prefix = 'seller_order_details__';

const orderIdTestid = `${prefix}element-order-details-label-order-id`;
const orderDateTestid = `${prefix}element-order-details-label-order-date`;
const orderStatusTestid = `${prefix}element-order-details-label-delivery-status`;
const preparingButtonTestid = `${prefix}button-preparing-check`;
const dispatchButtonTestid = `${prefix}button-dispatch-check`;
const totalPriceTestid = `${prefix}element-order-total-price`;
const headerNameTestid = 'customer_products__element-navbar-user-full-name';

const route = '/seller/orders/3';
const errorMessageMock = 'Fail request';

jest.mock('../services/requests');

describe('Testando a página de customerOrderDetails', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    localStorage.clear();
    localStorage.setItem('user', JSON.stringify(outputSellerMock));
  });
  it(
    'Se os elementos são renderizados e se o status dos botões estão corretos',
    async () => {
      requestOrderById.mockImplementation(
        () => Promise.resolve(orderByIdMock),
      );

      renderWithRouter(<App />, { route });

      const tableLineNumber = 4;
      await waitFor(() => {
        expect(screen.getAllByRole('row')).toHaveLength(tableLineNumber);
      });

      expect(screen.getByTestId(headerNameTestid)).toBeInTheDocument();
      expect(screen.getByTestId(orderIdTestid)).toBeInTheDocument();
      expect(screen.getByTestId(orderDateTestid)).toBeInTheDocument();
      expect(screen.getByTestId(orderStatusTestid)).toBeInTheDocument();
      expect(screen.getByTestId(totalPriceTestid)).toBeInTheDocument();
      expect(screen.getByTestId(preparingButtonTestid)).toBeEnabled();
      expect(screen.getByTestId(dispatchButtonTestid)).toBeDisabled();
    },
  );

  it(
    'Se ao clicar no botão de preparar o status do pedido muda para "Preparando"',
    async () => {
      requestOrderById.mockImplementation(
        () => Promise.resolve(orderByIdMock),
      );

      requestChangeStatusOrder.mockImplementation(
        () => Promise.resolve(null),
      );

      const { user } = renderWithRouter(<App />, { route });

      const tableLineNumber = 4;
      await waitFor(() => {
        expect(screen.getAllByRole('row')).toHaveLength(tableLineNumber);
      });

      const buttonPreparing = screen.getByTestId(preparingButtonTestid);
      await user.click(buttonPreparing);

      expect(screen.getByTestId(orderStatusTestid)).toHaveTextContent('Preparando');
      expect(screen.getByTestId(preparingButtonTestid)).toBeDisabled();
      expect(screen.getByTestId(dispatchButtonTestid)).toBeEnabled();
    },
  );

  it(
    'Se ao clicar no botão de preparar o status do pedido muda para "Em Trânsito"',
    async () => {
      requestOrderById.mockImplementation(
        () => Promise.resolve({ ...orderByIdMock, status: 'Preparando' }),
      );

      requestChangeStatusOrder.mockImplementation(
        () => Promise.resolve(null),
      );

      const { user } = renderWithRouter(<App />, { route });

      const tableLineNumber = 4;
      await waitFor(() => {
        expect(screen.getAllByRole('row')).toHaveLength(tableLineNumber);
      });

      const buttonDispatch = screen.getByTestId(dispatchButtonTestid);
      await user.click(buttonDispatch);

      expect(screen.getByTestId(orderStatusTestid)).toHaveTextContent('Em Trânsito');
      expect(screen.getByTestId(preparingButtonTestid)).toBeDisabled();
      expect(screen.getByTestId(dispatchButtonTestid)).toBeDisabled();
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

  it(
    'Em caso de falha na alteração do status do pedido para API dispara um console log',
    async () => {
      requestOrderById.mockImplementation(
        () => Promise.resolve(orderByIdMock),
      );

      requestChangeStatusOrder.mockImplementation(
        () => Promise.reject(new Error(errorMessageMock)),
      );

      const { user } = renderWithRouter(<App />, { route });

      const tableLineNumber = 4;
      await waitFor(() => {
        expect(screen.getAllByRole('row')).toHaveLength(tableLineNumber);
      });

      const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
      const buttonPreparing = screen.getByTestId(preparingButtonTestid);
      await user.click(buttonPreparing);

      await waitFor(() => {
        expect(spy).toHaveBeenCalledWith(errorMessageMock);
      });
    },
  );
});
