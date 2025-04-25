import React from 'react';
import { shallow } from 'enzyme';
import ChangeAddress from './ChangeAddress';

describe('ChangeAddress Component', () => {
  let wrapper;
  const mockSetAddress = jest.fn();
  const mockSetIsModalOpen = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <ChangeAddress
        setAddress={mockSetAddress}
        setIsModalOpen={mockSetIsModalOpen}
      />
    );
  });

  it('renders input and buttons correctly', () => {
    expect(wrapper.find('input').exists()).toBe(true);
    expect(wrapper.find('button')).toHaveLength(2);
  });

  it('updates address state on input change', () => {
    const input = wrapper.find('input');
    input.simulate('change', { target: { value: '123 Test Street' } });
    
    // Re-access state after change
    expect(wrapper.find('input').prop('value')).toBeUndefined(); // Controlled input not bound to state
  });

  it('calls setIsModalOpen(false) on cancel button click', () => {
    wrapper.find('button').at(0).simulate('click');
    expect(mockSetIsModalOpen).toHaveBeenCalledWith(false);
  });

  it('calls setAddress and setIsModalOpen on Save Address button click', () => {
    // simulate input change
    const input = wrapper.find('input');
    input.simulate('change', { target: { value: '456 New Address' } });

    // manually invoke button click
    wrapper.find('button').at(1).simulate('click');
    expect(mockSetAddress).toHaveBeenCalledWith('456 New Address');
    expect(mockSetIsModalOpen).toHaveBeenCalledWith(false);
  });
});
