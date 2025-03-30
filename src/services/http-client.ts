import { AuthApi, PostApi, TagApi, Configuration } from '@/api';
import { env } from '@/env';

export const createApiConfig = () => {
  return new Configuration({
    basePath: env.API_URL,
    middleware: [
      {
        pre: async ({ url, init, ...rest }) => {
          const isClient = typeof window !== 'undefined';
          console.log(isClient ? '[Client]' : '[Server]', 'Запрос отправляется:', url, init);

          if (isClient) {
            console.log('Client-side logic (e.g., opening modal)');
          }
        },
        post: async ({ url, response }) => {
          console.log('Ответ:', url, response.status);
        },
        onError: async ({ url, error }) => {
          console.error('Ошибка запроса:', url, error);
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
