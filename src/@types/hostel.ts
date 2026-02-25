export type Hostel = {
    _id?: string
    hostel_id: string
    name?: string
    hostel_name?: string
    [key: string]: unknown
}

export type GetAllHostelsResponse = {
    hostels?: Hostel[]
    data?: Hostel[]
    message?: string
}
