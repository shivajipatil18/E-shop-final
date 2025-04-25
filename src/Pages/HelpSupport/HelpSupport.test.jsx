import React from 'react';
import { shallow, mount } from 'enzyme';
import HelpSupport from "../../Pages/HelpSupport/HelpSupport";
import * as Validation from '../../utils/Validation';

describe('HelpSupport Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<HelpSupport />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('renders without crashing and shows the main headings', () => {
    expect(wrapper.find('h1').text()).toContain('Help & Support');
    expect(wrapper.find('h2').at(0).text()).toContain('Contact Information');
    expect(wrapper.find('h2').at(1).text()).toContain('Frequently Asked Questions');
    expect(wrapper.find('h2').at(2).text()).toContain('Still Need Help?');
  });

  it('initially has empty form fields', () => {
    expect(wrapper.find('input#name').props().value).toBe('');
    expect(wrapper.find('input#email').props().value).toBe('');
    expect(wrapper.find('textarea#message').props().value).toBe('');
  });

  it('updates form state on input change', () => {
    wrapper.find('input#name').simulate('change', { target: { id: 'name', value: 'John Doe' } });
    wrapper.find('input#email').simulate('change', { target: { id: 'email', value: 'john@example.com' } });
    wrapper.find('textarea#message').simulate('change', { target: { id: 'message', value: 'Help me!' } });

    expect(wrapper.find('input#name').props().value).toBe('John Doe');
    expect(wrapper.find('input#email').props().value).toBe('john@example.com');
    expect(wrapper.find('textarea#message').props().value).toBe('Help me!');
  });

  it('shows validation errors when fields are empty', () => {
    const mockValidate = jest.spyOn(Validation, 'validateContactForm').mockReturnValue({
      name: 'Name is required',
      email: 'Email is required',
      message: 'Message is required',
    });

    wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

    expect(mockValidate).toHaveBeenCalled();
    expect(wrapper.text()).toContain('Name is required');
    expect(wrapper.text()).toContain('Email is required');
    expect(wrapper.text()).toContain('Message is required');
    expect(wrapper.find('p.text-green-600').exists()).toBe(false);
  });

  it('submits successfully when validation passes and resets form', () => {
    const mockValidate = jest.spyOn(Validation, 'validateContactForm').mockReturnValue({});

    wrapper.find('input#name').simulate('change', { target: { id: 'name', value: 'Alice' } });
    wrapper.find('input#email').simulate('change', { target: { id: 'email', value: 'alice@example.com' } });
    wrapper.find('textarea#message').simulate('change', { target: { id: 'message', value: 'Need help' } });

    wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

    expect(wrapper.find('input#name').props().value).toBe('');
    expect(wrapper.find('input#email').props().value).toBe('');
    expect(wrapper.find('textarea#message').props().value).toBe('');
    expect(wrapper.text()).toContain("Thanks! We'll get back to you shortly.");
  });

  it('renders FAQ sections correctly', () => {
    expect(wrapper.find('details').length).toBe(3);
    expect(wrapper.find('summary').at(0).text()).toContain('How long does delivery take?');
  });

  it('renders support categories', () => {
    expect(wrapper.find('section').at(0).find('div').length).toBeGreaterThan(2);
    expect(wrapper.text()).toContain('Shipping & Delivery');
    expect(wrapper.text()).toContain('Returns & Refunds');
    expect(wrapper.text()).toContain('Payment & Billing');
  });

  it('renders WhatsApp contact link with correct href', () => {
    const whatsappLink = wrapper.find('a[href^="https://wa.me"]');
    expect(whatsappLink.exists()).toBe(true);
    expect(whatsappLink.prop('href')).toContain('https://wa.me/919876543210');
  });
});
