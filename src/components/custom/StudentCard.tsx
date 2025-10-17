import React from "react";
import GlassCard from '@/components/ui/GlassCard';

interface StudentCardProps {
  name: string;
  enrollNumber: string;
  image?: string;
  onClick?: () => void;
}

const StudentCard: React.FC<StudentCardProps> = ({ name, enrollNumber, image, onClick }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <GlassCard
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') onClick?.();
      }}
      className="flex items-center gap-4 cursor-pointer"
    >
      {/* Avatar */}
      {image ? (
        <img
          src={image}
          alt={name}
          className="w-12 h-12 rounded-full object-cover border border-primary/30"
        />
      ) : (
        <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center">
          <span className="text-primary font-semibold text-base">{initials}</span>
        </div>
      )}

      {/* Vertical separator line */}
      <div className="w-px h-10 bg-border" />

      {/* Student Info */}
      <div className="flex flex-col text-left">
        <h3 className="font-semibold text-base text-foreground">{name}</h3>
        <p className="text-sm text-muted-foreground">{enrollNumber}</p>
      </div>
    </GlassCard>
  );
};

export default React.memo(StudentCard);
