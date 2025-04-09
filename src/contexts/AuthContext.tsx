import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { httpClient } from '@/services/http-client';
import { AuthUserSignInDto, instanceOfCognitoSignInTokenResponseDto } from '@/api';
import { TokenRefreshModal } from '@/components/TokenRefreshModal';
import { localStorageData } from '@/utils';

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
  const [tokenExpirationTime, setTokenExpirationTime] = useState<number | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [showRefreshModal, setShowRefreshModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsCheckingAuth(true);

        const token = localStorage.getItem(localStorageData.auth.accessToken);
        const expiry = localStorage.getItem(localStorageData.auth.tokenExpiry);
        const now = Date.now();

        if (token && expiry) {
          const expiresAt = Number(expiry);

          if (now < expiresAt) {
            setAccessToken(token);
            setTokenExpirationTime(expiresAt);
            setIsAuthorized(true);
            httpClient.setAuthToken(token);
          } else {
            logout();
          }
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

  useEffect(() => {
    if (tokenExpirationTime) {
      const now = Date.now();
      const timeLeft = tokenExpirationTime - now;

      if (timeLeft > 0) {
        // Если остаётся менее 30 секунд, показываем модалку
        const warningTimeout = setTimeout(() => {
          setShowRefreshModal(true);
        }, timeLeft - 30000);

        const logoutTimeout = setTimeout(() => {
          if (showRefreshModal) {
            logout();
          }
        }, timeLeft);

        return () => {
          clearTimeout(warningTimeout);
          clearTimeout(logoutTimeout);
        };
      } else {
        logout();
      }
    }
  }, [tokenExpirationTime, showRefreshModal]);

  const login = async (data: AuthUserSignInDto) => {
    try {
      const { email, password } = data;

      const response = await httpClient.auth.authControllerSignIn({
        authUserSignInDto: { email, password },
      });

      if (instanceOfCognitoSignInTokenResponseDto(response)) {
        const { AccessToken, RefreshToken, ExpiresIn } = response;

        if (!AccessToken || !RefreshToken || !ExpiresIn) {
          throw new Error('Missing access or refresh token');
        }

        httpClient.setAuthToken(AccessToken);

        const expirationTime = Date.now() + ExpiresIn * 1000;
        localStorage.setItem(localStorageData.auth.accessToken, AccessToken);
        localStorage.setItem(localStorageData.auth.refreshToken, RefreshToken);
        localStorage.setItem(localStorageData.auth.tokenExpiry, expirationTime.toString());

        setAccessToken(AccessToken);
        setTokenExpirationTime(expirationTime);
        setIsAuthorized(true);

        router.push('/dashboard');
      } else {
        throw new Error('Unexpected response');
      }
    } catch (error) {
      console.error('Login error', error);
      throw new Error('Login failed');
    }
  };

  const refreshToken = async () => {
    // try {
    //   const refreshToken = localStorage.getItem(localStorageData.auth.refreshToken);
    //   if (!refreshToken) {
    //     throw new Error('No refresh token available');
    //   }
    //
    //   const response = await httpClient.auth.authControllerRefreshToken({
    //     refreshToken,
    //   });
    //
    //   if (instanceOfCognitoSignInTokenResponseDto(response)) {
    //     const { AccessToken, ExpiresIn } = response;
    //
    //     if (!AccessToken || !ExpiresIn) {
    //       throw new Error('Refresh failed');
    //     }
    //
    //     const expirationTime = Date.now() + ExpiresIn * 1000;
    //     localStorage.setItem(localStorageData.auth.accessToken, AccessToken);
    //     localStorage.setItem(localStorageData.auth.tokenExpiry, expirationTime.toString());
    //
    //     setAccessToken(AccessToken);
    //     setTokenExpirationTime(expirationTime);
    //     setShowRefreshModal(false);
    //   } else {
    //     throw new Error('Unexpected response');
    //   }
    // } catch (error) {
    //   console.error('Error refreshing token', error);
    //   logout();
    // }
  };

  const logout = () => {
    localStorage.removeItem(localStorageData.auth.accessToken);
    localStorage.removeItem(localStorageData.auth.refreshToken);
    localStorage.removeItem(localStorageData.auth.tokenExpiry);
    setAccessToken(null);
    setIsAuthorized(false);
    setShowRefreshModal(false);

    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthorized, isCheckingAuth, accessToken, login, logout }}>
      {children}
      {showRefreshModal && (
        <TokenRefreshModal
          timeRemaining={Math.max(0, Math.floor((tokenExpirationTime! - Date.now()) / 1000))}
          onRefresh={refreshToken}
          onLogout={logout}
        />
      )}
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
