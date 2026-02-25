import ApiService from '@/services/ApiService'
import type {
    GetAllWardensResponse,
    CreateWardenPayload,
    CreateWardenResponse,
    UpdateWardenPayload,
    UpdateWardenResponse,
} from '@/@types/warden'
import type { GetAllHostelsResponse } from '@/@types/hostel'

export const apiGetAllHostels = () =>
    ApiService.fetchDataWithAxios<GetAllHostelsResponse>({
        url: '/student/all-hostel-info',
        method: 'get',
    })

export const apiGetAllWardens = () =>
    ApiService.fetchDataWithAxios<GetAllWardensResponse>({
        url: '/admin/all-wardens',
        method: 'get',
    })

export const apiCreateWarden = (data: CreateWardenPayload) =>
    ApiService.fetchDataWithAxios<CreateWardenResponse>({
        url: '/admin/create-warden',
        method: 'post',
        data,
    })

export const apiUpdateWarden = (wardenId: string, data: UpdateWardenPayload) =>
    ApiService.fetchDataWithAxios<UpdateWardenResponse>({
        url: `/admin/update-warden/${wardenId}`,
        method: 'put',
        data,
    })

// Soft-delete: sets active = false
export const apiDeleteWarden = (wardenId: string) =>
    ApiService.fetchDataWithAxios<UpdateWardenResponse>({
        url: `/admin/update-warden/${wardenId}`,
        method: 'put',
        data: { active: false },
    })

