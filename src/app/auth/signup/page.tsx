"use client";
import { useState, useEffect } from 'react';
import type { FieldValues } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineGoogle, AiOutlineLock, AiOutlineMail, AiOutlineUser } from 'react-icons/ai';

// Update the interface to include first and last name
interface SignupFormInputs extends FieldValues {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
}

export default function App() {
  const [message, setMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isCheckingUsername, setIsCheckingUsername] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [usernameMessage, setUsernameMessage] = useState<{ text: string, color: string } | null>(null);
  const [usernameAvailability, setUsernameAvailability] = useState<boolean | null>(null);

  const { control, handleSubmit, formState: { errors }, watch, reset } = useForm<SignupFormInputs>({
    defaultValues: {
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      password: '',
    },
  });

  const watchedUsername = watch('username');

  // Debounce API call for username validation
  useEffect(() => {
    // Only check if the username has at least 3 characters
    if (watchedUsername && watchedUsername.length >= 3) {
      setIsCheckingUsername(true);
      setUsernameAvailability(null);
      setUsernameMessage(null);

      const checkUsername = async () => {
        try {
          // Construct the API URL with the username
          const response = await fetch(`http://localhost:8000/api/users/check_username?username=${watchedUsername}`);
          if (!response.ok) {
            // Handle HTTP errors, e.g., 404, 500
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          // The API now returns 'is_available' and a 'message'
          const isAvailable = data.is_available;
          const apiMessage = data.message;

          if (isAvailable) {
            setUsernameMessage({ text: apiMessage, color: 'text-green-500' });
            setUsernameAvailability(true);
          } else {
            setUsernameMessage({ text: apiMessage, color: 'text-red-500' });
            setUsernameAvailability(false);
          }
        } catch (error) {
          console.error('Error checking username:', error);
          setUsernameMessage({ text: 'Could not check username. Please try again. (CORS error likely)', color: 'text-yellow-500' });
          setUsernameAvailability(null);
        } finally {
          setIsCheckingUsername(false);
        }
      };

      const debounceTimeout = setTimeout(checkUsername, 500);
      return () => clearTimeout(debounceTimeout);
    } else {
      // Clear messages if username is too short or empty
      setUsernameMessage(null);
      setIsCheckingUsername(false);
      setUsernameAvailability(null);
    }
  }, [watchedUsername]);

  const onSubmit = async (data: SignupFormInputs) => {
    // Only proceed with signup if username is available and not being checked
    if (!isCheckingUsername && usernameAvailability) {
      setIsSubmitting(true);
      setMessage(null);
      
      try {
        const response = await fetch('http://localhost:8000/api/users/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log('Signup successful:', responseData);
          setMessage(`User created successfully! Welcome, ${data.first_name}.`);
          // Clear all fields on successful submission
          reset();
        } else {
          // Handle API errors from the server
          const errorData = await response.json();
          console.error('Signup failed:', errorData);
          setMessage(`Error: ${errorData.message || 'Signup failed. Please try again.'}`);
          // Clear only the password field on failure
          reset({
            ...data,
            password: '',
          });
        }
      } catch (error) {
        console.error('Network error during signup:', error);
        setMessage('A network error occurred. Please check your connection and try again.');
        // Clear only the password field on network error
        reset({
          ...data,
          password: '',
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setMessage('Please enter a valid and available username.');
    }
  };

  const handleGoogleSignup = () => {
    console.log('Signing up with Google...');
    setMessage('Redirecting to Google for signup...');
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    // Updated main background to a slightly darker shade
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 sm:p-6 md:p-8 font-sans">
      <style>
        {`
          /* CSS to prevent browser autofill from changing the background color */
          input:-webkit-autofill,
          input:-webkit-autofill:hover,
          input:-webkit-autofill:focus,
          input:-webkit-autofill:active {
            -webkit-text-fill-color: #f8f9fa; /* Lighter text color */
            -webkit-box-shadow: 0 0 0px 1000px #1f2937 inset; /* Gray-800 color */
            transition: background-color 5000s ease-in-out 0s;
          }
        `}
      </style>
      <Card className="w-full max-w-sm bg-gray-900 text-white rounded-xl shadow-lg border-gray-800">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-white">Create an Account</CardTitle>
          <CardDescription className="text-gray-400">
            Join us today! Enter your details below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first_name" className="text-gray-300">First Name</Label>
                <Controller<SignupFormInputs>
                  name="first_name"
                  control={control}
                  rules={{ required: 'First name is required' }}
                  render={({ field }) => (
                    <Input
                      id="first_name"
                      placeholder="John"
                      type="text"
                      className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                      {...field}
                    />
                  )}
                />
                {errors.first_name && (
                  <p className="text-red-500 text-sm mt-1">{errors.first_name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name" className="text-gray-300">Last Name</Label>
                <Controller<SignupFormInputs>
                  name="last_name"
                  control={control}
                  rules={{ required: 'Last name is required' }}
                  render={({ field }) => (
                    <Input
                      id="last_name"
                      placeholder="Doe"
                      type="text"
                      className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                      {...field}
                    />
                  )}
                />
                {errors.last_name && (
                  <p className="text-red-500 text-sm mt-1">{errors.last_name.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-300">Username</Label>
              <div className="relative">
                <AiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
                <Controller<SignupFormInputs>
                  name="username"
                  control={control}
                  rules={{ required: 'Username is required' }}
                  render={({ field }) => (
                    <Input
                      id="username"
                      placeholder="john.doe"
                      type="text"
                      className={`pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 
                        ${usernameAvailability === false ? 'border-red-500 focus:border-red-500' : ''}
                        ${usernameAvailability === true ? 'border-green-500 focus:border-green-500' : ''}
                      `}
                      {...field}
                    />
                  )}
                />
              </div>
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
              )}
              {isCheckingUsername && (
                <p className="text-sm mt-1 text-gray-400">Checking...</p>
              )}
              {usernameMessage && (
                <p className={`text-sm mt-1 ${usernameMessage.color}`}>{usernameMessage.text}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">Email</Label>
              <div className="relative">
                <AiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
                <Controller<SignupFormInputs>
                  name="email"
                  control={control}
                  rules={{
                    required: 'Email is required',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: 'Invalid email address'
                    }
                  }}
                  render={({ field }) => (
                    <Input
                      id="email"
                      placeholder="john.doe@example.com"
                      type="email"
                      className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                      {...field}
                    />
                  )}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">Password</Label>
              <div className="relative">
                <AiOutlineLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
                <Controller<SignupFormInputs>
                  name="password"
                  control={control}
                  rules={{ required: 'Password is required', minLength: { value: 8, message: 'Password must be at least 8 characters' } }}
                  render={({ field }) => (
                    <Input
                      id="password"
                      placeholder="••••••••"
                      type={showPassword ? "text" : "password"}
                      className="pl-10 pr-10 bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                      {...field}
                    />
                  )}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-400 focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible className="text-lg" />
                  ) : (
                    <AiOutlineEye className="text-lg" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>


            <Button
              type="submit"
              disabled={isCheckingUsername || !usernameAvailability || isSubmitting}
              className="w-full bg-[#FF3B30] hover:bg-[#ff3a30d8] text-white font-semibold py-2 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Signing Up...' : 'Sign Up'}
            </Button>
          </form>

          {message && (
            <p className={`text-center text-sm mt-4 ${message.startsWith('Error') || message.startsWith('A network error') ? 'text-red-500' : 'text-green-400'}`}>
              {message}
            </p>
          )}

          <div className="relative flex items-center justify-center my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-700"></span>
            </div>
            <div className="relative z-10 px-4 bg-gray-900 text-gray-400 text-sm">
              OR
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 bg-gray-800 border-gray-700 text-white hover:bg-gray-700 font-bold py-2 rounded-md transition-colors duration-200"
            onClick={handleGoogleSignup}
          >
            <AiOutlineGoogle className="text-lg" />
            Sign Up with Google
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-gray-400">
          Already have an account? <a href="#" className="ml-1 text-blue-500 hover:underline">Log In</a>
        </CardFooter>
      </Card>
    </div>
  );
}
