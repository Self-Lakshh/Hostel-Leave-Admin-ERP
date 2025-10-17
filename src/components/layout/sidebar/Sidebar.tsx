import { NavLink } from 'react-router-dom';
import { cn } from '../../../utils/cn';
import ADMIN_NAV from '../../../config/nav';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const navItems = ADMIN_NAV;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 z-50 h-screen bg-card border-r transition-all duration-300 flex flex-col",
          isOpen ? "w-64" : "w-16",
          !isOpen && "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="p-4">
          <div className="flex items-center justify-between">
            {isOpen ? (
              <div className="flex items-center gap-3">
                <img src="/logos/SPSU-Logo_Blue.png" alt="Brand" className="w-auto h-12" />
              </div>
            ) : (
              <div className="w-10 h-10 flex items-center justify-center">
                <img src="/logos/SPSU-Logo_Only.png" alt="S" className="w-8 h-8" />
              </div>
            )}
            {/* collapse button moved to Header */}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              title={!isOpen ? item.label : undefined}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200',
                  'hover:bg-secondary',
                  isActive && 'bg-primary/10 text-primary border border-primary/30',
                  !isOpen && 'justify-center'
                )
              }
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {isOpen && <span className="font-medium text-sm">{item.label}</span>}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
