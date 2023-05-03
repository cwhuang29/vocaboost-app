export const azureOauthEndpoint = 'https://login.microsoftonline.com/common/v2.0';

export const azureOauthScopes = ['openid', 'profile', 'email', 'offline_access'];

export const azureCodeChallenge = 'vocaboost411';

export const azureRedirectUriObj = { scheme: 'msauth.vocaboost.com', path: 'auth' }; // Redirect uri (assigned by azure): msauth.vocaboost.com://auth
