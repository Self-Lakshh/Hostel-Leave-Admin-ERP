export type AppConfig = {
    apiPrefix: string
    authenticatedEntryPath: string
    unAuthenticatedEntryPath: string
    locale: string
    accessTokenPersistStrategy: 'localStorage' | 'sessionStorage' | 'cookies'
    enableMock: boolean
}

const appConfig: AppConfig = {
    apiPrefix: import.meta.env.VITE_BASE_URL || '/api',
    authenticatedEntryPath: '/admin/dashboard',
    unAuthenticatedEntryPath: '/login',
    locale: 'en',
    accessTokenPersistStrategy: 'cookies',
    enableMock: false,
}

export default appConfig
