import React from "react";
import { shallow, mount } from "enzyme";
import Footer from "../Footer/Footer"; 
import { MemoryRouter } from "react-router-dom";

describe("Footer Component", () => {
  // ✅ Snapshot Test
//   it("matches snapshot", () => {
//     const tree = renderer
//       .create(
//         <MemoryRouter>
//           <Footer />
//         </MemoryRouter>
//       )
//       .toJSON();
//     expect(tree).toMatchSnapshot();
//   });

  // ✅ Renders the brand text and static content
  it("renders the brand and static sections correctly", () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find("footer").exists()).toBe(true);
    expect(wrapper.find("h3").text()).toBe("e-shop");
    expect(wrapper.find("p").at(0).text()).toContain("Your one-stop destination");
  });

  // ✅ Links render correctly
  it("contains quick navigation links", () => {
    const wrapper = mount(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(wrapper.find('Link[to="/"]').text()).toBe("Home");
    expect(wrapper.find('Link[to="/shop"]').text()).toBe("Shop");
    expect(wrapper.find('Link[to="/support"]').text()).toBe("Help & Support");
  });

  
  it("renders social media icons with correct hrefs", () => {
    const wrapper = mount(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(wrapper.find('a[href="https://www.facebook.com/"]').exists()).toBe(true);
    expect(wrapper.find('a[href="https://www.linkedin.com/"]').exists()).toBe(true);
    expect(wrapper.find('a[href="https://twitter.com/"]').exists()).toBe(true);
    expect(wrapper.find('a[href="https://www.instagram.com/"]').exists()).toBe(true);
  });

  
  it("should allow typing into the email input", () => {
    const wrapper = mount(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const input = wrapper.find('input[type="email"]');
    input.simulate("change", { target: { value: "test@example.com" } });
    expect(wrapper.find('input[type="email"]').prop("value")).toBe("test@example.com");
  });
  it("shows current year in copyright", () => {
    const wrapper = mount(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    const year = new Date().getFullYear();
    expect(wrapper.text()).toContain(`© ${year} e-shop. All rights reserved.`);
  });

  
  it("renders privacy and terms links", () => {
    const wrapper = mount(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(wrapper.text()).toContain("Privacy Policy");
    expect(wrapper.text()).toContain("Terms & Conditions");
  });
});
