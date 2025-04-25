import {
    validateRegisterForm,
    validateLoginForm,
    validateContactForm,
    validateCheckoutForm,
  } from "./Validation"; 
  
  describe("validateRegisterForm", () => {
    it("returns error if name is missing", () => {
      const result = validateRegisterForm({ name: "", email: "test@example.com", password: "123456" });
      expect(result).toBe("Name is required");
    });
  
    it("returns error if email is missing", () => {
      const result = validateRegisterForm({ name: "John", email: "", password: "123456" });
      expect(result).toBe("Email is required");
    });
    it("returns error if billing email is missing", () => {
        const billingInfo = {
          name: "John",
          email: "", // Missing email
          phone: "1234567890",
        };
      
        const shippingInfo = {
          address: "123 Main St",
          city: "Townsville",
          zip: "12345",
        };
      
        const paymentMethod = "Card";
      
        const result = validateCheckoutForm(billingInfo, shippingInfo, paymentMethod);
        expect(result.email).toBe("Billing email is required.");
      });
      
      it("returns error if billing phone is missing", () => {
        const billingInfo = {
          name: "John Doe",
          email: "john@example.com",
          phone: "", // Missing phone
        };
      
        const shippingInfo = {
          address: "123 Elm Street",
          city: "Gotham",
          zip: "10001",
        };
      
        const paymentMethod = "Credit Card";
      
        const result = validateCheckoutForm(billingInfo, shippingInfo, paymentMethod);
        expect(result.phone).toBe("Billing phone is required.");
      });
      it("returns error if shipping city is missing", () => {
        const billingInfo = {
          name: "John Doe",
          email: "john@example.com",
          phone: "1234567890",
        };
      
        const shippingInfo = {
          address: "123 Elm Street",
          city: "", // Missing city
          zip: "10001",
        };
      
        const paymentMethod = "Credit Card";
      
        const result = validateCheckoutForm(billingInfo, shippingInfo, paymentMethod);
        expect(result.city).toBe("Shipping city is required.");
      });
      
      it("returns error if shipping zip code is missing", () => {
        const billingInfo = {
          name: "John Doe",
          email: "john@example.com",
          phone: "1234567890",
        };
      
        const shippingInfo = {
          address: "123 Elm Street",
          city: "Gotham",
          zip: "", // Missing zip code
        };
      
        const paymentMethod = "Credit Card";
      
        const result = validateCheckoutForm(billingInfo, shippingInfo, paymentMethod);
        expect(result.zip).toBe("Shipping zip code is required.");
      });
      
    it("returns error if email format is invalid", () => {
      const result = validateRegisterForm({ name: "John", email: "invalid-email", password: "123456" });
      expect(result).toBe("Invalid email format");
    });
  
    it("returns error if password is missing", () => {
      const result = validateRegisterForm({ name: "John", email: "test@example.com", password: "" });
      expect(result).toBe("Password is required");
    });
  
    it("returns error if password is too short", () => {
      const result = validateRegisterForm({ name: "John", email: "test@example.com", password: "123" });
      expect(result).toBe("Password must be at least 6 characters long");
    });
  
    it("returns empty string if all fields are valid", () => {
      const result = validateRegisterForm({ name: "John", email: "test@example.com", password: "123456" });
      expect(result).toBe("");
    });
  });
  
  describe("validateLoginForm", () => {
    it("returns error if email is missing", () => {
      const result = validateLoginForm({ email: "", password: "123456" });
      expect(result).toBe("Email is required");
    });
  
    it("returns error if email format is invalid", () => {
      const result = validateLoginForm({ email: "bad@", password: "123456" });
      expect(result).toBe("Invalid email format");
    });
  
    it("returns error if password is missing", () => {
      const result = validateLoginForm({ email: "test@example.com", password: "" });
      expect(result).toBe("Password is required");
    });
  
    it("returns empty string if all fields are valid", () => {
      const result = validateLoginForm({ email: "test@example.com", password: "123456" });
      expect(result).toBe("");
    });
  });
  
  describe("validateContactForm", () => {
    it("returns error if name is missing", () => {
      const result = validateContactForm({ name: "", email: "test@example.com", message: "Hello" });
      expect(result.name).toBe("Name is required");
    });
  
    it("returns error if email is missing", () => {
      const result = validateContactForm({ name: "John", email: "", message: "Hello" });
      expect(result.email).toBe("Email is required");
    });
  
    it("returns error if email format is invalid", () => {
      const result = validateContactForm({ name: "John", email: "wrong@", message: "Hello" });
      expect(result.email).toBe("Invalid email address");
    });
  
    it("returns error if message is missing", () => {
      const result = validateContactForm({ name: "John", email: "test@example.com", message: "" });
      expect(result.message).toBe("Message is required");
    });
  
    it("returns no errors if all fields are valid", () => {
      const result = validateContactForm({ name: "John", email: "test@example.com", message: "Hello" });
      expect(result).toEqual({});
    });
  });
  
  describe("validateCheckoutForm", () => {
    const validBilling = { name: "John", email: "john@example.com", phone: "1234567890" };
    const validShipping = { address: "123 Main St", city: "Townsville", zip: "12345" };
  
    it("returns error if billing name is missing", () => {
      const result = validateCheckoutForm({ ...validBilling, name: "" }, validShipping, "Card");
      expect(result.name).toBe("Billing name is required.");
    });
  
    it("returns error if shipping address is missing", () => {
      const result = validateCheckoutForm(validBilling, { ...validShipping, address: "" }, "Card");
      expect(result.address).toBe("Shipping address is required.");
    });
  
    it("returns error if payment method is missing", () => {
      const result = validateCheckoutForm(validBilling, validShipping, "");
      expect(result.paymentMethod).toBe("Payment method is required.");
    });
  
    it("returns no errors if all fields are valid", () => {
      const result = validateCheckoutForm(validBilling, validShipping, "Card");
      expect(result).toEqual({});
    });
  });
  