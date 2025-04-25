
import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';


jest.mock('./Pages/Home/Home', () => () => <div>Home Page</div>);
jest.mock('./Pages/Shop/Shop', () => () => <div>Shop Page</div>);
jest.mock('./Pages/cart/Cart', () => () => <div>Cart Page</div>);
jest.mock('./Pages/Checkout/Chekout', () => () => <div>Checkout Page</div>);
jest.mock('./Pages/FilterData', () => () => <div>Filter Data</div>);
jest.mock('./Pages/OrderConfimation/OrderConfimation', () => () => <div>Order Confirmation</div>);
jest.mock('./Pages/ProductDetail/ProductDetail', () => () => <div>Product Detail</div>);
jest.mock('./components/SearchResults', () => () => <div>Search Results</div>);
jest.mock('./Components/Navbar/Navbar', () => () => <div>Navbar</div>);
jest.mock('./Components/Footer/Footer', () => () => <div>Footer</div>);
jest.mock('./Components/Login/Login', () => () => <div>Login Page</div>);

describe('App component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should render without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists()).toBe(true);
  });
  
  it('should show fallback while lazy components are loading', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.html()).toContain('Loading...');
  });
  it('should always render Navbar and Footer', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Navbar).length).toBe(1);
    expect(wrapper.find(Footer).length).toBe(1);
  });
  it('should not render cart and checkout routes if user is not logged in', () => {
    const wrapper = shallow(<App />);
    const html = wrapper.html();
    expect(html).not.toContain('Cart Component');
    expect(html).not.toContain('Checkout Component');
  });
  it('should render cart and checkout routes if user is logged in', () => {
    localStorage.setItem('user', JSON.stringify({ id: 1 }));
    const wrapper = shallow(<App />);
    const html = wrapper.html();
    expect(wrapper.find('Route')).toBeTruthy(); 
  });
  
});


