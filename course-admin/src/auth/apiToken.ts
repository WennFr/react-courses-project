import { msalInstance, apiScope, ensureEntraConfiguration } from './authConfig'

export type AccessTokenClaims = { roles?: string[] }

function readClaims(accessToken: string): AccessTokenClaims {
  try {
    const payload = accessToken.split('.')[1]
    return JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/'))) as AccessTokenClaims
  } catch {
    return {}
  }
}

export async function getApiAccessToken() {
  ensureEntraConfiguration()
  const account = msalInstance.getActiveAccount() ?? msalInstance.getAllAccounts()[0]
  if (!account) throw new Error('Sign in before calling the API.')

  const result = await msalInstance.acquireTokenSilent({ account, scopes: [apiScope] })
  console.log('Access token acquired:', result.accessToken)
  return result.accessToken
}

export async function getRoles() {
  return readClaims(await getApiAccessToken()).roles ?? []
}
