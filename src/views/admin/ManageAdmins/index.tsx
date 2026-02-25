import { useEffect, useState, useCallback } from 'react'
import { Plus, UserCog } from 'lucide-react'
import { toast } from 'sonner'
import {
    apiGetAllAdmins,
    apiCreateAdmin,
    apiUpdateAdmin,
    apiDeleteAdmin,
} from '@/services/admin/Admin'
import type { Admin, CreateAdminPayload, UpdateAdminPayload } from '@/@types/admin'
import AdminCard from './components/AdminCard'
import AdminDialog from './components/AdminDialog'
import DeleteConfirmDialog from '../ManageWarden/components/DeleteConfirmDialog'

const ManageAdmins = () => {
    const [admins, setAdmins] = useState<Admin[]>([])
    const [loading, setLoading] = useState(true)
    const [actionLoading, setActionLoading] = useState(false)

    const [dialogOpen, setDialogOpen] = useState(false)
    const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create')
    const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null)

    const [deleteOpen, setDeleteOpen] = useState(false)
    const [deleteTarget, setDeleteTarget] = useState<Admin | null>(null)

    const fetchAdmins = useCallback(async () => {
        setLoading(true)
        try {
            const res = await apiGetAllAdmins()
            setAdmins(res.admins || [])
        } catch {
            toast.error('Failed to fetch admins')
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchAdmins()
    }, [fetchAdmins])

    const handleCreate = () => {
        setSelectedAdmin(null)
        setDialogMode('create')
        setDialogOpen(true)
    }

    const handleEdit = (admin: Admin) => {
        setSelectedAdmin(admin)
        setDialogMode('edit')
        setDialogOpen(true)
    }

    const handleDeleteClick = (admin: Admin) => {
        const adminForDelete = {
            ...admin,
            role: 'Admin'
        } as any
        setDeleteTarget(adminForDelete)
        setDeleteOpen(true)
    }

    const handleDialogSubmit = async (data: CreateAdminPayload | UpdateAdminPayload) => {
        setActionLoading(true)
        try {
            if (dialogMode === 'create') {
                await apiCreateAdmin(data as CreateAdminPayload)
                toast.success('Admin created successfully')
            } else if (selectedAdmin) {
                await apiUpdateAdmin(selectedAdmin.emp_id, data as UpdateAdminPayload)
                toast.success('Admin updated successfully')
            }
            setDialogOpen(false)
            fetchAdmins()
        } catch (err: any) {
            toast.error(err?.response?.data?.message || 'Operation failed')
        } finally {
            setActionLoading(false)
        }
    }

    const handleDeleteConfirm = async () => {
        if (!deleteTarget) return
        setActionLoading(true)
        try {
            await apiDeleteAdmin(deleteTarget.emp_id)
            toast.success(`${deleteTarget.name} has been deactivated`)
            setDeleteOpen(false)
            setDeleteTarget(null)
            fetchAdmins()
        } catch (err: any) {
            toast.error(err?.response?.data?.message || 'Delete failed')
        } finally {
            setActionLoading(false)
        }
    }

    const handleReactivate = async (admin: Admin) => {
        try {
            await apiUpdateAdmin(admin.emp_id, { active: true })
            toast.success(`${admin.name} has been reactivated`)
            fetchAdmins()
        } catch (err: any) {
            toast.error(err?.response?.data?.message || 'Reactivation failed')
        }
    }

    return (
        <div className="flex flex-col h-full gap-4 overflow-hidden">
            <div className="flex-shrink-0 bg-white rounded-xl border border-gray-100 shadow-sm px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                            <UserCog size={18} className="text-gray-600" />
                        </div>
                        <div>
                            <h1 className="text-[15px] font-bold text-gray-900 uppercase tracking-wide">Manage Admins</h1>
                            <p className="text-[12px] text-gray-400 mt-0.5">
                                {loading ? 'Loading...' : `${admins.length} admin${admins.length !== 1 ? 's' : ''} found`}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleCreate}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg text-[13px] font-semibold hover:bg-gray-800 transition shadow-sm"
                    >
                        <Plus size={15} />
                        Add Admin
                    </button>
                </div>
            </div>

            <div className="flex-1 bg-white rounded-md p-4 overflow-y-auto min-h-0" style={{ scrollbarWidth: 'thin', scrollbarColor: '#e5e7eb' }}>
                {loading ? (
                    <div className="flex items-center justify-center h-48">
                        <span className="text-[13px] text-gray-400 font-medium">Loading admins...</span>
                    </div>
                ) : admins.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-48 text-center gap-3">
                        <UserCog size={36} className="text-gray-200" />
                        <div>
                            <p className="font-semibold text-gray-700 text-[14px]">No Admins Found</p>
                            <p className="text-gray-400 text-[12px] mt-0.5">Click "Add Admin" to get started</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-1 pb-4">
                        {admins.map((admin) => (
                            <AdminCard
                                key={admin._id}
                                admin={admin}
                                onEdit={handleEdit}
                                onDelete={handleDeleteClick}
                                onReactivate={handleReactivate}
                            />
                        ))}
                    </div>
                )}
            </div>

            <AdminDialog
                open={dialogOpen}
                mode={dialogMode}
                admin={selectedAdmin}
                onClose={() => setDialogOpen(false)}
                onSubmit={handleDialogSubmit}
                loading={actionLoading}
            />
            <DeleteConfirmDialog
                open={deleteOpen}
                name={deleteTarget?.name || ''}
                title="Remove Admin"
                description="This will mark the admin as inactive. The record will be retained but deactivated."
                onClose={() => { setDeleteOpen(false); setDeleteTarget(null) }}
                onConfirm={handleDeleteConfirm}
                loading={actionLoading}
            />
        </div>
    )
}

export default ManageAdmins