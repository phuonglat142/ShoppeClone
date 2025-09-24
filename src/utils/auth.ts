import type { User } from '../types/user.type'

export const setAccessTokenToLs = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const clearLS = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('profile')
}

export const getAccessTokenFromLs = () => {
  return localStorage.getItem('access_token') || ''
}

export const getProfileFromLS = () => {
  const result = localStorage.getItem('profile')

  return result ? JSON.parse(result) : null
}

export const setProfileFromLS = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}
