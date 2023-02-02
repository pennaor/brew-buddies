import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import { requestOrdersByClient } from '../services/requests';
import { outputCustomerMock } from './mocks/usersMock';
import { sellerOrdersMock } from './mocks/ordersMock';

const idElementId = 'customer_orders__element-order-id-1';
const idElementStatus = 'customer_orders__element-delivery-status-1';
const idElementDate = 'customer_orders__element-order-date-1';
const idElementPrice = 'customer_orders__element-card-price-1';

const route = '/customer/orders';
jest.mock('../services/requests');

describe('Testando a página de customerOrder', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    localStorage.clear();
    localStorage.setItem('user', JSON.stringify(outputCustomerMock));
  });

  it('Se os elementos são renderizados', async () => {
    requestOrdersByClient.mockImplementation(
      () => Promise.resolve(sellerOrdersMock),
    );
    renderWithRouter(<App />, { route });

    await waitFor(() => {
      expect(screen.getByTestId(idElementId))
        .toBeInTheDocument();
      expect(screen.getByTestId(idElementStatus))
        .toBeInTheDocument();
      expect(screen.getByTestId(idElementDate))
        .toBeInTheDocument();
      expect(screen.getByTestId(idElementPrice))
        .toBeInTheDocument();
    });
  });
  it('Se a erro no request', async () => {
    requestOrdersByClient.mockImplementation(
      () => Promise.reject(new Error('Error')),
    );
    renderWithRouter(<App />, { route });

    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith('Error');
    });
  });
  it(
    'Redireciona para /login caso não encontre um user salvo no storage',
    async () => {
      localStorage.clear();

      requestOrdersByClient.mockImplementation(
        () => Promise.resolve(sellerOrdersMock),
      );

      renderWithRouter(<App />, { route });

      await waitFor(() => {
        expect(screen.getByTestId('common_login__button-login')).toBeInTheDocument();
      });
    },
  );
});
