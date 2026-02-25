import ApiService from '@/services/ApiService'
import type {
    GetAllSecurityGuardsResponse,
    CreateSecurityGuardPayload,
    UpdateSecurityGuardPayload,
    SecurityGuardResponse,
} from '@/@types/security'

export const apiGetAllSecurityGuards = () =>
    ApiService.fetchDataWithAxios<GetAllSecurityGuardsResponse>({
        url: '/admin/all-security-guards',
        method: 'get',
    })

export const apiCreateSecurityGuard = (data: CreateSecurityGuardPayload) =>
    ApiService.fetchDataWithAxios<SecurityGuardResponse>({
        url: '/admin/create-security-guard',
        method: 'post',
        data,
    })

export const apiUpdateSecurityGuard = (empId: string, data: UpdateSecurityGuardPayload) =>
    ApiService.fetchDataWithAxios<SecurityGuardResponse>({
        url: `/admin/update-security-guard/${empId}`,
        method: 'put',
        data,
    })

export const apiDeleteSecurityGuard = (empId: string) =>
    ApiService.fetchDataWithAxios<SecurityGuardResponse>({
        url: `/admin/update-security-guard/${empId}`,
        method: 'put',
        data: { active: false },
    })
