import { useEffect, useState } from 'react'
import { X, ChevronDown } from 'lucide-react'
import { apiGetAllHostels } from '@/services/admin/Warden'
import type { Hostel } from '@/@types/hostel'
import type { Warden, CreateWardenPayload, UpdateWardenPayload, WardenRole } from '@/@types/warden'

type Mode = 'create' | 'edit'

type WardenDialogProps = {
    open: boolean
    mode: Mode
    roleFilter: WardenRole
    warden?: Warden | null
    onClose: () => void
    onSubmit: (data: CreateWardenPayload | UpdateWardenPayload) => Promise<void>
    loading: boolean
}

const inputClass =
    'w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition placeholder-gray-300 bg-white'
const labelClass = 'block text-[12px] font-semibold text-gray-600 mb-1'

/** Pull display name from hostel object — API may use `name`, `hostel_name`, or just `hostel_id` */
const getHostelLabel = (h: Hostel) =>
    h.name || h.hostel_name || h.hostel_id

const WardenDialog = ({ open, mode, roleFilter, warden, onClose, onSubmit, loading }: WardenDialogProps) => {
    const [form, setForm] = useState({
        name: '',
        emp_id: '',
        phone_no: '',
        email: '',
        hostel_id: '',
    })

    const [hostels, setHostels] = useState<Hostel[]>([])
    const [hostelsLoading, setHostelsLoading] = useState(false)

    // Fetch hostels whenever dialog opens
    useEffect(() => {
        if (!open) return
        setHostelsLoading(true)
        apiGetAllHostels()
            .then((res) => {
                const list = res.hostels ?? res.data ?? []
                console.log('🏨 Hostels response:', res)
                setHostels(list)
            })
            .catch((err) => {
                console.error('Failed to load hostels:', err)
                setHostels([])
            })
            .finally(() => setHostelsLoading(false))
    }, [open])

    // Prefill on edit
    useEffect(() => {
        if (mode === 'edit' && warden) {
            setForm({
                name: warden.name,
                emp_id: warden.emp_id,
                phone_no: warden.phone_no,
                email: warden.email,
                hostel_id: warden.hostel_id?.[0] ?? '',
            })
        } else {
            setForm({ name: '', emp_id: '', phone_no: '', email: '', hostel_id: '' })
        }
    }, [mode, warden, open])

    if (!open) return null

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (mode === 'create') {
            await onSubmit({
                wardenType: roleFilter,
                name: form.name,
                emp_id: form.emp_id,
                hostel_id: form.hostel_id,
                phone_no: form.phone_no,
                email: form.email,
            } as CreateWardenPayload)
        } else {
            const payload: UpdateWardenPayload = {}
            if (form.name) payload.name = form.name
            if (form.phone_no) payload.phone_no = form.phone_no
            if (form.email) payload.email = form.email
            if (form.hostel_id) payload.hostel_id = [form.hostel_id]
            await onSubmit(payload)
        }
    }

    const isCreate = mode === 'create'
    const title = isCreate
        ? `Add ${roleFilter === 'senior_warden' ? 'Senior Warden' : 'Asst. Warden'}`
        : `Edit ${warden?.role === 'senior_warden' ? 'Senior Warden' : 'Asst. Warden'}`

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
                {/* Header */}
                <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100">
                    <h2 className="font-bold text-gray-900 text-[16px]">{title}</h2>
                    <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 transition">
                        <X size={16} className="text-gray-500" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
                    <div>
                        <label className={labelClass}>Full Name *</label>
                        <input name="name" value={form.name} onChange={handleChange} required placeholder="e.g. Ramesh Kumar" className={inputClass} />
                    </div>

                    {isCreate && (
                        <div>
                            <label className={labelClass}>Employee ID *</label>
                            <input name="emp_id" value={form.emp_id} onChange={handleChange} required placeholder="e.g. WARDEN-EMP001" className={inputClass} />
                        </div>
                    )}

                    <div>
                        <label className={labelClass}>Phone Number *</label>
                        <input name="phone_no" value={form.phone_no} onChange={handleChange} required placeholder="10-digit mobile number" className={inputClass} />
                    </div>

                    <div>
                        <label className={labelClass}>Email *</label>
                        <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="email@spsu.ac.in" className={inputClass} />
                    </div>

                    {/* ── Hostel Dropdown ── */}
                    <div>
                        <label className={labelClass}>Hostel *</label>
                        <div className="relative">
                            <select
                                name="hostel_id"
                                value={form.hostel_id}
                                onChange={handleChange}
                                required
                                disabled={hostelsLoading}
                                className={`${inputClass} appearance-none pr-9 ${hostelsLoading ? 'opacity-60 cursor-wait' : ''}`}
                            >
                                <option value="" disabled>
                                    {hostelsLoading ? 'Loading hostels...' : 'Select a hostel'}
                                </option>
                                {hostels.map((h) => (
                                    <option key={h.hostel_id} value={h.hostel_id}>
                                        {getHostelLabel(h)}
                                    </option>
                                ))}
                                {/* Fallback: if API returns empty, allow manual type */}
                                {hostels.length === 0 && !hostelsLoading && (
                                    <option value="" disabled>No hostels found</option>
                                )}
                            </select>
                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                        {/* Fallback input if no hostels loaded */}
                        {!hostelsLoading && hostels.length === 0 && (
                            <input
                                name="hostel_id"
                                value={form.hostel_id}
                                onChange={handleChange}
                                placeholder="Enter hostel ID manually (e.g. HOSTEL-BH1)"
                                className={`${inputClass} mt-2`}
                            />
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-2.5 rounded-lg border border-gray-200 text-gray-600 text-[13px] font-semibold hover:bg-gray-50 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading || hostelsLoading}
                            className="flex-1 py-2.5 rounded-lg bg-indigo-600 text-white text-[13px] font-semibold hover:bg-indigo-700 disabled:opacity-60 transition"
                        >
                            {loading ? 'Saving...' : isCreate ? 'Create' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default WardenDialog
