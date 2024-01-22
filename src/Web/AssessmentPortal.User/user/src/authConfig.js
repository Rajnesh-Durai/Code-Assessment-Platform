import { BrowserCacheLocation, LogLevel } from '@azure/msal-browser';

export const b2cPolicies = {
  names: {
    signUpSignIn: 'B2C_1_SuSi'
  },
  authorities: {
    signUpSignIn: {
      authority: 'https://AssessmentDemo.b2clogin.com/AssessmentDemo.onmicrosoft.com/B2C_1_SuSi',
    }
  },
  authorityDomain: 'AssessmentDemo.b2clogin.com',
};

export const msalConfig = {
  auth: {
    clientId: '79e59671-0915-4523-a6f8-34035f4c5aa1', 
    authority: b2cPolicies.authorities.signUpSignIn.authority,
    knownAuthorities: [b2cPolicies.authorityDomain],
    redirectUri: 'https://react-crud-demo1.vercel.app/', // Points to window.location.origin by default. You must register this URI on Azure portal/App Registration.
  },
  cache: {
    cacheLocation: BrowserCacheLocation.SessionStorage,
    storeAuthStateInCookie: true, // Set this to "true" if you are having issues on IE11 or Edge. Remove this line to use Angular Universal
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

export const protectedResources = {
  api: {
    scopes: {
      read: ['https://AssessmentDemo.onmicrosoft.com/coding/api/Coding.Read'],
      write: ['https://AssessmentDemo.onmicrosoft.com/coding/api/Coding.Write'],
    },
  },
};

export const loginRequest = {
  scopes: [...protectedResources.api.scopes.read, ...protectedResources.api.scopes.write],
};