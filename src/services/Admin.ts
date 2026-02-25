import ApiService from './ApiService'
import endpointConfig from '@/configs/endpoint.config'

export type SecurityAction = {
    _id: string
    action_by: {
        _id: string
        name: string
        emp_id: string
    }
    action?: 'out' | 'in'
    security_status?: 'out' | 'in'
    action_time?: string
    updated_at?: string
    updatedAt?: string
    created_at?: string
    createdAt?: string
}

export type StudentInfo = {
    student_id: string
    enrollment_no: string
    name: string
    profile_pic: string
    email: string
    phone_no: string
    hostel_id: string
    hostel_name: string
    room_no: string
    semester: number
    branch: string
}

export type LeaveRequest = {
    _id: string
    request_id: string
    request_type: 'outing' | 'leave'
    student_enrollment_number: string
    applied_from: string
    applied_to: string
    reason: string
    request_status: string
    security_status: 'pending' | 'out' | 'in'
    active: boolean
    security_guard_action: SecurityAction[]
    student_info: StudentInfo
    applied_at: string
    created_at: string
    updated_at: string
}

export type UpdateStatusPayload = {
    requestId: string
    status: 'out' | 'in'
}

export type GetRequestsResponse = LeaveRequest[]

export async function apiGetPendingRequests() {
    return ApiService.fetchDataWithAxios<GetRequestsResponse>({
        url: endpointConfig.getAllPendingRequests,
        method: 'get',
    })
}

export async function apiGetInRequests() {
    return ApiService.fetchDataWithAxios<GetRequestsResponse>({
        url: endpointConfig.getAllInRequests,
        method: 'get',
    })
}

export async function apiGetOutRequests() {
    return ApiService.fetchDataWithAxios<GetRequestsResponse>({
        url: endpointConfig.getAllOutRequests,
        method: 'get',
    })
}

export async function apiUpdateRequestStatus(data: UpdateStatusPayload) {
    return ApiService.fetchDataWithAxios<{ message: string }>({
        url: endpointConfig.updateRequestStatus,
        method: 'put',
        data,
    })
}
