import { useState } from 'react'
import { Input } from '@/components/ui'
import { Search, X } from 'lucide-react'

type SearchBarProps = {
    onSearch: (val: string) => void
    placeholder?: string
}

const SearchBar = ({ onSearch, placeholder = "Search student..." }: SearchBarProps) => {
    const [value, setValue] = useState('')

    const handleClear = () => {
        setValue('')
        onSearch('')
    }

    const handleChange = (val: string) => {
        setValue(val)
        onSearch(val)
    }

    return (
        <div className="relative w-full max-w-sm group">
            <Input
                value={value}
                placeholder={placeholder}
                size="sm"
                prefix={<Search className="text-base text-gray-400 group-focus-within:text-primary transition-colors" />}
                suffix={
                    value && (
                        <X
                            className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
                            onClick={handleClear}
                        />
                    )
                }
                onChange={(e) => handleChange(e.target.value)}
                className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 rounded-md focus:border-primary/50 text-xs font-medium placeholder:text-gray-400 placeholder:font-normal"
            />
        </div>
    )
}

export default SearchBar
