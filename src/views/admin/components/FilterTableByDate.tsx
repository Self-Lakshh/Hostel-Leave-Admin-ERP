import { useRef, useState } from 'react'
import { X, ArrowRight } from 'lucide-react'
import classNames from '@/utils/classNames'

type FilterTableByDateProps = {
    onDateChange: (from: string, to: string) => void
}

const FilterTableByDate = ({ onDateChange }: FilterTableByDateProps) => {
    const fromRef = useRef<HTMLInputElement>(null)
    const toRef = useRef<HTMLInputElement>(null)
    const [dates, setDates] = useState({ from: '', to: '' })

    const handleDateChange = (type: 'from' | 'to', value: string) => {
        const newDates = { ...dates, [type]: value }
        setDates(newDates)
        onDateChange(newDates.from, newDates.to)
    }

    const handleReset = () => {
        setDates({ from: '', to: '' })
        if (fromRef.current) fromRef.current.value = ''
        if (toRef.current) toRef.current.value = ''
        onDateChange('', '')
    }

    const hasValue = dates.from || dates.to

    return (
        <div className="flex items-end gap-3">
            {/* Start Date Section */}
            <div className="flex flex-col gap-1.5">
                <span className={classNames(
                    "text-[10px] font-black uppercase tracking-widest leading-none ml-2 transition-colors",
                    dates.from ? "text-primary" : "text-gray-400"
                )}>
                    Start Date
                </span>
                <div
                    className={classNames(
                        "relative flex items-center h-[38px] border rounded-md px-5 cursor-pointer transition-all shadow-sm group min-w-[150px]",
                        dates.from
                            ? "bg-primary/5 border-primary/50 shadow-md shadow-primary/5"
                            : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
                    )}
                    onClick={() => fromRef.current?.showPicker()}
                >
                    <input
                        ref={fromRef}
                        type="date"
                        className={classNames(
                            "bg-transparent border-none p-0 text-[11px] font-bold focus:ring-0 outline-none w-full cursor-pointer appearance-none",
                            dates.from ? "text-gray-900 dark:text-gray-100" : "text-gray-400 dark:text-gray-500"
                        )}
                        onChange={(e) => handleDateChange('from', e.target.value)}
                    />
                </div>
            </div>

            <div className="flex items-center justify-center mb-[11px]">
                <ArrowRight className={classNames(
                    "w-4 h-4 transition-colors",
                    hasValue ? "text-primary" : "text-gray-300 dark:text-gray-700"
                )} />
            </div>

            {/* End Date Section */}
            <div className="flex flex-col gap-1.5">
                <span className={classNames(
                    "text-[10px] font-black uppercase tracking-widest leading-none ml-2 transition-colors",
                    dates.to ? "text-primary" : "text-gray-400"
                )}>
                    End Date
                </span>
                <div
                    className={classNames(
                        "relative flex items-center h-[38px] border rounded-md px-5 cursor-pointer transition-all shadow-sm group min-w-[150px]",
                        dates.to
                            ? "bg-primary/5 border-primary/50 shadow-md shadow-primary/5"
                            : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
                    )}
                    onClick={() => toRef.current?.showPicker()}
                >
                    <input
                        ref={toRef}
                        type="date"
                        className={classNames(
                            "bg-transparent border-none p-0 text-[11px] font-bold focus:ring-0 outline-none w-full cursor-pointer appearance-none",
                            dates.to ? "text-gray-900 dark:text-gray-100" : "text-gray-400 dark:text-gray-500"
                        )}
                        onChange={(e) => handleDateChange('to', e.target.value)}
                    />
                </div>
            </div>

            {hasValue && (
                <button
                    onClick={handleReset}
                    className="h-[38px] w-[38px] flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-900 rounded-md transition-all border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm"
                    title="Clear filter"
                >
                    <X className="w-3.5 h-3.5" />
                </button>
            )}
        </div>
    )
}

export default FilterTableByDate
