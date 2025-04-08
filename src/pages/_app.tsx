import { Provider } from 'react-redux';
import '@/styles/globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import store from '@/store';
import { Loader } from '@/components/Loader';
import { env } from '@/env';
import ControlledDialog from '@/components/ControlledDialog';
import { AuthProvider } from '@/contexts/AuthContext';
import { ControlSticker } from '@/components/ControlSticker';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <Loader />
            <ControlledDialog />
            <ToastContainer
              position="top-center"
              autoClose={env.NEXT_PUBLIC_AUTO_CLOSE_TIMEOUT}
              hideProgressBar
              closeOnClick
              pauseOnHover
              draggable
            />
            <ControlSticker />
            <Component {...pageProps} />
          </QueryClientProvider>
        </Provider>
      </AuthProvider>
    </ThemeProvider>
  );
}
