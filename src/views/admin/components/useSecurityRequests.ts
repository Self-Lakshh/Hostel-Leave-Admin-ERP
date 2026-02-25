import { useState, useCallback, useEffect, useMemo } from 'react'
import type { LeaveRequest } from '@/services/Admin'
import { toast } from 'sonner'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

dayjs.extend(isBetween)

type UseSecurityRequestsProps = {
    fetchFn: () => Promise<LeaveRequest[]>
    pageName: string
}

export const useSecurityRequests = ({ fetchFn, pageName }: UseSecurityRequestsProps) => {
    const [data, setData] = useState<LeaveRequest[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [dateRange, setDateRange] = useState({ from: '', to: '' })

    const fetchData = useCallback(async () => {
        setLoading(true)
        try {
            const response = await fetchFn()
            setData(response || [])
        } catch (error) {
            console.error(`Error fetching ${pageName}:`, error)
            toast.error(`Failed to load ${pageName}`)
        } finally {
            setLoading(false)
        }
    }, [fetchFn, pageName])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const filteredData = useMemo(() => {
        return data.filter((item) => {
            const matchesSearch =
                item.student_info.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.student_enrollment_number.toLowerCase().includes(searchTerm.toLowerCase())

            const itemDate = dayjs(item.applied_from)
            const matchesDate =
                (!dateRange.from || itemDate.isAfter(dayjs(dateRange.from).subtract(1, 'day'))) &&
                (!dateRange.to || itemDate.isBefore(dayjs(dateRange.to).add(1, 'day')))

            return matchesSearch && matchesDate
        })
    }, [data, searchTerm, dateRange])

    const handleExport = (type: 'pdf' | 'excel') => {
        if (filteredData.length === 0) {
            toast.warning('No data to export')
            return
        }

        const headers = ['STUDENT DETAILS', 'ENROLLMENT NO', 'HOSTEL', 'ROOM NO', 'APPLIED FROM', 'APPLIED TO', 'REASON', 'GATE OUT', 'GATE IN']

        const rows = filteredData.map(item => {
            const actions = item.security_guard_action || []

            // 1. Find actions by status or order
            let outAction = actions.find(a => a.action === 'out' || a.security_status === 'out')
            let inAction = actions.find(a => a.action === 'in' || a.security_status === 'in')

            if (!outAction && actions.length > 0) outAction = actions[0]
            if (!inAction && actions.length > 1) inAction = actions[1]

            const formatTime = (ts: any) => ts ? dayjs(ts).format('DD/MM/YYYY, hh:mm a') : '---'

            const getOutTime = () => {
                if (outAction) {
                    const raw = outAction.action_time || outAction.updated_at || outAction.updatedAt || outAction.created_at || outAction.createdAt
                    if (raw) return formatTime(raw)
                    if (outAction._id && outAction._id.length === 24) {
                        const ts = parseInt(outAction._id.substring(0, 8), 16) * 1000
                        if (!isNaN(ts)) return formatTime(new Date(ts))
                    }
                }
                if (item.security_status === 'out' || item.security_status === 'in') return formatTime(item.updated_at)
                return '---'
            }

            const getInTime = () => {
                if (inAction) {
                    const raw = inAction.action_time || inAction.updated_at || inAction.updatedAt || inAction.created_at || inAction.createdAt
                    if (raw) return formatTime(raw)
                    if (inAction._id && inAction._id.length === 24) {
                        const ts = parseInt(inAction._id.substring(0, 8), 16) * 1000
                        if (!isNaN(ts)) return formatTime(new Date(ts))
                    }
                }
                if (item.security_status === 'in') return formatTime(item.updated_at)
                return '---'
            }

            return [
                item.student_info.name,
                item.student_enrollment_number,
                item.student_info.hostel_name,
                item.student_info.room_no,
                dayjs(item.applied_from).format('DD/MM/YYYY, hh:mm a'),
                item.applied_to ? dayjs(item.applied_to).format('DD/MM/YYYY, hh:mm a') : 'N/A',
                item.reason || '',
                getOutTime(),
                getInTime(),
            ]
        })

        const fileName = `${pageName.replace(/\s/g, '_')}_${dayjs().format('DDMMYYYY_HHmm')}`

        if (type === 'excel') {
            const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows])
            const workbook = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Records')
            XLSX.writeFile(workbook, `${fileName}.xlsx`)
        } else {
            const doc = new jsPDF('landscape')
            doc.setFontSize(16)
            doc.text(pageName, 14, 15)
            doc.setFontSize(10)
            doc.text(`Generated on: ${dayjs().format('DD/MM/YYYY, hh:mm a')}`, 14, 22)

            autoTable(doc, {
                head: [headers],
                body: rows,
                startY: 25,
                styles: { fontSize: 8, cellPadding: 2 },
                headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255], fontStyle: 'bold' },
                alternateRowStyles: { fillColor: [245, 245, 245] },
                margin: { top: 25 },
            })
            doc.save(`${fileName}.pdf`)
        }

        toast.success(`${pageName} exported successfully`)
    }

    return {
        data: filteredData,
        loading,
        setSearchTerm,
        setDateRange: (range: { from?: string; to?: string }) => setDateRange(prev => ({ ...prev, ...range })),
        handleExport,
        refresh: fetchData,
    }
}
