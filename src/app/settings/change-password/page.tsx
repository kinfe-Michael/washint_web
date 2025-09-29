"use client"
import { useState, ChangeEvent, FormEvent } from "react";
import axios from 'axios';
import { api } from "@/lib/utils";

/**
 * A reusable form input component.
 */
interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
}

const FormInput: React.FC<FormInputProps> = ({ id, label, type = 'text', value, onChange, placeholder, error }) => (
  <div className="mb-6">
    <label htmlFor={id} className="block text-zinc-400 text-sm font-semibold mb-2">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`
        w-full p-3 rounded-lg bg-zinc-800 text-zinc-200 border-2
        focus:outline-none transition-colors duration-200
        ${error ? 'border-red-500' : 'border-zinc-700 focus:border-white'}
      `}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

/**
 * Main application component for the change password page.
 */
const App: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' | null }>({ text: '', type: null });

  // Set axios to send credentials with requests
  

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === "currentPassword") {
      setCurrentPassword(value);
    } else if (id === "newPassword") {
      setNewPassword(value);
    } else if (id === "confirmNewPassword") {
      setConfirmNewPassword(value);
    }
    // Clear the error for the changed field and any previous status message
    setErrors(prevErrors => ({ ...prevErrors, [id]: "" }));
    setStatusMessage({ text: '', type: null });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!currentPassword.trim()) {
      newErrors.currentPassword = "Current password is required.";
    }
    if (newPassword.length < 8) {
      newErrors.newPassword = "New password must be at least 8 characters.";
    }
    if (newPassword !== confirmNewPassword) {
      newErrors.confirmNewPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) {
      setStatusMessage({ text: "Please correct the form errors.", type: 'error' });
      return;
    }

    setIsSubmitting(true);
    setStatusMessage({ text: '', type: null });

    try {
      const response = await api.put('/change-password/', {
        currentPassword,
        newPassword
      });
      console.log(response)

      if (response.status === 200) {
        setStatusMessage({ text: "Password changed successfully!", type: 'success' });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      } else {
        setStatusMessage({ text: response.data.message || "An error occurred.", type: 'error' });
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setStatusMessage({ text: err.response.data.message || "An error occurred. Please try again.", type: 'error' });
      } else {
        setStatusMessage({ text: "An error occurred. Please check your network connection.", type: 'error' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-4 text-white font-inter">
      <div className="bg-zinc-800 rounded-2xl shadow-xl p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">Change Password</h1>
        
        {/* Status message display */}
        {statusMessage.text && (
          <div className={`p-4 mb-6 rounded-lg text-center ${statusMessage.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {statusMessage.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <FormInput
            id="currentPassword"
            label="Current Password"
            type="password"
            value={currentPassword}
            onChange={handleInputChange}
            error={errors.currentPassword}
            placeholder="Enter your current password"
          />
          <FormInput
            id="newPassword"
            label="New Password"
            type="password"
            value={newPassword}
            onChange={handleInputChange}
            error={errors.newPassword}
            placeholder="Enter your new password"
          />
          <FormInput
            id="confirmNewPassword"
            label="Confirm New Password"
            type="password"
            value={confirmNewPassword}
            onChange={handleInputChange}
            error={errors.confirmNewPassword}
            placeholder="Confirm your new password"
          />
          <button
            type="submit"
            className={`
              w-full py-3 px-6 rounded-lg font-semibold text-lg transition-colors duration-300
              ${isSubmitting ? 'bg-zinc-600 text-zinc-400 cursor-not-allowed' : 'bg-red-700 text-white hover:bg-red-800'}
            `}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Changing..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
