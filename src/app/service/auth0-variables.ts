interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: '1jFUjMg1SSuG93WCXnSJqgdHNe20bRVc',
  domain: 'authexample.auth0.com',
  callbackURL: 'http://localhost:4200/login'
};
