import React from 'react';
import { shallow } from 'enzyme';
import Infosection from './Infosection';

describe('Infosection Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Infosection />);
  });

  it('renders the component without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the title heading', () => {
    const title = wrapper.find('h2');
    expect(title.text()).toBe('Why Shop With Us?');
  });

  it('renders the subtitle paragraph', () => {
    const subtitle = wrapper.find('p').first();
    expect(subtitle.text()).toContain('We go the extra mile');
  });

  it('renders exactly 4 info cards', () => {
    const infoCards = wrapper.find('div').filterWhere((node) =>
      node.hasClass('bg-white')
    );
    expect(infoCards.length).toBe(4);
  });

  it('renders correct titles in info cards', () => {
    const expectedTitles = [
      'Free Shipping',
      'Money Back Guarantee',
      '24/7 Support',
      'Secure Payment',
    ];

    expectedTitles.forEach((title) => {
      expect(wrapper.text()).toContain(title);
    });
  });

  it('renders correct descriptions in info cards', () => {
    const expectedDescriptions = [
      'Enjoy free shipping on all orders with no minimum.',
      'Not satisfied? Get a full refund within 30 days.',
      'Our team is here to help you anytime, day or night.',
      'Your transactions are 100% safe and encrypted.',
    ];

    expectedDescriptions.forEach((desc) => {
      expect(wrapper.text()).toContain(desc);
    });
  });
});
