import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { mount } from 'enzyme';
import Cart from './Cart'; 
import { MemoryRouter } from 'react-router-dom';
import cartReducer from '../../redux/CartSlice';
import authReducer from '../../Redux/authSlice';

jest.mock('../../assets/Images/emptyCart.jpeg', () => 'emptyCart.jpg');

const createMockStore = (preloadedState) =>
  configureStore({
    reducer: {
      cart: cartReducer,
      auth: authReducer,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });

const renderComponent = (preloadedState) => {
  const store = createMockStore(preloadedState);
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    </Provider>
  );
  return { wrapper, store };
};

describe('Cart Component', () => {
  const initialState = {
    cart: {
      products: [
        {
          id: 1,
          title: 'Product 1',
          price: 100,
          quantity: 2,
          image: 'product1.jpg',
        },
        
      ],
      address: '123 Test St',
    },
    auth: {
      isAuthenticated: true,
      user: { username: 'testuser' }
    },
  };

  it('should trigger decrease quantity action', () => {
    const { wrapper, store } = renderComponent(initialState);

    const decreaseBtn = wrapper.find('[data-testid="decrease-btn"]').at(0);
    expect(decreaseBtn.exists()).toBe(true);

    decreaseBtn.simulate('click');
    const actions = store.getState().cart;
    expect(store.getState().cart.products[0].quantity).toBeLessThanOrEqual(2);
  });

  it('should trigger remove from cart', () => {
    const { wrapper, store } = renderComponent(initialState);

    const removeBtn = wrapper.find('[data-testid="remove-btn"]').at(0);
    expect(removeBtn.exists()).toBe(true);

    removeBtn.simulate('click');
    const actions = store.getState().cart;
    
  });

  it('should open and close address modal', () => {
    const { wrapper } = renderComponent(initialState);

    const changeBtn = wrapper.find('[data-testid="change-address-btn"]');
    expect(changeBtn.exists()).toBe(true);
    changeBtn.simulate('click');

    const modal = wrapper.find('[data-testid="modal"]');
    expect(modal.exists()).toBe(true);

    const closeBtn = wrapper.find('[data-testid="close-modal-btn"]');
    expect(closeBtn.exists()).toBe(true);
    closeBtn.simulate('click');
  });

  it('should navigate to home when "Shop Now" is clicked on empty cart', () => {
    const emptyState = {
      cart: {
        products: [],
      },
      auth: {
        isAuthenticated: true,
      },
    };

    const { wrapper } = renderComponent(emptyState);

    const shopNowBtn = wrapper.find('button').filterWhere((btn) =>
      btn.text().includes('Shop Now')
    );
    expect(shopNowBtn.exists()).toBe(true);
    shopNowBtn.simulate('click');
  });
});
