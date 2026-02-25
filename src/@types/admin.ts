export type Admin = {
    _id: string
    admin_id: string
    emp_id: string
    name: string
    phone_no: string
    email: string
    created_by: string
    active: boolean
    created_at: string
    updated_at: string
}

export type CreateAdminPayload = {
    name: string
    email: string
    emp_id: string
    phone_no: string
}

export type UpdateAdminPayload = {
    name?: string
    phone_no?: string
    email?: string
    active?: boolean
}

export type GetAllAdminsResponse = {
    message: string
    admins: Admin[]
}

export type AdminResponse = {
    message: string
    admin: Admin
}
