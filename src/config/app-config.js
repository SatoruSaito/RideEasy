export const appConfig = {
  region: process.env.REACT_APP_REGION,
  userPool: process.env.REACT_APP_USER_POOL,
  userPoolBaseUri: process.env.REACT_APP_USER_POOL_URL,
  clientId: process.env.REACT_APP_CLIENT_ID,
  callbackUri: process.env.REACT_APP_CALLBACK_URL,
  signoutUri: process.env.REACT_APP_SIGN_OUT_URL,
  tokenScopes: ["openid", "email", "profile", process.env.REACT_APP_CALLBACK_URL],
  googleAPIKey: process.env.REACT_APP_GOOGLE_API_KEY,
}
