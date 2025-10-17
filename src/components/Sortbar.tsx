import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

type Option = "all" | "pending" | "approved" | "rejected";

const LABELS: Record<Option, string> = {
  all: "All",
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
};

export default function Sortbar({
  defaultOption = "all",
  onChange,
  className = "",
}: {
  defaultOption?: Option;
  onChange?: (option: Option) => void;
  className?: string;
}) {
  const [active, setActive] = useState<Option>(defaultOption);
  const refs = useRef<Record<Option, HTMLButtonElement | null>>({
    all: null,
    pending: null,
    approved: null,
    rejected: null,
  });
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const el = refs.current[active];
    if (el) {
      const rect = el.getBoundingClientRect();
      const parent = el.parentElement?.getBoundingClientRect();
      if (rect && parent) {
        setIndicator({
          left: rect.left - parent.left,
          width: rect.width,
        });
      }
    }
  }, [active]);

  function handleClick(opt: Option) {
    setActive(opt);
    onChange?.(opt);
  }

  return (
    <div
      className={`relative w-[360px] h-[42px] rounded-[24px]
      bg-[rgba(255,255,255,0.55)] backdrop-blur-[25px]
      border border-[rgba(255,255,255,0.7)]
      shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),0_4px_25px_rgba(0,0,0,0.06)]
      flex items-center justify-between px-[8px] overflow-hidden ${className}`}
    >
      {/* Frosted shimmer layer */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/45 via-white/20 to-transparent rounded-[24px]" />

      {/* Black-glass indicator capsule */}
      <motion.div
        className="absolute top-[5px] h-[30px] bg-[rgba(0,0,0,0.9)] rounded-[18px]
        shadow-[inset_0_1px_2px_rgba(255,255,255,0.25),0_2px_6px_rgba(0,0,0,0.35)]"
        animate={{ left: indicator.left, width: indicator.width }}
        transition={{ type: "spring", stiffness: 280, damping: 26 }}
      />

      {/* Buttons */}
      {Object.keys(LABELS).map((opt) => (
        <button
          key={opt}
          ref={(el) => { refs.current[opt as Option] = el; }}
          onClick={() => handleClick(opt as Option)}
          className={`relative z-10 flex-1 text-center text-[14px] leading-[22px]
          font-medium transition-all duration-200 select-none font-[system-ui]
          ${active === opt
              ? "text-white"
              : "text-black/70 hover:text-black/90"
            }`}
        >
          {LABELS[opt as Option]}
        </button>
      ))}
    </div>
  );
}
