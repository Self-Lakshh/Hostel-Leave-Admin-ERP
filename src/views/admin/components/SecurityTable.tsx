import { useMemo } from 'react'
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    flexRender,
    createColumnHelper,
} from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'
import type { LeaveRequest } from '@/services/Admin'
import { Button, Spinner, Avatar } from '@/components/ui'
import dayjs from 'dayjs'
import { User, MapPin, Calendar, Clock, AlertCircle } from 'lucide-react'
import classNames from '@/utils/classNames'

type SecurityTableProps = {
    data: LeaveRequest[]
    loading: boolean
    actionType?: 'out' | 'in'
    onAction?: (requestId: string) => void
    showActualOut?: boolean
    showActualIn?: boolean
}

const columnHelper = createColumnHelper<LeaveRequest>()

const SecurityTable = ({
    data,
    loading,
    actionType,
    onAction,
    showActualOut = false,
    showActualIn = false,
}: SecurityTableProps) => {
    const columns = useMemo(() => {
        const baseColumns: ColumnDef<LeaveRequest, any>[] = [
            columnHelper.accessor('student_info.name', {
                header: 'STUDENT DETAILS',
                cell: (props) => (
                    <div className="flex flex-col gap-0.5 py-1">
                        <span className="font-bold text-black text-[14px] uppercase tracking-tight">
                            {props.getValue()}
                        </span>
                        <span className="text-[12px] text-gray-900 font-mono">
                            {props.row.original.student_enrollment_number}
                        </span>
                    </div>
                ),
            }),
            columnHelper.accessor('student_info.hostel_name', {
                header: 'HOSTEL & ROOM',
                cell: (props) => (
                    <div className="flex flex-col gap-0.5">
                        <span className="text-gray-900 font-bold text-[12px]">
                            {props.getValue()}
                        </span>
                        <span className="text-[11px] text-gray-800 font-medium">
                            Room {props.row.original.student_info.room_no}
                        </span>
                    </div>
                ),
            }),
            columnHelper.display({
                id: 'appliedDuration',
                header: 'APPLIED DURATION',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex flex-col gap-1 min-w-[150px]">
                            <div className="flex items-center gap-2">
                                <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-1 rounded">FROM</span>
                                <span className="text-[11px] text-black font-semibold">
                                    {dayjs(row.applied_from).format('DD/MM/YYYY, hh:mm a')}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[9px] font-black text-orange-600 bg-orange-50 px-1 rounded pl-1.5">TO</span>
                                <span className="text-[11px] text-black font-semibold">
                                    {dayjs(row.applied_to).format('DD/MM/YYYY, hh:mm a')}
                                </span>
                            </div>
                        </div>
                    )
                },
            }),
        ]

        if (showActualOut || showActualIn) {
            baseColumns.push(columnHelper.display({
                id: 'actualMovement',
                header: 'GATE LOGS',
                cell: (props) => {
                    const row = props.row.original
                    const actions = row.security_guard_action || []

                    // 1. Find actions by status or order
                    let outAction = actions.find(a => a.action === 'out' || a.security_status === 'out')
                    let inAction = actions.find(a => a.action === 'in' || a.security_status === 'in')

                    if (!outAction && actions.length > 0) outAction = actions[0]
                    if (!inAction && actions.length > 1) inAction = actions[1]

                    // 2. Resilient Timestamp Derivation
                    const formatTime = (ts: any) => ts ? dayjs(ts).format('DD/MM/YYYY, hh:mm a') : null

                    const getOutTime = () => {
                        // Priority 1: Action sub-document timestamps
                        if (outAction) {
                            const raw = outAction.action_time || outAction.updated_at || outAction.updatedAt || outAction.created_at || outAction.createdAt
                            if (raw) return formatTime(raw)

                            // MongoDB ID extraction
                            if (outAction._id && outAction._id.length === 24) {
                                const ts = parseInt(outAction._id.substring(0, 8), 16) * 1000
                                if (!isNaN(ts)) return formatTime(new Date(ts))
                            }
                        }
                        // Priority 2: Doc update time if status is 'out' or student has already come back 'in'
                        if (row.security_status === 'out' || row.security_status === 'in') {
                            return formatTime(row.updated_at)
                        }
                        return '---'
                    }

                    const getInTime = () => {
                        // Priority 1: Action sub-document timestamps
                        if (inAction) {
                            const raw = inAction.action_time || inAction.updated_at || inAction.updatedAt || inAction.created_at || inAction.createdAt
                            if (raw) return formatTime(raw)

                            if (inAction._id && inAction._id.length === 24) {
                                const ts = parseInt(inAction._id.substring(0, 8), 16) * 1000
                                if (!isNaN(ts)) return formatTime(new Date(ts))
                            }
                        }
                        // Priority 2: If status is 'in', document last update MUST be the entry time
                        if (row.security_status === 'in') {
                            return formatTime(row.updated_at)
                        }
                        return '---'
                    }

                    return (
                        <div className="flex flex-col gap-1 min-w-[150px]">
                            {showActualOut && (
                                <div className="flex items-center gap-2">
                                    <span className="text-[9px] font-black text-red-600 bg-red-50 px-1 rounded">OUT</span>
                                    <span className={classNames(
                                        "text-[11px] font-semibold",
                                        (outAction || row.security_status !== 'pending') ? "text-black" : "text-gray-300 italic font-normal"
                                    )}>
                                        {getOutTime()}
                                    </span>
                                </div>
                            )}
                            {showActualIn && (
                                <div className="flex items-center gap-2">
                                    <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-1 rounded pl-1.5">IN</span>
                                    <span className={classNames(
                                        "text-[11px] font-semibold",
                                        (inAction || row.security_status === 'in') ? "text-black" : "text-gray-300 italic font-normal"
                                    )}>
                                        {getInTime()}
                                    </span>
                                </div>
                            )}
                        </div>
                    )
                },
            }))
        }

        baseColumns.push(columnHelper.accessor('reason', {
            header: 'REASON',
            cell: (props) => (
                <div className="min-w-[200px] whitespace-normal break-words text-[12px] text-gray-900 font-medium leading-relaxed">
                    {props.getValue()}
                </div>
            ),
        }))

        if (actionType) {
            baseColumns.push(
                columnHelper.display({
                    id: 'action',
                    header: () => <div className="text-right">ACTION</div>,
                    cell: (props) => (
                        <div className="text-right">
                            <button
                                className={classNames(
                                    'px-6 py-1.5 rounded font-bold text-[11px] uppercase transition-all shadow-sm',
                                    actionType === 'out'
                                        ? 'bg-red-600 text-white hover:bg-red-700'
                                        : 'bg-emerald-600 text-white hover:bg-emerald-700'
                                )}
                                onClick={() => onAction?.(props.row.original.request_id)}
                            >
                                {actionType}
                            </button>
                        </div>
                    ),
                })
            )
        }

        return baseColumns
    }, [actionType, onAction, showActualOut, showActualIn])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    })

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-full gap-4">
                <Spinner size={32} />
                <span className="text-black font-bold uppercase tracking-widest text-[10px]">Processing...</span>
            </div>
        )
    }

    if (data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <AlertCircle className="w-10 h-10 text-gray-200 mb-2" />
                <h4 className="text-black font-bold uppercase tracking-tight text-sm">No records found</h4>
            </div>
        )
    }

    return (
        <div className="flex-1 overflow-y-auto custom-scrollbar relative h-full">
            <table className="w-full border-collapse">
                <thead className="sticky top-0 z-10 bg-gray-50 border-b border-gray-200">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    style={{ width: header.getSize() }}
                                    className="py-3.5 px-6 text-[11px] font-black text-gray-900 uppercase tracking-widest text-left"
                                >
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {table.getRowModel().rows.map((row) => (
                        <tr
                            key={row.id}
                            className="hover:bg-gray-50/50 transition-colors"
                        >
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="py-4 px-6 align-middle">
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default SecurityTable
