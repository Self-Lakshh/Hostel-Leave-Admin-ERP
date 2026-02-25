export type SecurityGuard = {
    _id: string
    security_guard_id: string
    emp_id: string
    name: string
    phone_no: string
    email: string
    created_by: string
    active: boolean
    created_at: string
    updated_at: string
}

export type CreateSecurityGuardPayload = {
    name: string
    phone_no: string
    email: string
    emp_id: string
}

export type UpdateSecurityGuardPayload = {
    name?: string
    phone_no?: string
    email?: string
    active?: boolean
}

export type GetAllSecurityGuardsResponse = {
    message: string
    data: SecurityGuard[]
}

export type SecurityGuardResponse = {
    message: string
    data: SecurityGuard
}
