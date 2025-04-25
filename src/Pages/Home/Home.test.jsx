import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { shallow ,mount} from 'enzyme';
import Home from './Home';
import * as productSlice from '../../redux/ProductSlice';
import * as utils from '../../utils/Utils';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));

jest.mock('../../redux/ProductSlice', () => ({
  fetchProducts: jest.fn(() => ({ type: 'FETCH_PRODUCTS' })),
  selectFilteredProducts: jest.fn()
}));

jest.mock('../../Components/ProductCard/ProductCard', () => () => <div>ProductCard</div>);
jest.mock('../../Components/ImageSlider', () => () => <div>ImageSlider</div>);
jest.mock('../../Components/ScrollToTop', () => () => <div>ScrollToTop</div>);
jest.mock('../Infosection/Infosection', () => () => <div>Infosection</div>);
jest.mock('../../Components/CatagoryFiltters/CatagoryFilters', () => () => <div>CategoryFilter</div>);
jest.mock('../../Components/priceFilters/PriceFilter', () => () => <div>PriceFilter</div>);

describe('Home Component Unit Tests', () => {
  const mockDispatch = jest.fn();
  const mockFilteredProducts = [
    { id: 1, title: 'Product A' },
    { id: 2, title: 'Product B' },
    { id: 3, title: 'Product C' }
  ];

  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockImplementation((selectorFn) =>
      selectorFn({
        product: {
          products: mockFilteredProducts,
          loading: false,
          error: null
        }
      })
    );
    productSlice.selectFilteredProducts.mockReturnValue(mockFilteredProducts);
    jest.spyOn(utils, 'setupInfiniteScroll').mockReturnValue(mockFilteredProducts);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('dispatches fetchProducts on mount', () => {
    mount(<Home />);
    expect(mockDispatch).toHaveBeenCalled();
    expect(productSlice.fetchProducts).toHaveBeenCalled();
  });

  it('calls selectFilteredProducts and setupInfiniteScroll', () => {
    shallow(<Home />);
    expect(productSlice.selectFilteredProducts).toHaveBeenCalled();
    expect(utils.setupInfiniteScroll).toHaveBeenCalledWith(mockFilteredProducts, 6, 3);
  });

  it('uses useSelector to get product loading, error and products', () => {
    shallow(<Home />);
    expect(useSelector).toHaveBeenCalled();
  });

  it('should not render "Loading more products" if visibleProducts.length === filteredProducts.length', () => {
    utils.setupInfiniteScroll.mockReturnValue(mockFilteredProducts); 
    productSlice.selectFilteredProducts.mockReturnValue(mockFilteredProducts); 

    const wrapper = shallow(<Home />);
    expect(wrapper.text()).not.toContain('⏳ Loading more products...');
  });
});
