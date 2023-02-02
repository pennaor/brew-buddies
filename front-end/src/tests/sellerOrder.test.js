import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import { requestOrdersBySeller } from '../services/requests';
import { outputSellerMock } from './mocks/usersMock';
import { sellerOrdersMock } from './mocks/ordersMock';

const route = '/seller/orders';
jest.mock('../services/requests');

describe('Testando a página de sellerOrder', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    localStorage.clear();
    localStorage.setItem('user', JSON.stringify(outputSellerMock));
  });
  it('Redireciona para /login caso não encontre um user salvo no storage', async () => {
    localStorage.clear();

    requestOrdersBySeller.mockImplementation(
      () => Promise.resolve(sellerOrdersMock),
    );

    renderWithRouter(<App />, { route });

    await waitFor(() => {
      expect(screen.getByTestId('common_login__button-login')).toBeInTheDocument();
    });
  });
});
