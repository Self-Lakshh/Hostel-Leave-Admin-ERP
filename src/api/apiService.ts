import { api } from '../lib/api';

// TODO: Replace `any` types with concrete interfaces for API responses.
/* eslint-disable @typescript-eslint/no-explicit-any */

/* --------- Authentication --------- */
export interface AdminLoginPayload {
    emp_id: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    [key: string]: any;
}

export const adminLogin = async (payload: AdminLoginPayload): Promise<LoginResponse> => {
    const url = `${import.meta.env.VITE_BASE_URL}/login/admin`;
    const resp = await api.post(url, payload);
    return resp.data;
};

/* --------- Hostels --------- */
export const createHostel = async (payload: any) => {
    const resp = await api.post(`${import.meta.env.VITE_BASE_URL}/create-hostel`, payload);
    return resp.data;
};

export const updateHostel = async (hostelId: string, payload: any) => {
    const resp = await api.put(`${import.meta.env.VITE_BASE_URL}/update-hostel/${hostelId}`, payload);
    return resp.data;
};

export const inactiveHostel = async (hostelId: string) => {
    const resp = await api.put(`${import.meta.env.VITE_BASE_URL}/inactive-hostel/${hostelId}`);
    return resp.data;
};

export const getAllHostelList = async () => {
    const resp = await api.get(`${import.meta.env.VITE_BASE_URL}/student/all-hostel-info`);
    return resp.data;
};

export const getHostelInfo = async (hostelId: string) => {
    const resp = await api.get(`${import.meta.env.VITE_BASE_URL}/hostel/${hostelId}`);
    return resp.data;
};

/* --------- Branches / Departments --------- */
export const getBranches = async () => {
    const resp = await api.get(`${import.meta.env.VITE_BASE_URL}nt/all-branches`);
    return resp.data;
};

export const createBranch = async (payload: any) => {
    const resp = await api.post(`${import.meta.env.VITE_BASE_URL}/create-branch`, payload);
    return resp.data;
};

export const updateBranch = async (branchId: string, payload: any) => {
    const resp = await api.post(`${import.meta.env.VITE_BASE_URL}/update-branch/${branchId}`, payload);
    return resp.data;
};

/* --------- Students --------- */
export const createStudent = async (payload: any) => {
    const resp = await api.post(`${import.meta.env.VITE_BASE_URL}/create-student`, payload);
    return resp.data;
};

export const updateStudent = async (enrollmentNo: string, payload: any) => {
    const resp = await api.put(`${import.meta.env.VITE_BASE_URL}/update-student/${enrollmentNo}`, payload);
    return resp.data;
};

export const getStudentByEnrollment = async (enrollmentNo: string) => {
    const resp = await api.get(`${import.meta.env.VITE_BASE_URL}/student/${enrollmentNo}`);
    return resp.data;
};

export const getAllStudents = async () => {
    const resp = await api.get(`${import.meta.env.VITE_BASE_URL}/all-students`);
    return resp.data;
};

/* --------- Wardens --------- */
export const createWarden = async (payload: any) => {
    const resp = await api.post(`${import.meta.env.VITE_BASE_URL}/create-warden`, payload);
    return resp.data;
};

export const updateWarden = async (wardenId: string, payload: any) => {
    const resp = await api.put(`${import.meta.env.VITE_BASE_URL}/update-warden/${wardenId}`, payload);
    return resp.data;
};

export const getWardens = async () => {
    const resp = await api.get(`${import.meta.env.VITE_BASE_URL}/all-wardens`);
    return resp.data;
};

/* --------- Admins --------- */
export const createAdmin = async (payload: any) => {
    const resp = await api.post(`${import.meta.env.VITE_BASE_URL}/create-admin`, payload);
    return resp.data;
};

export const updateAdmin = async (empId: string, payload: any) => {
    const resp = await api.put(`${import.meta.env.VITE_BASE_URL}/update-admin/${empId}`, payload);
    return resp.data;
};

export const listAdmins = async () => {
    const resp = await api.get(`${import.meta.env.VITE_BASE_URL}/all-admins`);
    return resp.data;
};

/* --------- Requests --------- */
export const getRequestsByHostelId = async (hostelId: string) => {
    const resp = await api.get(`${import.meta.env.VITE_BASE_URL}st/hostel-requests/${hostelId}`);
    return resp.data;
};

export const getRequestsByStatus = async (status: string) => {
    const resp = await api.get(`${import.meta.env.VITE_BASE_URL}st/requests/${status}`);
    return resp.data;
};

export const getRequestById = async (id: string) => {
    const resp = await api.get(`${import.meta.env.VITE_BASE_URL}st/request/${id}`);
    return resp.data;
};

export const getTotalStudents = async () => {
    const resp = await api.get(`${import.meta.env.VITE_BASE_URL}/total-students`);
    return resp.data;
};

export const getOutStudents = async () => {
    const resp = await api.get(`${import.meta.env.VITE_BASE_URL}/outstudents`);
    return resp.data;
};

export const getAllActiveRequests = async () => {
    const resp = await api.get(`${import.meta.env.VITE_BASE_URL}/all-active-requests`);
    return resp.data;
};

/* --------- Security Guards --------- */
export const createSecurityGuard = async (payload: any) => {
    const resp = await api.post(`${import.meta.env.VITE_BASE_URL}/create-security-guard`, payload);
    return resp.data;
};

export const updateSecurityGuard = async (empId: string, payload: any) => {
    const resp = await api.put(`${import.meta.env.VITE_BASE_URL}/update-security-guard/${empId}`, payload);
    return resp.data;
};

export const getAllSecurityGuards = async () => {
    const resp = await api.get(`${import.meta.env.VITE_BASE_URL}/all-security-guards`);
    return resp.data;
};

export default {
    adminLogin,
    createHostel,
    updateHostel,
    inactiveHostel,
    getAllHostelList,
    getHostelInfo,
    getBranches,
    createBranch,
    updateBranch,
    createStudent,
    updateStudent,
    getStudentByEnrollment,
    getAllStudents,
    createWarden,
    updateWarden,
    getWardens,
    createAdmin,
    updateAdmin,
    listAdmins,
    getRequestsByHostelId,
    getRequestsByStatus,
    getRequestById,
    getTotalStudents,
    getOutStudents,
    getAllActiveRequests,
    createSecurityGuard,
    updateSecurityGuard,
    getAllSecurityGuards,
    api,
};

