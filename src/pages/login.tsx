import React from 'react';
import { useRouter } from 'next/router';
import { openDialog, useAppDispatch } from '@/store';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { PASSWORD_PATTERN } from '@/utils';
import { useAuth } from '@/contexts/AuthContext';

const LoginSchema = z.object({
  email: z.string().email('Invalid email address').nonempty('Email is required'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(PASSWORD_PATTERN, 'Password must contain at least one lowercase letter, one uppercase letter, and one digit')
    .nonempty('Password is required'),
});

type LoginFormInputs = z.infer<typeof LoginSchema>;

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(LoginSchema),
    mode: 'onTouched',
  });

  const handleLogin = async (data: LoginFormInputs) => {
    try {
      await login(data);
    } catch (error) {
      console.log(error);
      dispatch(
        openDialog({
          title: 'Login Failed',
          description: 'Invalid email or password. Please try again.',
          // onSubmit: () => console.log('Dialog closed'),
        }),
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-lightBg dark:bg-darkBg">
      <div className="fixed right-10 top-10">
        <ThemeSwitcher />
      </div>
      <div className="w-full max-w-md p-8 bg-lightSecondary dark:bg-darkSecondary shadow rounded">
        <h1 className="text-2xl font-bold text-center text-lightText dark:text-darkText">Login</h1>
        <form onSubmit={handleSubmit(handleLogin)} className="mt-6" autoComplete="off">
          {/* Поле ввода email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-lightText dark:text-darkText">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="off"
              {...register('email')}
              className={`w-full mt-1 p-2 border ${
                errors.email ? 'border-red-500' : 'border-lightPrimary dark:border-darkPrimary'
              } rounded focus:outline-none focus:ring-2 focus:ring-lightPrimary dark:focus:ring-darkPrimary`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-lightText dark:text-darkText">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="off"
              {...register('password')}
              className={`w-full mt-1 p-2 border ${
                errors.password ? 'border-red-500' : 'border-lightPrimary dark:border-darkPrimary'
              } rounded focus:outline-none focus:ring-2 focus:ring-lightPrimary dark:focus:ring-darkPrimary`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 mt-4 text-white bg-blue-600 rounded ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
