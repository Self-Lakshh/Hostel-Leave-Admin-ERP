export const apiPrefix = '/api'

const endpointConfig = {
    signIn: '/admin/login/admin',
    signOut: '/sign-out',
    signUp: '/sign-up',
    forgotPassword: '/forgot-password',
    resetPassword: '/reset-password',
    getAllPendingRequests: '/admin/allRequests/pending',
    getAllInRequests: '/admin/allRequests/in',
    getAllOutRequests: '/admin/allRequests/out',
    updateRequestStatus: '/request/update-status',
}

export default endpointConfig
