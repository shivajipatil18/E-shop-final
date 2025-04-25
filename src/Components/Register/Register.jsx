import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { validateRegisterForm } from '../../utils/Validation';

const Register = ({ closeModal, updateLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState('');

  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const errorMessage = validateRegisterForm({ name, email, password });
    if (errorMessage) {
      setValidationError(errorMessage);
      return;
    }

    setValidationError('');
    const result = await dispatch(register({ name, email, password }));

    if (result.meta.requestStatus === 'fulfilled') {
      updateLogin(true);
      // closeModal();
      // navigate('/dashboard');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleRegister}>
        <form>
        <div className="mb-4">
          <label htmlFor="Name" className="block text-gray-700">Name</label>
          <input
            type="text"
            id="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border"
            placeholder="Enter Name" 
          />
        </div>
        <div className="mb-4">
          <label htmlFor="Email" className="block text-gray-700">Email</label>
          <input
            type="email"
            id="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border"
            placeholder="Enter email"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full px-3 py-2 border"
          />
        </div>
        </form>
        {validationError && <p className="text-red-600">{validationError}</p>}
        {status === 'loading' && <p>Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}
        <div className="mb-4">
          <button type="submit" className="w-full bg-red-600 text-white py-2">
            Register
          </button>
        </div>
        <span className="text-gray-700"> Alraeady Have Account Please Login!! </span>
        <button className="text-red-800" onClick={updateLogin}> 
          Login
        </button>
      </form>
    </div>
  );
};

export default Register;
