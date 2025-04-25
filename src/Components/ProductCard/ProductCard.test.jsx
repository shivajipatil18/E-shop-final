import React from 'react';
import { mount } from 'enzyme';
import ProductCard from './ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { MemoryRouter } from 'react-router-dom';
import { addToCart } from '../../redux/CartSlice';
import { FaStar } from 'react-icons/fa';

// Mocks
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    info: jest.fn(),
  },
}));

jest.mock('../../redux/CartSlice', () => ({
  addToCart: jest.fn(),
}));

describe('ProductCard Component', () => {
  const mockDispatch = jest.fn();

  const sampleProduct = {
    id: 1,
    title: 'Test Product',
    price: 1999,
    image: 'https://via.placeholder.com/150',
    rating: {
      rate: 4.2,
      count: 75,
    },
  };

  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockImplementation((callback) =>
      callback({
        cart: {
          products: [],
        },
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Unit Tests
  it('renders product image, title, price, and rating', () => {
    const wrapper = mount(
      <MemoryRouter>
        <ProductCard product={sampleProduct} />
      </MemoryRouter>
    );

    expect(wrapper.find('img').prop('src')).toBe(sampleProduct.image);
    expect(wrapper.text()).toContain(sampleProduct.title);
    expect(wrapper.text()).toContain(sampleProduct.price.toString());
    expect(wrapper.text()).toContain(`(${sampleProduct.rating.count})`);
  });

  it('renders 5 stars with correct highlighted count', () => {
    const wrapper = mount(
      <MemoryRouter>
        <ProductCard product={sampleProduct} />
      </MemoryRouter>
    );

    const starIcons = wrapper.find(FaStar);

    expect(starIcons.length).toBe(5);

    const filledStars = starIcons.filterWhere((node) =>
      node.prop('className')?.includes('text-yellow-500')
    );
    const emptyStars = starIcons.filterWhere((node) =>
      node.prop('className')?.includes('text-gray-300')
    );

    expect(filledStars.length).toBe(Math.round(sampleProduct.rating.rate));
    expect(filledStars.length + emptyStars.length).toBe(5);
  });

  it('dispatches addToCart and shows success toast if product not in cart', () => {
    const wrapper = mount(
      <MemoryRouter>
        <ProductCard product={sampleProduct} />
      </MemoryRouter>
    );

    wrapper.find('button').simulate('click', {
      stopPropagation: jest.fn(),
      preventDefault: jest.fn(),
    });

    expect(mockDispatch).toHaveBeenCalledWith(addToCart(sampleProduct));
    expect(toast.success).toHaveBeenCalledWith('Product added to cart');
  });

  it('dispatches addToCart and shows info toast if product is already in cart', () => {
    useSelector.mockImplementation((callback) =>
      callback({
        cart: {
          products: [{ id: 1 }],
        },
      })
    );

    const wrapper = mount(
      <MemoryRouter>
        <ProductCard product={sampleProduct} />
      </MemoryRouter>
    );

    wrapper.find('button').simulate('click', {
      stopPropagation: jest.fn(),
      preventDefault: jest.fn(),
    });

    expect(mockDispatch).toHaveBeenCalledWith(addToCart(sampleProduct));
    expect(toast.info).toHaveBeenCalledWith('Same item is added again');
  });

  it('navigates to product detail page on card click', () => {
    const wrapper = mount(
      <MemoryRouter>
        <ProductCard product={sampleProduct} />
      </MemoryRouter>
    );

    const link = wrapper.find('a');
    expect(link.prop('href')).toBe(`/product/${sampleProduct.id}`);
  });



  // Integration Tests
  it('adds product to cart and routes correctly when card is clicked', () => {
    const wrapper = mount(
      <MemoryRouter>
        <ProductCard product={sampleProduct} />
      </MemoryRouter>
    );

    const cardLink = wrapper.find('a');
    expect(cardLink.prop('href')).toBe(`/product/${sampleProduct.id}`);

    cardLink.simulate('click', {
      stopPropagation: jest.fn(),
      preventDefault: jest.fn(),
    });

    wrapper.find('button').simulate('click', {
      stopPropagation: jest.fn(),
      preventDefault: jest.fn(),
    });

    expect(mockDispatch).toHaveBeenCalledWith(addToCart(sampleProduct));
    expect(toast.success).toHaveBeenCalledWith('Product added to cart');
  });

  it('prevents default and stops propagation when Add to Cart is clicked', () => {
    const stopPropagation = jest.fn();
    const preventDefault = jest.fn();

    const wrapper = mount(
      <MemoryRouter>
        <ProductCard product={sampleProduct} />
      </MemoryRouter>
    );

    wrapper.find('button').simulate('click', {
      stopPropagation,
      preventDefault,
    });

    expect(stopPropagation).toHaveBeenCalled();
    expect(preventDefault).toHaveBeenCalled();
  });

  it('handles missing rating gracefully by falling back to 4 stars and 100 reviews', () => {
    const productWithoutRating = {
      ...sampleProduct,
      rating: undefined,
    };

    const wrapper = mount(
      <MemoryRouter>
        <ProductCard product={productWithoutRating} />
      </MemoryRouter>
    );

    const stars = wrapper.find(FaStar);
    const filledStars = stars.filterWhere((node) =>
      node.prop('className')?.includes('text-yellow-500')
    );

    expect(stars.length).toBe(5);
    expect(filledStars.length).toBe(4); 
    expect(wrapper.text()).toContain('(100)');
  });
});
