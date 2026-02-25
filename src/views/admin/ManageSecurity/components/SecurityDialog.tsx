import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import type { SecurityGuard, CreateSecurityGuardPayload, UpdateSecurityGuardPayload } from '@/@types/security'

type Mode = 'create' | 'edit'

type SecurityDialogProps = {
    open: boolean
    mode: Mode
    guard?: SecurityGuard | null
    onClose: () => void
    onSubmit: (data: CreateSecurityGuardPayload | UpdateSecurityGuardPayload) => Promise<void>
    loading: boolean
}

const inputClass =
    'w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition placeholder-gray-300 bg-white'
const labelClass = 'block text-[12px] font-semibold text-gray-600 mb-1'

const SecurityDialog = ({ open, mode, guard, onClose, onSubmit, loading }: SecurityDialogProps) => {
    const [form, setForm] = useState({
        name: '',
        emp_id: '',
        phone_no: '',
        email: '',
    })

    useEffect(() => {
        if (mode === 'edit' && guard) {
            setForm({
                name: guard.name,
                emp_id: guard.emp_id,
                phone_no: guard.phone_no,
                email: guard.email,
            })
        } else {
            setForm({ name: '', emp_id: '', phone_no: '', email: '' })
        }
    }, [mode, guard, open])

    if (!open) return null

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (mode === 'create') {
            await onSubmit({
                name: form.name,
                phone_no: form.phone_no,
                email: form.email,
                emp_id: form.emp_id,
            } as CreateSecurityGuardPayload)
        } else {
            const payload: UpdateSecurityGuardPayload = {}
            if (form.name) payload.name = form.name
            if (form.phone_no) payload.phone_no = form.phone_no
            if (form.email) payload.email = form.email
            await onSubmit(payload)
        }
    }

    const isCreate = mode === 'create'
    const title = isCreate ? 'Add Security Guard' : 'Edit Security Guard'

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
                        <input name="name" value={form.name} onChange={handleChange} required placeholder="e.g. Rahul Singh" className={inputClass} />
                    </div>

                    {isCreate && (
                        <div>
                            <label className={labelClass}>Employee ID *</label>
                            <input name="emp_id" value={form.emp_id} onChange={handleChange} required placeholder="e.g. EMP002" className={inputClass} />
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
                            disabled={loading}
                            className="flex-1 py-2.5 rounded-lg bg-gray-700 text-white text-[13px] font-semibold hover:bg-gray-800 disabled:opacity-60 transition"
                        >
                            {loading ? 'Saving...' : isCreate ? 'Create' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SecurityDialog
