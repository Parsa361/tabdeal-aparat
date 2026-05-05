import { ofetch } from 'ofetch'

export const aparatClient = ofetch.create({
  baseURL: 'https://www.aparat.com/etc/api',
  timeout: 10_000,
  retry: 1,
  retryDelay: 300,
  headers: {
    accept: 'application/json',
  },
})
