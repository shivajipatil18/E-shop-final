import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { setupInfiniteScroll } from "./Utils"; 

const TestComponent = ({ data }) => {
  const visibleData = setupInfiniteScroll(data);
  return (
    <ul>
      {visibleData.map((item, index) => (
        <li key={index} data-testid="item">{item}</li>
      ))}
    </ul>
  );
};

describe("setupInfiniteScroll hook", () => {
  const data = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);

  let wrapper;

  beforeEach(() => {
    wrapper = mount(<TestComponent data={data} />);
  });

  it("initially renders 6 items", () => {
    expect(wrapper.find('[data-testid="item"]').length).toBe(6);
  });

  it("loads more items on scroll", () => {
    
    Object.defineProperty(document.documentElement, "scrollTop", {
      value: 1000,
      writable: true,
    });
    Object.defineProperty(document.documentElement, "clientHeight", {
      value: 1000,
      writable: true,
    });
    Object.defineProperty(document.documentElement, "scrollHeight", {
      value: 2000,
      writable: true,
    });

    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    wrapper.update();

    // After one scroll, we expect 6 + 3 = 9 items
    expect(wrapper.find('[data-testid="item"]').length).toBe(9);
  });

  it("cleans up scroll event listener on unmount", () => {
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");
    wrapper.unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function)
    );
  });
});
