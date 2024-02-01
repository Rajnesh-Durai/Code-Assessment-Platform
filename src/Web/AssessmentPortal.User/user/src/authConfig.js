import * as Msal from 'msal';
import { BrowserCacheLocation, LogLevel } from '@azure/msal-browser';

export const authConfig = {
  auth: {
    clientId: 'cb8f9a83-c59c-43b4-acba-88f8f6023434',
    authority: 'https://login.microsoftonline.com/common',
    tenantId:'61330b40-bb04-4d25-b959-f3700fbe6023',
    redirectUri: 'https://code-assessment-platform.vercel.app/dashboard',
    postLogoutRedirectUri: "https://code-assessment-platform.vercel.app",
  },
  cache: {
    cacheLocation: BrowserCacheLocation.SessionStorage,
    storeAuthStateInCookie: true,
  },
  system: {
    loggerOptions: {
        loggerCallback: (level, message, containsPii) => {
            if (containsPii) return;
            level = LogLevel.Verbose;

            switch (level) {
                case LogLevel.Error:
                    console.error(message);
                    return;
                case LogLevel.Info:
                    console.info(message);
                    return;
                case LogLevel.Verbose:
                    console.debug(message);
                    return;
                case LogLevel.Warning:
                    console.warn(message);
                    return;
                default:
                    console.log(message);
            }
        }
    }
}
};

const msalInstance = new Msal.UserAgentApplication(authConfig);

export const request = {
  scopes: ['user.read'],
};


