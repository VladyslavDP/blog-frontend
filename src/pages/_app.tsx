import { Provider } from 'react-redux';
import '@/styles/globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import store from '@/store';
import { Loader } from '@/components/Loader';
import { env } from '@/env';
import { useTheme } from 'next-themes';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  const { theme } = useTheme();

  return (
    <ThemeProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Loader />
          <ToastContainer
            position="top-center"
            autoClose={env.NEXT_PUBLIC_AUTO_CLOSE_TIMEOUT}
            hideProgressBar
            closeOnClick
            pauseOnHover
            draggable
            theme={theme}
          />
          <Component {...pageProps} />
        </QueryClientProvider>
      </Provider>
    </ThemeProvider>
  );
}
