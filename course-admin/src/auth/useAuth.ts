import { useEffect, useState } from 'react'
import { useMsal } from '@azure/msal-react'
import { apiScope, ensureEntraConfiguration } from './authConfig'
import { getApiAccessToken, getRoles } from './apiToken'

export function useAuth() {
  const { instance, accounts } = useMsal()
  const account = accounts[0]
  const [roles, setRoles] = useState<string[]>([])

  useEffect(() => {
    let cancelled = false

    async function loadRoles() {
      try {
        const nextRoles = account ? await getRoles() : []
        if (!cancelled) setRoles(nextRoles)
      } catch {
        if (!cancelled) setRoles([])
      }
    }

    void loadRoles()
    return () => { cancelled = true }
  }, [account])

  async function login() {
    ensureEntraConfiguration()
    const result = await instance.loginPopup({ scopes: [apiScope] })

    console.log("ID Token:", result.idToken);

    instance.setActiveAccount(result.account)
  }

  async function logout() {
    await instance.logoutPopup({ account })
  }

  return {
    isAuthenticated: Boolean(account),
    isTeacher: roles.includes('Teacher'),
    displayName: account?.name ?? account?.username ?? '',
    login,
    logout,
    getAccessToken: getApiAccessToken,
  }
}
