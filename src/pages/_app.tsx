import { Provider } from 'react-redux';
import '@/styles/globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import store from '@/store';
import { Loader } from '@/components/Loader';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Loader />
          <Component {...pageProps} />
        </QueryClientProvider>
      </Provider>
    </ThemeProvider>
  );
}
