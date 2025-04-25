import React, { useState } from "react";
import { validateContactForm } from "../../utils/Validation";

const HelpSupport = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateContactForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitted(false);
      return;
    }
    setSubmitted(true);
    setErrors({});
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">Help & Support</h1>

        {/* Support Categories */}
        <section className="mb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm text-center">
            <h3 className="font-semibold text-gray-700 mb-2">Shipping & Delivery</h3>
            <p className="text-sm text-gray-600">Track your package, check delivery times, and more.</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm text-center">
            <h3 className="font-semibold text-gray-700 mb-2">Returns & Refunds</h3>
            <p className="text-sm text-gray-600">Learn how to return products and get refunds quickly.</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm text-center">
            <h3 className="font-semibold text-gray-700 mb-2">Payment & Billing</h3>
            <p className="text-sm text-gray-600">Billing issues, accepted payment methods, invoices.</p>
          </div>
        </section>

        {/* Contact Info */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h2>
          <p className="text-gray-700 text-sm mb-1">📞 Customer Care: <strong>+91 98765 43210</strong></p>
          <p className="text-gray-700 text-sm mb-1">✉️ Email: <strong>support@shopexpress.com</strong></p>
          <p className="text-gray-700 text-sm mb-1">🕒 Support Hours: Mon - Sat (10 AM - 6 PM)</p>
          <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
            className="inline-block mt-4 text-white bg-green-500 px-4 py-2 rounded hover:bg-green-600 transition">
            Chat on WhatsApp
          </a>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            <details className="bg-gray-100 p-4 rounded">
              <summary className="font-medium cursor-pointer">How long does delivery take?</summary>
              <p className="text-sm text-gray-600 mt-2">Standard delivery usually takes 3–5 business days.</p>
            </details>
            <details className="bg-gray-100 p-4 rounded">
              <summary className="font-medium cursor-pointer">Can I change my shipping address after placing an order?</summary>
              <p className="text-sm text-gray-600 mt-2">You can update your address within 2 hours of placing the order.</p>
            </details>
            <details className="bg-gray-100 p-4 rounded">
              <summary className="font-medium cursor-pointer">Where do I find my invoice?</summary>
              <p className="text-sm text-gray-600 mt-2">Invoices are available in the 'My Orders' section of your account.</p>
            </details>
          </div>
        </section>

        {/* Contact Form */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Still Need Help?</h2>
          {submitted && <p className="text-green-600 text-sm mb-4">Thanks! We'll get back to you shortly.</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-400 focus:border-red-400"
                placeholder="Your Name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-400 focus:border-red-400"
                placeholder="you@example.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                id="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-400 focus:border-red-400"
                placeholder="How can we help you?"
              ></textarea>
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
            >
              Submit
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default HelpSupport;
