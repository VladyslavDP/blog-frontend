export const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export const localStorageData = {
  auth: {
    accessToken: 'AccessToken',
    tokenExpiry: 'TokenExpiry',
    refreshToken: 'RefreshToken',
  },
};
