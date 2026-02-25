import ApiService from '@/services/ApiService'
import type {
    Admin,
    GetAllAdminsResponse,
    CreateAdminPayload,
    UpdateAdminPayload,
    AdminResponse,
} from '@/@types/admin'

export const apiGetAllAdmins = () =>
    ApiService.fetchDataWithAxios<GetAllAdminsResponse>({
        url: '/admin/all-admins',
        method: 'get',
    })

export const apiCreateAdmin = (data: CreateAdminPayload) =>
    ApiService.fetchDataWithAxios<AdminResponse>({
        url: '/admin/create-admin',
        method: 'post',
        data,
    })

export const apiUpdateAdmin = (empId: string, data: UpdateAdminPayload) =>
    ApiService.fetchDataWithAxios<AdminResponse>({
        url: `/admin/update-admin/${empId}`,
        method: 'put',
        data,
    })

export const apiDeleteAdmin = (empId: string) =>
    ApiService.fetchDataWithAxios<AdminResponse>({
        url: `/admin/update-admin/${empId}`,
        method: 'put',
        data: { active: false },
    })
