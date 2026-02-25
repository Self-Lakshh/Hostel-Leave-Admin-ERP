import { useEffect, useState, useCallback } from 'react'
import { Plus, Shield } from 'lucide-react'
import { toast } from 'sonner'
import {
    apiGetAllSecurityGuards,
    apiCreateSecurityGuard,
    apiUpdateSecurityGuard,
    apiDeleteSecurityGuard,
} from '@/services/admin/Security'
import type { SecurityGuard, CreateSecurityGuardPayload, UpdateSecurityGuardPayload } from '@/@types/security'
import SecurityCard from './components/SecurityCard'
import SecurityDialog from './components/SecurityDialog'
import DeleteConfirmDialog from '../ManageWarden/components/DeleteConfirmDialog'

const ManageSecurity = () => {
    const [guards, setGuards] = useState<SecurityGuard[]>([])
    const [loading, setLoading] = useState(true)
    const [actionLoading, setActionLoading] = useState(false)

    const [dialogOpen, setDialogOpen] = useState(false)
    const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create')
    const [selectedGuard, setSelectedGuard] = useState<SecurityGuard | null>(null)

    const [deleteOpen, setDeleteOpen] = useState(false)
    const [deleteTarget, setDeleteTarget] = useState<SecurityGuard | null>(null)

    const fetchGuards = useCallback(async () => {
        setLoading(true)
        try {
            const res = await apiGetAllSecurityGuards()
            setGuards(res.data || [])
        } catch {
            toast.error('Failed to fetch security guards')
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchGuards()
    }, [fetchGuards])

    const handleCreate = () => {
        setSelectedGuard(null)
        setDialogMode('create')
        setDialogOpen(true)
    }

    const handleEdit = (guard: SecurityGuard) => {
        setSelectedGuard(guard)
        setDialogMode('edit')
        setDialogOpen(true)
    }

    const handleDeleteClick = (guard: SecurityGuard) => {
        const guardForDelete = {
            ...guard,
            role: 'Security'
        } as any
        setDeleteTarget(guardForDelete)
        setDeleteOpen(true)
    }

    const handleDialogSubmit = async (data: CreateSecurityGuardPayload | UpdateSecurityGuardPayload) => {
        setActionLoading(true)
        try {
            if (dialogMode === 'create') {
                await apiCreateSecurityGuard(data as CreateSecurityGuardPayload)
                toast.success('Security guard created successfully')
            } else if (selectedGuard) {
                await apiUpdateSecurityGuard(selectedGuard.emp_id, data as UpdateSecurityGuardPayload)
                toast.success('Security guard updated successfully')
            }
            setDialogOpen(false)
            fetchGuards()
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
            await apiDeleteSecurityGuard(deleteTarget.emp_id)
            toast.success(`${deleteTarget.name} has been deactivated`)
            setDeleteOpen(false)
            setDeleteTarget(null)
            fetchGuards()
        } catch (err: any) {
            toast.error(err?.response?.data?.message || 'Delete failed')
        } finally {
            setActionLoading(false)
        }
    }

    const handleReactivate = async (guard: SecurityGuard) => {
        try {
            await apiUpdateSecurityGuard(guard.emp_id, { active: true })
            toast.success(`${guard.name} has been reactivated`)
            fetchGuards()
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
                            <Shield size={18} className="text-gray-600" />
                        </div>
                        <div>
                            <h1 className="text-[15px] font-bold text-gray-900 uppercase tracking-wide">Manage Security</h1>
                            <p className="text-[12px] text-gray-400 mt-0.5">
                                {loading ? 'Loading...' : `${guards.length} security guard${guards.length !== 1 ? 's' : ''} found`}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleCreate}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg text-[13px] font-semibold hover:bg-gray-800 transition shadow-sm"
                    >
                        <Plus size={15} />
                        Add Security Guard
                    </button>
                </div>
            </div>

            <div className="flex-1 bg-white rounded-md p-4 overflow-y-auto min-h-0" style={{ scrollbarWidth: 'thin', scrollbarColor: '#e5e7eb' }}>
                {loading ? (
                    <div className="flex items-center justify-center h-48">
                        <span className="text-[13px] text-gray-400 font-medium">Loading security guards...</span>
                    </div>
                ) : guards.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-48 text-center gap-3">
                        <Shield size={36} className="text-gray-200" />
                        <div>
                            <p className="font-semibold text-gray-700 text-[14px]">No Security Guards Found</p>
                            <p className="text-gray-400 text-[12px] mt-0.5">Click "Add Security Guard" to get started</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-1 pb-4">
                        {guards.map((guard) => (
                            <SecurityCard
                                key={guard._id}
                                guard={guard}
                                onEdit={handleEdit}
                                onDelete={handleDeleteClick}
                                onReactivate={handleReactivate}
                            />
                        ))}
                    </div>
                )}
            </div>

            <SecurityDialog
                open={dialogOpen}
                mode={dialogMode}
                guard={selectedGuard}
                onClose={() => setDialogOpen(false)}
                onSubmit={handleDialogSubmit}
                loading={actionLoading}
            />
            <DeleteConfirmDialog
                open={deleteOpen}
                name={deleteTarget?.name || ''}
                title="Remove Security Guard"
                description="This will mark the security guard as inactive. The record will be retained but deactivated."
                onClose={() => { setDeleteOpen(false); setDeleteTarget(null) }}
                onConfirm={handleDeleteConfirm}
                loading={actionLoading}
            />
        </div>
    )
}

export default ManageSecurity