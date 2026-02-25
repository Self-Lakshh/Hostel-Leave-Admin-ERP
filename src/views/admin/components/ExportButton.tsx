import { Button, Dropdown } from '@/components/ui'
import { Download, FileSpreadsheet, FileText } from 'lucide-react'

type ExportButtonProps = {
    onExport: (type: 'pdf' | 'excel') => void
}

const ExportButton = ({ onExport }: ExportButtonProps) => {
    return (
        <Dropdown
            renderTitle={
                <Button
                    variant="solid"
                    icon={<Download className="w-4 h-4" />}
                    size="sm"
                    className="rounded-md bg-primary hover:bg-primary-deep text-white font-bold px-5"
                >
                    Export
                </Button>
            }
            placement="bottom-end"
        >
            <Dropdown.Item onClick={() => onExport('excel')}>
                <div className="flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-semibold">Excel CSV</span>
                </div>
            </Dropdown.Item>
            <Dropdown.Item onClick={() => onExport('pdf')}>
                <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-red-600" />
                    <span className="text-xs font-semibold">PDF Report</span>
                </div>
            </Dropdown.Item>
        </Dropdown>
    )
}

export default ExportButton
