import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUser,
  updateUserInfo,
  changePassword,
} from "../../redux/AccountSlice";
import { toast } from "react-toastify";

const MyAccount = () => {
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.account);
  const [personalInfo, setPersonalInfo] = useState({ name: "", email: "", phone: "" });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.id) {
      dispatch(fetchUser(storedUser.id));
    }
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setPersonalInfo({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateInfo = async (e) => {
    e.preventDefault();
    if (!user) return;
    await dispatch(updateUserInfo({ id: user.id, data: personalInfo }));
    toast.success("Profile updated successfully.");
    setPersonalInfo({ name: "", email: "", phone: "" });
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!user) return;
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const res = await dispatch(
      changePassword({ id: user.id, currentPassword, newPassword })
    );

    if (res.error) {
      alert(res.payload);
    } else {
      toast.success("Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  if (status === 'loading') {
    return <p className="text-center text-lg mt-10 text-gray-600" data-testid="loading-text">Loading account details...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" data-testid="my-account-page">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6" data-testid="account-title">
          My Account
        </h1>

        {/* Personal Info Form */}
        <form
          onSubmit={handleUpdateInfo}
          className="mb-10"
          data-testid="personal-info-form"
        >
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600">Name</label>
              <input
                type="text"
                name="name"
                value={personalInfo.name}
                onChange={handlePersonalInfoChange}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                data-testid="input-name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={personalInfo.email}
                onChange={handlePersonalInfoChange}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                data-testid="input-email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Phone</label>
              <input
                type="text"
                name="phone"
                value={personalInfo.phone}
                onChange={handlePersonalInfoChange}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                data-testid="input-phone"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 bg-red-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-red-700 transition duration-200"
            data-testid="update-info-btn"
          >
            Update Info
          </button>
        </form>

        
        <form
          onSubmit={handlePasswordChange}
          data-testid="change-password-form"
        >
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Change Password
          </h2>
          <div className="grid gap-4">
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required
              data-testid="input-current-password"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required
              data-testid="input-new-password"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required
              data-testid="input-confirm-password"
            />
          </div>
          <button
            type="submit"
            className="mt-6 bg-red-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-red-700 transition duration-200"
            data-testid="change-password-btn"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyAccount;
