

const RazorpayButton = () => {
  const loadRazorpay = () => {
    const options = {
      key: "rzp_test_ABC1234567890Z", 
      amount: 50000, 
      currency: "INR",
      name: "My Store",
      description: "Test Payment",
      image: "https://yourlogo.png",
      handler: function (response) {
        alert("Payment successful! ID: " + response.razorpay_payment_id);
      },
      prefill: {
        name: "John Doe",
        email: "john@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "123, Test Street",
      },
      theme: {
        color: "#F37254",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <button onClick={loadRazorpay} className="bg-green-500 text-white p-2">
      Pay ₹500
    </button>
  );
};

export default RazorpayButton;

