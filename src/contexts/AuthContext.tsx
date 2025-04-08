import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { httpClient } from '@/services/http-client';
import { AuthUserSignInDto, instanceOfCognitoSignInResponseDto, instanceOfCognitoSignInTokenResponseDto } from '@/api';

interface AuthContextProps {
  isCheckingAuth: boolean;
  isAuthorized: boolean;
  accessToken: string | null;
  login: (data: AuthUserSignInDto) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true); // Новый флаг
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsCheckingAuth(true);
        const token = localStorage.getItem('AccessToken');
        if (token) {
          setAccessToken(token);
          setIsAuthorized(true);
        }
      } catch (error) {
        console.error('Auth check error', error);
        setIsAuthorized(false);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (data: AuthUserSignInDto) => {
    try {
      const { email, password } = data;

      const response = await httpClient.auth.authControllerSignIn({ authUserSignInDto: { email, password } });

      if (instanceOfCognitoSignInTokenResponseDto(response)) {
        const { AccessToken, RefreshToken } = response;

        if (!AccessToken || !RefreshToken) {
          throw new Error('Missing access or refresh token');
        }

        httpClient.setAuthToken(AccessToken);

        localStorage.setItem('AccessToken', AccessToken);
        setAccessToken(AccessToken);
        setIsAuthorized(true);

        router.push('/dashboard');
      } else if (instanceOfCognitoSignInResponseDto(response)) {
        const { ChallengeName } = response;

        console.log('Challenge required:', ChallengeName);

        throw new Error(`Additional action required: ${ChallengeName}`);
      } else {
        throw new Error('Unexpected response type');
      }
    } catch (error) {
      console.error('Login error', error);
      throw new Error('Login failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('AccessToken');
    setAccessToken(null);
    setIsAuthorized(false);

    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthorized, isCheckingAuth, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
