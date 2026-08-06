import { LogLevel, PublicClientApplication, type Configuration } from '@azure/msal-browser'

const tenantId = import.meta.env.VITE_ENTRA_TENANT_ID

export const apiScope = import.meta.env.VITE_API_SCOPE

export const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_ENTRA_CLIENT_ID ?? '00000000-0000-0000-0000-000000000000',
    authority: `https://login.microsoftonline.com/${tenantId}`,
    redirectUri: window.location.origin,
    postLogoutRedirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: 'sessionStorage',
  },
  system: {
    loggerOptions: {
      loggerCallback: (_level, message, containsPii) => {
        if (!containsPii) console.debug(`[MSAL] ${message}`)
      },
      logLevel: LogLevel.Warning,
    },
  },
}

export const msalInstance = new PublicClientApplication(msalConfig)

export function ensureEntraConfiguration() {
  if (!tenantId || !import.meta.env.VITE_ENTRA_CLIENT_ID || !apiScope) {
    throw new Error('Entra ID is not configured. Copy .env.example to .env.local and fill in the values.')
  }
}
