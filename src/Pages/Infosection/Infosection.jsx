import React from "react";
import {
  FaShippingFast,
  FaDollarSign,
  FaHeadphonesAlt,
  FaLock,
} from "react-icons/fa";

const Infosection = () => {
  const infoItems = [
    {
      icon: <FaShippingFast className="text-5xl text-red-500 mb-4" />,
      title: "Free Shipping",
      description: "Enjoy free shipping on all orders with no minimum.",
    },
    {
      icon: <FaDollarSign className="text-5xl text-red-500 mb-4" />,
      title: "Money Back Guarantee",
      description: "Not satisfied? Get a full refund within 30 days.",
    },
    {
      icon: <FaHeadphonesAlt className="text-5xl text-red-500 mb-4" />,
      title: "24/7 Support",
      description: "Our team is here to help you anytime, day or night.",
    },
    {
      icon: <FaLock className="text-5xl text-red-500 mb-4" />,
      title: "Secure Payment",
      description: "Your transactions are 100% safe and encrypted.",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-red-50 via-white to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4">
          Why Shop With Us?
        </h2>
        <p className="text-gray-500 text-md max-w-xl mx-auto">
          We go the extra mile to bring value, safety, and support with every order.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {infoItems.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-8 text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="flex justify-center">{item.icon}</div>
            <h3 className="text-xl font-bold text-gray-800 mt-4">{item.title}</h3>
            <p className="text-gray-600 mt-3 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Infosection;
