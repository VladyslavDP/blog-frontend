import { AuthApi, PostApi, TagApi, Configuration } from '@/api';
import { env } from '@/env';
import store from '@/store';
import { showLoader, hideLoader } from '@/store';
import { delay, handleApiError } from '@/utils';
import { toast } from 'react-toastify';

const isClient = typeof window !== 'undefined';

export const createApiConfig = () => {
  return new Configuration({
    basePath: env.API_URL,
    middleware: [
      {
        pre: async ({ url, init, ...rest }) => {
          console.log(isClient ? '[Client]' : '[Server]', 'Запрос отправляется:', url, init);

          if (isClient) {
            await delay(() => store.dispatch(showLoader()), 0);
          }
        },
        post: async ({ url, response }) => {
          console.log('Ответ:', url, response.status);
          if (isClient) {
            delay(() => store.dispatch(hideLoader())).then(() => {
              if (!response.ok) {
                const error = new Error(`[Ошибка запроса] Код: ${response.status}`);
                handleApiError(error);
              } else {
                toast.success('Запрос выполнен успешно!');
              }
            });
          }
          return response;
        },
        onError: async ({ url, error }) => {
          if (isClient) {
            await delay(() => store.dispatch(hideLoader()));
          }

          handleApiError(error);
          throw error;
        },
      },
    ],
  });
};

class DefaultApi {
  auth: AuthApi;
  post: PostApi;
  tag: TagApi;
  private config: Configuration;

  constructor(config: Configuration) {
    this.config = config;
    this.updateApis();
  }

  private updateApis() {
    this.auth = new AuthApi(this.config);
    this.post = new PostApi(this.config);
    this.tag = new TagApi(this.config);
  }

  setAuthToken(token: string): void {
    this.config = new Configuration({
      ...this.config,
      headers: {
        ...this.config.headers,
        Authorization: `Bearer ${token}`,
      },
    });

    this.updateApis();
  }

  removeAuthToken(): void {
    const { Authorization, ...restHeaders } = this.config.headers || {};

    this.config = new Configuration({
      ...this.config,
      headers: restHeaders,
    });

    this.updateApis();
  }
}

export const httpClient = new DefaultApi(createApiConfig());
