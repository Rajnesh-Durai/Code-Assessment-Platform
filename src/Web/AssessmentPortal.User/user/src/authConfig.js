import * as Msal from "msal";
import { BrowserCacheLocation, LogLevel } from "@azure/msal-browser";

export const authConfig = {
  auth: {
    clientId: "cb8f9a83-c59c-43b4-acba-88f8f6023434",
    authority: "https://login.microsoftonline.com/common",
    tenantId: "61330b40-bb04-4d25-b959-f3700fbe6023",
    redirectUri: "https://code-assessment-platform.vercel.app/dashboard",
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage,
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
      },
    },
  },
};

const msalInstance = new Msal.UserAgentApplication(authConfig);

export const request = {
  scopes: ["user.read"],
};

export function signIn() {
  msalInstance
    .loginPopup(request)
    .then((response) => {
      console.log("Login success:", response);
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("email", response.account.userName);
      localStorage.setItem("username", response.account.name);
    })
    .catch((error) => {
      console.error("Login error:", error);
    });
}

export function signOut() {
  msalInstance.logout();
}

function getUserProfile() {
  msalInstance
    .acquireTokenSilent(request)
    .then((response) => {
      console.log("Token acquired:", response);
      // Use the token to call Microsoft Graph API or perform other actions
    })
    .catch((error) => {
      console.error("Token acquisition error:", error);
    });
}

// Example usage
// signIn(); // Trigger the sign-in process
// Perform other actions, such as calling getUserProfile()
// When done, you can call signOut() to sign the user out
