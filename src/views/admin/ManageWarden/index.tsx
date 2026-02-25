import { useEffect, useState, useCallback } from 'react'
import { Plus, RefreshCw, Shield } from 'lucide-react'
import { toast } from 'sonner'
import {
    apiGetAllWardens,
    apiCreateWarden,
    apiUpdateWarden,
    apiDeleteWarden,
} from '@/services/admin/Warden'
import type { Warden, CreateWardenPayload, UpdateWardenPayload } from '@/@types/warden'
import WardenCard from './components/WardenCard'
import WardenDialog from './components/WardenDialog'
import DeleteConfirmDialog from './components/DeleteConfirmDialog'

const ManageWarden = () => {
    const [wardens, setWardens] = useState<Warden[]>([])
    const [loading, setLoading] = useState(true)
    const [actionLoading, setActionLoading] = useState(false)

    // Dialog state
    const [dialogOpen, setDialogOpen] = useState(false)
    const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create')
    const [selectedWarden, setSelectedWarden] = useState<Warden | null>(null)

    // Delete confirm state
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [deleteTarget, setDeleteTarget] = useState<Warden | null>(null)

    // Only show senior_wardens on this page
    const seniorWardens = wardens.filter((w) => w.role === 'senior_warden')

    const fetchWardens = useCallback(async () => {
        setLoading(true)
        try {
            const res = await apiGetAllWardens()
            setWardens(res.wardens || [])
        } catch {
            toast.error('Failed to fetch wardens')
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchWardens()
    }, [fetchWardens])

    const handleCreate = () => {
        setSelectedWarden(null)
        setDialogMode('create')
        setDialogOpen(true)
    }

    const handleEdit = (warden: Warden) => {
        setSelectedWarden(warden)
        setDialogMode('edit')
        setDialogOpen(true)
    }

    const handleDeleteClick = (warden: Warden) => {
        setDeleteTarget(warden)
        setDeleteOpen(true)
    }

    const handleDialogSubmit = async (data: CreateWardenPayload | UpdateWardenPayload) => {
        setActionLoading(true)
        try {
            if (dialogMode === 'create') {
                await apiCreateWarden(data as CreateWardenPayload)
                toast.success('Warden created successfully')
            } else if (selectedWarden) {
                await apiUpdateWarden(selectedWarden.emp_id, data as UpdateWardenPayload)
                toast.success('Warden updated successfully')
            }
            setDialogOpen(false)
            fetchWardens()
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
            await apiDeleteWarden(deleteTarget.emp_id)
            toast.success(`${deleteTarget.name} has been deactivated`)
            setDeleteOpen(false)
            setDeleteTarget(null)
            fetchWardens()
        } catch (err: any) {
            toast.error(err?.response?.data?.message || 'Delete failed')
        } finally {
            setActionLoading(false)
        }
    }

    const handleReactivate = async (warden: Warden) => {
        try {
            await apiUpdateWarden(warden.emp_id, { active: true })
            toast.success(`${warden.name} has been reactivated`)
            fetchWardens()
        } catch (err: any) {
            toast.error(err?.response?.data?.message || 'Reactivation failed')
        }
    }

    return (
        <div className="flex flex-col h-full gap-4 overflow-hidden">

            {/* ── Fixed header section ── */}
            <div className="flex-shrink-0 bg-white rounded-xl border border-gray-100 shadow-sm px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center">
                            <Shield size={18} className="text-indigo-600" />
                        </div>
                        <div>
                            <h1 className="text-[15px] font-bold text-gray-900 uppercase tracking-wide">Manage Senior Wardens</h1>
                            <p className="text-[12px] text-gray-400 mt-0.5">
                                {loading ? 'Loading...' : `${seniorWardens.length} senior warden${seniorWardens.length !== 1 ? 's' : ''} found`}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleCreate}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg text-[13px] font-semibold hover:bg-gray-800 transition shadow-sm"
                    >
                        <Plus size={15} />
                        Add Warden
                    </button>
                </div>
            </div>

            {/* ── Scrollable card grid ── */}
            <div className="flex-1 bg-white rounded-md p-4 overflow-y-auto min-h-0" style={{ scrollbarWidth: 'thin', scrollbarColor: '#e5e7eb' }}>
                {loading ? (
                    <div className="flex items-center justify-center h-48">
                        <span className="text-[13px] text-gray-400 font-medium">Loading wardens...</span>
                    </div>
                ) : seniorWardens.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-48 text-center gap-3">
                        <Shield size={36} className="text-gray-200" />
                        <div>
                            <p className="font-semibold text-gray-700 text-[14px]">No Senior Wardens Found</p>
                            <p className="text-gray-400 text-[12px] mt-0.5">Click "Add Warden" to get started</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-1 pb-4">
                        {seniorWardens.map((w) => (
                            <WardenCard
                                key={w._id}
                                warden={w}
                                onEdit={handleEdit}
                                onDelete={handleDeleteClick}
                                onReactivate={handleReactivate}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Dialogs */}
            <WardenDialog
                open={dialogOpen}
                mode={dialogMode}
                roleFilter="senior_warden"
                warden={selectedWarden}
                onClose={() => setDialogOpen(false)}
                onSubmit={handleDialogSubmit}
                loading={actionLoading}
            />
            <DeleteConfirmDialog
                open={deleteOpen}
                name={deleteTarget?.name || ''}
                title="Remove Warden"
                description="This will mark the warden as inactive. The record will be retained but deactivated."
                onClose={() => { setDeleteOpen(false); setDeleteTarget(null) }}
                onConfirm={handleDeleteConfirm}
                loading={actionLoading}
            />
        </div>
    )
}

export default ManageWarden