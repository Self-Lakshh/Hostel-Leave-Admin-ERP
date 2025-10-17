export interface Student {
    id: string;
    name: string;
    enrollmentNumber: string;
    hostelBlock: string;
    roomNumber: string;
    email: string;
    phone: string;
    status: 'active' | 'inactive';
}

export interface Leave {
    id: string;
    studentId: string;
    student: Student;
    type: 'home' | 'medical' | 'emergency';
    reason: string;
    fromDate: string;
    toDate: string;
    status: 'pending' | 'approved' | 'rejected';
    approvedBy?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Hostel {
    id: string;
    name: string;
    block: string;
    warden: string;
    capacity: number;
    occupied: number;
}

export interface Warden {
    id: string;
    name: string;
    email: string;
    phone: string;
    hostelBlock: string;
    status: 'active' | 'inactive';
}

export interface AssistantWarden {
    id: string;
    name: string;
    email: string;
    phone: string;
    hostelBlock: string;
    status: 'active' | 'inactive';
}

export interface Security {
    id: string;
    name: string;
    email: string;
    phone: string;
    shift: 'morning' | 'evening' | 'night';
    status: 'active' | 'inactive';
}

export interface Admin {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: 'super' | 'normal';
    status: 'active' | 'inactive';
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

export interface ApiError {
    message: string;
    code?: string;
    details?: Record<string, string[]>;
}