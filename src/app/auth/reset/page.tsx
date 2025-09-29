"use client"
import { useState, ChangeEvent, FormEvent } from "react";
import axios from 'axios';


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


const App: React.FC = () => {
  const [step, setStep] = useState<'request_otp' | 'reset_password'>('request_otp');
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' | null }>({ text: '', type: null });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  axios.defaults.withCredentials = true;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === "email") {
      setEmail(value);
    } else if (id === "otp") {
      setOtp(value);
    } else if (id === "newPassword") {
      setNewPassword(value);
    } else if (id === "confirmNewPassword") {
      setConfirmNewPassword(value);
    }
    setErrors(prevErrors => ({ ...prevErrors, [id]: "" }));
    setStatusMessage({ text: '', type: null });
  };

  const validateRequestOtp = () => {
    const newErrors: { [key: string]: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateResetPassword = () => {
    const newErrors: { [key: string]: string } = {};
    if (!otp.trim()) {
      newErrors.otp = "OTP is required.";
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

  const handleRequestOtp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateRequestOtp()) {
      setStatusMessage({ text: "Please enter a valid email.", type: 'error' });
      return;
    }
    setIsSubmitting(true);
    try {
    const response =  await axios.post('http://localhost:8000/api/request-otp', { email });
      setStatusMessage({ text: "An OTP has been sent to your email.", type: 'success' });
      setStep('reset_password');
      console.log(response)
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setStatusMessage({ text: err.response.data.message || "An error occurred.", type: 'error' });
      } else {
        setStatusMessage({ text: "An error occurred. Please check your network connection.", type: 'error' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateResetPassword()) {
      setStatusMessage({ text: "Please correct the form errors.", type: 'error' });
      return;
    }
    setIsSubmitting(true);
    try {
      await axios.post('http://localhost:8000/api/reset-password', {
        email,
        otp,
        newPassword
      });
      setStatusMessage({ text: "Password reset successfully! You can now log in.", type: 'success' });
      // Reset form to the beginning
      setEmail("");
      setOtp("");
      setNewPassword("");
      setConfirmNewPassword("");
      setStep('request_otp');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setStatusMessage({ text: err.response.data.message || "An error occurred.", type: 'error' });
      } else {
        setStatusMessage({ text: "An error occurred. Please check your network connection.", type: 'error' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderForm = () => {
    if (step === 'request_otp') {
      return (
        <form onSubmit={handleRequestOtp}>
          <FormInput
            id="email"
            label="Email Address"
            type="email"
            value={email}
            onChange={handleInputChange}
            error={errors.email}
            placeholder="Enter your email"
          />
          <button
            type="submit"
            className={`
              w-full py-3 px-6 rounded-lg font-semibold text-lg transition-colors duration-300
              ${isSubmitting ? 'bg-zinc-600 text-zinc-400 cursor-not-allowed' : 'bg-white text-zinc-900 hover:bg-zinc-200'}
            `}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send OTP"}
          </button>
        </form>
      );
    } else {
      return (
        <form onSubmit={handleResetPassword}>
          <FormInput
            id="otp"
            label="One-Time Password (OTP)"
            type="text"
            value={otp}
            onChange={handleInputChange}
            error={errors.otp}
            placeholder="Enter the OTP from your email"
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
              ${isSubmitting ? 'bg-zinc-600 text-zinc-400 cursor-not-allowed' : 'bg-white text-zinc-900 hover:bg-zinc-200'}
            `}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </button>
          <button
            type="button"
            onClick={() => { setStep('request_otp'); setStatusMessage({ text: '', type: null }); }}
            className="w-full mt-4 py-3 px-6 rounded-lg font-semibold text-zinc-400 hover:text-white transition-colors duration-300"
          >
            Go back
          </button>
        </form>
      );
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-4 text-white font-inter">
      <div className="bg-zinc-800 rounded-2xl shadow-xl p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">
          {step === 'request_otp' ? 'Forgot Password?' : 'Reset Password'}
        </h1>
        
        {statusMessage.text && (
          <div className={`p-4 mb-6 rounded-lg text-center ${statusMessage.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {statusMessage.text}
          </div>
        )}

        {renderForm()}
      </div>
    </div>
  );
};

export default App;
