import React ,{useState} from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  return (
    <footer className="bg-gray-900 text-white w-full">

      <div className="max-w-screen-2xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
      
        <div>
          <h3 className="text-3xl font-bold text-red-500">e-shop</h3>
          <p className="mt-4 text-sm text-gray-300 leading-relaxed">
            Your one-stop destination for all your needs. Shop smart, shop easy with e-shop.
          </p>
        </div>

      
        <div>
          <h4 className="text-xl font-semibold mb-4 text-red-400">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link to="/" className="hover:text-red-400 transition duration-300">Home</Link>
            </li>
            <li>
              <Link to="/shop" className="hover:text-red-400 transition duration-300">Shop</Link>
            </li>
          
          
            <li>
            <Link to="/support" className="hover:text-red-600 hover:underline underline-offset-4">
  Help & Support
</Link>
            </li>
          </ul>
        </div>

        
        <div>
          <h4 className="text-xl font-semibold mb-4 text-red-400">Follow Us</h4>
          <div className="flex space-x-4 text-2xl">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition duration-300">
              <FaFacebook />
            </  a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition duration-300">
              <FaLinkedin />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition duration-300">
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition duration-300">
              <FaInstagram />
            </a>
          </div>

        
          <form className="flex items-center mt-6">
            <input
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email} 
              className="w-full p-2 rounded-l-lg bg-gray-800 text-sm text-white border border-gray-700 placeholder-gray-400 focus:outline-none"
            />
            <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-r-lg transition duration-300">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-800 py-4">
        <div className="max-w-screen-2xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {currentYear} e-shop. All rights reserved.</p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-white transition duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-white transition duration-300">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
