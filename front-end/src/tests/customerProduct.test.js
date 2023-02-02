import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import { requestProducts, requestAllSellers } from '../services/requests';
import { outputCustomerMock, outputAllSellersMock } from './mocks/usersMock';
import { allProductsMock, shopCartMock } from './mocks/productsMock';

const idQuantity = 'customer_products__input-card-quantity-1';
const idRMIntem = 'customer_products__button-card-rm-item-1';
const idAddItem = 'customer_products__button-card-add-item-1';
const buttonCard = 'customer_products__button-cart';
const headerNameTestid = 'customer_products__element-navbar-user-full-name';

const route = '/customer/products';
jest.mock('../services/requests');

describe('Testando a página de customerProduct', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    localStorage.clear();
    localStorage.setItem('user', JSON.stringify(outputCustomerMock));
  });

  it('Se os elementos são renderizados', async () => {
    requestProducts.mockImplementation(
      () => Promise.resolve(allProductsMock),
    );
    renderWithRouter(<App />, { route });

    await waitFor(() => {
      expect(screen.getByTestId('customer_products__element-card-price-1'))
        .toBeInTheDocument();
      expect(screen.getByTestId('customer_products__img-card-bg-image-1'))
        .toBeInTheDocument();
      expect(screen.getByTestId('customer_products__element-card-title-1'))
        .toBeInTheDocument();
      expect(screen.getByTestId('customer_products__element-card-title-1'))
        .toBeInTheDocument();
      expect(screen.getByTestId(idQuantity))
        .toBeInTheDocument();
      expect(screen.getByTestId('customer_products__button-card-add-item-1'))
        .toBeInTheDocument();
    });
  });
  it('Se ao finalizar uma compra manda para a pagina de /customer/checkout', async () => {
    localStorage.setItem('shopCart', JSON.stringify(shopCartMock));

    requestProducts.mockImplementation(
      () => Promise.resolve(allProductsMock),
    );
    requestAllSellers.mockImplementation(
      () => Promise.resolve(outputAllSellersMock),
    );

    const { user } = renderWithRouter(<App />, { route });

    await waitFor(() => {
      expect(screen.getByTestId(buttonCard)).toBeInTheDocument();
    });

    const buttonShop = screen.getByTestId(buttonCard);
    await user.click(buttonShop);

    await waitFor(() => {
      expect(screen.getByTestId(headerNameTestid)).toBeInTheDocument();
    });
  });
  it('Se os botões de adicionar e remover funcionam', async () => {
    requestProducts.mockImplementation(
      () => Promise.resolve(allProductsMock),
    );

    const { user } = renderWithRouter(<App />, { route });
    await waitFor(() => {
      expect(screen.getByTestId(idAddItem)).toBeInTheDocument();
    });

    const addItem = screen.getByTestId(idAddItem);
    const rmItem = screen.getByTestId(idRMIntem);

    const quantityInput = screen.getByTestId(idQuantity);

    await user.click(addItem);
    await user.click(addItem);
    await user.click(addItem);
    await user.click(rmItem);
    await user.click(rmItem);
    await user.click(rmItem);
    await user.type(quantityInput, '1');
    await user.type(quantityInput, '0');
    expect(quantityInput.value).toBe('10');
  });
  it('Se a erro no request', async () => {
    requestProducts.mockImplementation(
      () => Promise.reject(new Error('Error')),
    );
    renderWithRouter(<App />, { route });

    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith('Error');
    });
  });
  it('Não a produstos cadastratos um texto deve ser exibido', async () => {
    requestProducts.mockImplementation(
      () => Promise.resolve([]),
    );
    renderWithRouter(<App />, { route });

    await waitFor(() => {
      expect(screen.getByTestId(
        'notProducts',
      )).toBeInTheDocument();
    });
  });
});
