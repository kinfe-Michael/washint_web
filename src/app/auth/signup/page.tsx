"use client"; 
import { useState } from 'react';
import type { FieldValues } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineGoogle, AiOutlineLock, AiOutlineMail, AiOutlineUser } from 'react-icons/ai';

interface SignupFormInputs extends FieldValues {
  username: string;
  email: string;
  password: string;
}

export default function App() {
  const [message, setMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { control, handleSubmit, formState: { errors } } = useForm<SignupFormInputs>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: SignupFormInputs) => {
    console.log('Signup Data:', data);
    setMessage(`Attempting to sign up with username: ${data.username}, email: ${data.email}, and password: ${data.password}`);
  };

  const handleGoogleSignup = () => {
    console.log('Signing up with Google...');
    setMessage('Redirecting to Google for signup...');
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 sm:p-6 md:p-8">
      <Card className="w-full max-w-sm bg-gray-900 text-white rounded-xl shadow-lg border-gray-700">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-white">Create an Account</CardTitle>
          <CardDescription className="text-gray-400">
            Join us today! Enter your details below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                      className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                      {...field}
                    />
                  )}
                />
              </div>
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
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
              className="w-full bg-[#FF3B30] hover:bg-[#ff3a30d8] text-white font-semibold py-2 rounded-md transition-colors duration-200"
            >
              Sign Up
            </Button>
          </form>

          {message && (
            <p className="text-center text-sm mt-4 text-green-400">
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