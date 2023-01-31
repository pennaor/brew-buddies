import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import { outputAllSellersMock, outputCustomerMock } from './mocks/usersMock';
import { shopCartMock } from './mocks/productsMock';
import { orderMock } from './mocks/ordersMock';

import {
  requestAllSellers,
  requestCreateOrder,
  requestOrderById } from '../services/requests';

const removeButtonTestid = 'customer_checkout__element-order-table-remove';
const totalPriceTestid = 'customer_checkout__element-order-total-price';
const selectSellerTestid = 'customer_checkout__select-seller';
const inputAddressTestid = 'customer_checkout__input-address';
const inputAddressNumberTestid = 'customer_checkout__input-address-number';
const finishOrderButtonTestid = 'customer_checkout__button-submit-order';

const orderNumberTestId = 'customer_order_details__element-order-details-label-order-id';

const route = '/customer/checkout';

jest.mock('../services/requests');

describe('Testando a página de customerCheckout', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    localStorage.clear();
    localStorage.setItem('user', JSON.stringify(outputCustomerMock));
    localStorage.setItem('shopCart', JSON.stringify(shopCartMock));
  });
  it(
    'Se os elementos são renderizados e se o botão encontra-se desabilitado',
    () => {
      requestAllSellers.mockImplementation(
        () => Promise.resolve(outputAllCostumerMock),
      );
      renderWithRouter(<App />, { route });

      const tableLineNumber = 4;

      expect(screen.getAllByRole('row')).toHaveLength(tableLineNumber);
      expect(screen.getByTestId(totalPriceTestid)).toBeInTheDocument();
      expect(screen.getByTestId(selectSellerTestid)).toBeInTheDocument();
      expect(screen.getByTestId(inputAddressTestid)).toBeInTheDocument();
      expect(screen.getByTestId(inputAddressNumberTestid)).toBeInTheDocument();
      expect(screen.getByTestId(finishOrderButtonTestid)).toBeInTheDocument();
    },
  );

  it('Se é possível excluir um item do carrinho', async () => {
    requestAllSellers.mockImplementation(
      () => Promise.resolve(outputAllCostumerMock),
    );
    const { user } = renderWithRouter(<App />, { route });

    const tableLineNumber = 4;
    const indexNumber = 1;

    const secondItemCardButton = screen.getByTestId(
      `${removeButtonTestid}-${indexNumber}`,
    );

    expect(screen.getAllByRole('row')).toHaveLength(tableLineNumber);
    expect(secondItemCardButton).toBeInTheDocument();

    await user.click(secondItemCardButton);

    expect(screen.getAllByRole('row')).toHaveLength(tableLineNumber - 1);
  });

  it(
    'Ao finalizar pedido com sucesso a página é redirecionada para customer/order/:id',
    async () => {
      requestAllSellers.mockImplementation(
        () => Promise.resolve(outputAllSellersMock),
      );

      requestCreateOrder.mockImplementation(
        () => Promise.resolve({ saleId: 3 }),
      );

      requestOrderById.mockImplementation(
        () => Promise.resolve(orderMock),
      );

      const { user } = renderWithRouter(<App />, { route });

      const sellerSelect = screen.getByTestId(selectSellerTestid);
      const addressInput = screen.getByTestId(inputAddressTestid);
      const addressNumberInput = screen.getByTestId(inputAddressNumberTestid);
      const finishOrderButton = screen.getByTestId(finishOrderButtonTestid);

      await waitFor(() => {
        expect(screen.getAllByRole('option')).toHaveLength(2);
      });

      await user.selectOptions(sellerSelect, '2');
      await user.type(addressInput, 'Rua das maças, centro');
      await user.type(addressNumberInput, '580');
      await user.click(finishOrderButton);

      await waitFor(() => {
        const orderNumber = screen.getByTestId(orderNumberTestId);
        expect(orderNumber).toHaveTextContent('3');
      });
    },
  );

  it(
    'Redireciona para /login caso não encontre um user salvo no storage',
    async () => {
      localStorage.clear();

      requestAllSellers.mockImplementation(
        () => Promise.resolve(outputAllSellersMock),
      );

      renderWithRouter(<App />, { route });

      await waitFor(() => {
        expect(screen.getByTestId('common_login__button-login')).toBeInTheDocument();
      });
    },
  );

  it(
    'Ao finalizar pedido com falha a página não é redirecionada para customer/order/:id',
    async () => {
      requestAllSellers.mockImplementation(
        () => Promise.resolve(outputAllSellersMock),
      );

      requestCreateOrder.mockImplementation(
        () => Promise.reject(new Error('Invalid create')),
      );

      const { user } = renderWithRouter(<App />, { route });

      const sellerSelect = screen.getByTestId(selectSellerTestid);
      const addressInput = screen.getByTestId(inputAddressTestid);
      const addressNumberInput = screen.getByTestId(inputAddressNumberTestid);
      const finishOrderButton = screen.getByTestId(finishOrderButtonTestid);

      await waitFor(() => {
        expect(screen.getAllByRole('option')).toHaveLength(2);
      });

      await user.selectOptions(sellerSelect, '2');
      await user.type(addressInput, 'Rua das maças, centro');
      await user.type(addressNumberInput, '580');

      const spy = jest.spyOn(console, 'log').mockImplementation(() => {});

      await user.click(finishOrderButton);

      await waitFor(() => {
        expect(spy).toHaveBeenCalledWith('Invalid create');
      });
    },
  );
});
