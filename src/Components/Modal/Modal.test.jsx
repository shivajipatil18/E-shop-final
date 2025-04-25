import React from 'react';
import { shallow } from 'enzyme';
import Modal from './Modal'; 

describe('Modal Component', () => {
  let wrapper;
  const mockSetIsModalOpen = jest.fn();

  const renderComponent = (isModalOpen = true, children = <div>Modal Content</div>) => {
    return shallow(
      <Modal isModalOpen={isModalOpen} setIsModalOpen={mockSetIsModalOpen}>
        {children}
      </Modal>
    );
  };

  beforeEach(() => {
    mockSetIsModalOpen.mockClear();
  });

  it('should not render when isModalOpen is false', () => {
    wrapper = renderComponent(false);
    expect(wrapper.type()).toBeNull();
  });

  it('should render modal with children when isModalOpen is true', () => {
    wrapper = renderComponent(true);
    expect(wrapper.find('.bg-white.rounded-lg.shadow-lg.p-6').exists()).toBe(true);
    expect(wrapper.contains(<div>Modal Content</div>)).toBe(true);
  });

  it('should call setIsModalOpen(false) on close button click', () => {
    wrapper = renderComponent(true);
    const closeButton = wrapper.find('button');
    closeButton.simulate('click');
    expect(mockSetIsModalOpen).toHaveBeenCalledWith(false);
  });
});
