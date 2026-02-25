import { Phone, Mail, Pencil, Trash2, RotateCcw } from 'lucide-react'
import type { ReactNode } from 'react'
import type { Admin } from '@/@types/admin'

type AdminCardProps = {
    admin: Admin
    onEdit: (admin: Admin) => void
    onDelete: (admin: Admin) => void
    onReactivate: (admin: Admin) => void
}

const getInitials = (name: string) =>
    name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)

const avatarBgs = [
    'bg-slate-100 text-slate-600',
    'bg-zinc-100 text-zinc-600',
    'bg-stone-100 text-stone-600',
    'bg-neutral-100 text-neutral-600',
    'bg-gray-100 text-gray-600',
]
const getAvatarBg = (id: string) => avatarBgs[id.charCodeAt(0) % avatarBgs.length]

const AdminCard = ({ admin, onEdit, onDelete, onReactivate }: AdminCardProps) => {
    const isActive = admin.active

    return (
        <div className="w-full bg-white rounded-2xl border-2 border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200 flex flex-col overflow-hidden">
            {/* ── Content (fades when inactive) ── */}
            <div className={`flex flex-col flex-1 transition-opacity duration-200 ${!isActive ? 'opacity-40' : ''}`}>
                <div className="p-5 flex flex-col gap-4 flex-1">
                    {/* Header */}
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 ${getAvatarBg(admin._id)}`}>
                            {getInitials(admin.name)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 text-[14px] truncate leading-tight">{admin.name}</p>
                            <p className="text-[11px] text-gray-400 font-mono mt-0.5">{admin.emp_id}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1 flex-shrink-0">
                            <span className="text-[11px] text-gray-500 font-medium">Admin</span>
                            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md
                                ${isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}>
                                {isActive ? 'Active' : 'Inactive'}
                            </span>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-100" />

                    {/* Info rows */}
                    <div className="flex flex-col gap-2.5">
                        <InfoRow icon={<Phone size={13} />} text={admin.phone_no} />
                        <InfoRow icon={<Mail size={13} />} text={admin.email} />
                    </div>
                </div>
            </div>

            {/* ── Actions — always full opacity ── */}
            <div className="px-5 pb-5 pt-1 flex gap-2">
                {!isActive ? (
                    <button
                        onClick={() => onReactivate(admin)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl
                            text-[12px] font-bold text-white bg-gray-700 hover:bg-gray-800
                            active:scale-95 transition-all shadow-sm"
                    >
                        <RotateCcw size={12} /> Reactivate
                    </button>
                ) : (
                    <>
                        <button
                            onClick={() => onEdit(admin)}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl
                                text-[12px] font-bold text-gray-700 bg-gray-100 hover:bg-gray-200
                                border border-gray-200 hover:border-gray-300 active:scale-95 transition-all"
                        >
                            <Pencil size={12} /> Edit
                        </button>
                        <button
                            onClick={() => onDelete(admin)}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl
                                text-[12px] font-bold text-white bg-red-500 hover:bg-red-600
                                active:scale-95 transition-all shadow-sm"
                        >
                            <Trash2 size={12} /> Remove
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

const InfoRow = ({ icon, text }: { icon: ReactNode; text: string }) => (
    <div className="flex items-center gap-2.5 text-gray-500">
        <span className="flex-shrink-0 text-gray-300">{icon}</span>
        <span className="text-[12px] truncate">{text}</span>
    </div>
)

export default AdminCard
