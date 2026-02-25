import { AlertTriangle, X } from 'lucide-react'

type DeleteConfirmDialogProps = {
    open: boolean
    name: string
    title?: string
    description?: string
    onClose: () => void
    onConfirm: () => Promise<void>
    loading: boolean
}

const DeleteConfirmDialog = ({
    open,
    name,
    title = 'Remove User',
    description = 'This will mark the user as inactive. The record will be retained but deactivated.',
    onClose,
    onConfirm,
    loading
}: DeleteConfirmDialogProps) => {
    if (!open) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm">
                <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100">
                    <h2 className="font-bold text-gray-900 text-[16px]">{title}</h2>
                    <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 transition">
                        <X size={16} className="text-gray-500" />
                    </button>
                </div>
                <div className="p-6 flex flex-col items-center gap-4 text-center">
                    <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                        <AlertTriangle size={22} className="text-red-500" />
                    </div>
                    <div>
                        <p className="text-gray-900 font-semibold text-[15px]">Remove <span className="text-red-600">{name}</span>?</p>
                        <p className="text-gray-500 text-[13px] mt-1">
                            {description}
                        </p>
                    </div>
                    <div className="flex gap-3 w-full pt-1">
                        <button
                            onClick={onClose}
                            className="flex-1 py-2.5 rounded-lg border border-gray-200 text-gray-600 text-[13px] font-semibold hover:bg-gray-50 transition"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={loading}
                            className="flex-1 py-2.5 rounded-lg bg-red-500 text-white text-[13px] font-semibold hover:bg-red-600 disabled:opacity-60 transition"
                        >
                            {loading ? 'Removing...' : 'Yes, Remove'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteConfirmDialog
