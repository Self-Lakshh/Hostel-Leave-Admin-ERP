import React from 'react';
import { Mail, Phone, Edit3, Trash2, Building2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "../../utils/cn";
import GlassCard from '@/components/ui/GlassCard';

export interface Staff {
  id: string;
  empId: string;
  name: string;
  email: string;
  phone: string;
  hostel?: string;
  active: boolean;
}

interface InfoCardProps {
  staff: Staff;
  onEdit?: (id: string) => void;
  onRemove?: (id: string) => void;
  onActivate?: (id: string) => void;
}

const InfoCard: React.FC<InfoCardProps> = ({ staff, onEdit, onRemove, onActivate }) => {
  const initials = staff.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const isActive = staff.active;

  return (
    <GlassCard className="relative flex flex-col items-center text-center space-y-4 group" elevated>
      {/* Frost overlay for inactive */}
      {!isActive && (
        <div className="absolute inset-0 rounded-2xl bg-white/30 backdrop-blur-[2px] pointer-events-none transition-all" />
      )}

      {/* Avatar */}
      <div
        className={cn(
          "w-20 h-20 rounded-full flex items-center justify-center text-xl font-semibold border shadow-md z-10 transition-all",
          isActive
            ? "bg-primary/10 border-2 border-primary/30 text-primary opacity-100"
            : "bg-primary/5 border-2 border-primary/20 text-muted-foreground opacity-60"
        )}
      >
        {initials}
      </div>

      {/* Name + empId */}
      <div className="space-y-1 transition-all">
        <h3
          className={cn(
            "font-semibold text-lg tracking-wide transition-colors",
            isActive ? "text-foreground opacity-100" : "text-muted-foreground opacity-80"
          )}
        >
          {staff.name}
        </h3>
        <span
          className={cn(
            "inline-block px-2 py-0.5 text-xs font-medium rounded-full border transition-all",
            isActive
              ? "bg-white/80 text-primary border-primary/30"
              : "bg-white/60 text-muted-foreground border-border/60 opacity-80"
          )}
        >
          {staff.empId}
        </span>
      </div>

      {/* Contact Info */}
      <div className="w-full flex justify-center">
        <div
          className={cn(
            "w-full max-w-xs pt-3 text-sm flex flex-col items-start space-y-2 transition-all",
            isActive
              ? "border-t border-black/20 opacity-100"
              : "border-t border-black/5 opacity-60"
          )}
        >
          <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition">
            <Mail className="w-4 h-4 text-primary/70" />
            <span className="truncate">{staff.email}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition">
            <Phone className="w-4 h-4 text-primary/70" />
            <span>{staff.phone}</span>
          </div>
          {staff.hostel && (
            <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition">
              <Building2 className="w-4 h-4 text-primary/70" />
              <span>{staff.hostel}</span>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 w-full pt-4 border-t border-black/20 z-10 relative">
        {isActive ? (
          <>
            <Button
              variant="secondary"
              size="sm"
              className="flex-1 flex items-center justify-center gap-1 bg-white/90 hover:bg-white text-foreground border-[1.5px] border-black transition-all transform hover:scale-105 hover:shadow-md"
              onClick={() => onEdit?.(staff.id)}
            >
              <Edit3 className="w-4 h-4" /> Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              className="flex-1 flex items-center justify-center gap-1 bg-destructive/90 text-white hover:bg-destructive transition-all transform hover:scale-105 hover:shadow-md"
              onClick={() => onRemove?.(staff.id)}
            >
              <Trash2 className="w-4 h-4" /> Remove
            </Button>
          </>
        ) : (
          <div className="flex-1">
            <Button
              size="sm"
              className="w-full flex items-center justify-center gap-1 bg-primary text-white hover:bg-primary/90 transition-all transform hover:scale-105 hover:shadow-md"
              onClick={() => onActivate?.(staff.id)}
            >
              Activate
            </Button>
          </div>
        )}
      </div>
    </GlassCard>
  );
};

export default React.memo(InfoCard);
