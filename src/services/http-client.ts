import { AuthApi, PostApi, TagApi, Configuration } from '@/api';
import { env } from '@/env';
import store from '@/store';
import { showLoader, hideLoader } from '@/store';
import { delay, handleApiError } from '@/utils';
import { toast } from 'react-toastify';
import { EHttpMethod } from '@/common';

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
        post: async ({ url, response, init: { method } }) => {
          console.log('Ответ:', url, response.status);
          if (isClient) {
            delay(() => store.dispatch(hideLoader())).then(() => {
              if (!response.ok) {
                const error = new Error(`[Ошибка запроса] Код: ${response.status}`);
                handleApiError(error);
              } else {
                if ([EHttpMethod.POST, EHttpMethod.PUT].includes(method as EHttpMethod)) {
                  toast.success('Data saved');
                }
                if (EHttpMethod.PATCH === method) {
                  toast.success('Data updated');
                }
                if (EHttpMethod.DELETE === method) {
                  toast.success('Data deleted');
                }
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
