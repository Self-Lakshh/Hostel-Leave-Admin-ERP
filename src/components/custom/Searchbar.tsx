import { useState } from "react";
import { Search, X } from "lucide-react";
import GlassCard from '@/components/ui/GlassCard';

interface SearchBarProps {
  value?: string;
  placeholder?: string;
  onChange?: (val: string) => void;
  className?: string;
}

export default function SearchBar({
  value = "",
  placeholder = "Search by Enrollment Number",
  onChange,
  className = "",
}: SearchBarProps) {
  const [inputValue, setInputValue] = useState(value);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setInputValue(val);
    onChange?.(val);
  }

  function clearInput() {
    setInputValue("");
    onChange?.("");
  }

  return (
    <GlassCard size="sm" className={`w-[360px] h-[42px] rounded-[24px] flex items-center px-4 ${className}`} elevated={false}>
      {/* Frosted shimmer layer */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/45 via-white/20 to-transparent rounded-[24px]" />

      {/* Lucide Search Icon */}
      <Search className="relative z-10 text-black/60 w-5 h-5 mr-3 flex-shrink-0" />

      {/* Input Field */}
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        className="relative z-10 w-full bg-transparent outline-none text-black/90 placeholder:text-black/50 text-sm font-medium"
      />

      {/* Clear button */}
      {inputValue && (
        <button
          onClick={clearInput}
          className="relative z-10 ml-2 text-black/50 hover:text-black/80"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </GlassCard>
  );
}
