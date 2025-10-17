import React from 'react';
import type { IconType } from '../../../types/icons';

interface SidebarItemProps {
  label: string;
  Icon: IconType;
  collapsed: boolean;
  onClick?: () => void;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  Icon,
  collapsed,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center cursor-pointer px-3 py-2 hover:bg-accent hover:text-accent-foreground rounded-md transition-all duration-200 group"
    >
      <Icon className="w-5 h-5 transition-colors shrink-0" />
      {!collapsed && (
        <span className="ml-3 text-sm font-medium truncate">
          {label}
        </span>
      )}
    </div>
  );
};
