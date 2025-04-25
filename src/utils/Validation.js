// Registration form validatoion

export const validateRegisterForm = ({ name, email, password }) => {
    if (!name.trim()) {
      return 'Name is required';
    }
  
    if (!email.trim()) {
      return 'Email is required';
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Invalid email format';
    }
  
    if (!password) {
      return 'Password is required';
    }
  
    if (password.length < 6) {
      return 'Password must be at least 6 characters long';
    }
  
    return '';
  };
    // Login form validation

  export const validateLoginForm = ({ email, password }) => {
    if (!email.trim()) {
      return 'Email is required';
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Invalid email format';
    }
  
    if (!password) {
      return 'Password is required';
    }
  
    return '';
  };
  
  // contact form validation
  export const validateContactForm = (formData) => {
    const errors = {};
  
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
  
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      errors.email = 'Invalid email address';
    }
  
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    }
  
    return errors;
  };
  
  // Checkout form validation
  export const validateCheckoutForm = (billingInfo, shippingInfo, paymentMethod) => {
    const validationErrors = {};
  
    // Validate billing info
    if (!billingInfo.name) validationErrors.name = "Billing name is required.";
    if (!billingInfo.email) validationErrors.email = "Billing email is required.";
    if (!billingInfo.phone) validationErrors.phone = "Billing phone is required.";
  
    // Validate shipping info
    if (!shippingInfo.address) validationErrors.address = "Shipping address is required.";
    if (!shippingInfo.city) validationErrors.city = "Shipping city is required.";
    if (!shippingInfo.zip) validationErrors.zip = "Shipping zip code is required.";
  
    // Validate payment method
    if (!paymentMethod) validationErrors.paymentMethod = "Payment method is required.";
  
    return validationErrors;
  };
  