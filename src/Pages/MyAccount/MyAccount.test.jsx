import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import MyAccount from './MyAccount';
import { it } from 'vitest';


const mockStore = configureStore([]);

describe('MyAccount Component', () => {
  it('renders user info in input fields', () => {
    const initialState = {
      account: {
        user: {
          name: 'john_doe',
          email: 'john@example.com',
          phone: '1234567890'
        },
        loading: false,
        error: null
      }
    };

    const store = mockStore(initialState);

    const wrapper = mount(
      <Provider store={store}>
        <MyAccount />
      </Provider>
    );

    wrapper.update(); 

    const nameInput = wrapper.find('input[name="name"]');
    const emailInput = wrapper.find('input[name="email"]');
    const phoneInput = wrapper.find('input[name="phone"]');

    expect(nameInput.prop('value')).toBe('john_doe');
    expect(emailInput.prop('value')).toBe('john@example.com');
    expect(phoneInput.prop('value')).toBe('1234567890');
  });
   
});
