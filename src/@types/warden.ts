export type WardenRole = 'senior_warden' | 'warden'

export type Warden = {
    _id: string
    warden_id: string
    emp_id: string
    name: string
    phone_no: string
    email: string
    created_by: string
    hostel_id: string[]
    role: WardenRole
    active: boolean
    created_at: string
    updated_at: string
}

export type CreateWardenPayload = {
    wardenType: WardenRole
    name: string
    emp_id: string
    hostel_id: string
    phone_no: string
    email: string
}

export type UpdateWardenPayload = {
    name?: string
    phone_no?: string
    email?: string
    hostel_id?: string[]
    active?: boolean
}

export type GetAllWardensResponse = {
    message: string
    wardens: Warden[]
}

export type CreateWardenResponse = {
    message: string
    warden: Warden
}

export type UpdateWardenResponse = {
    message: string
    warden: Warden
}
