import { Menu, User, LogOut } from 'lucide-react';
import { clearAuth } from '../../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../../utils/cn';

interface HeaderProps {
  onMenuClick: () => void;
  isOpen?: boolean;
}

export function Header({ onMenuClick, isOpen = true }: HeaderProps) {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  return (
    <header className="bg-white/95 backdrop-blur-[6px] border-b border-gray-200 h-16 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Desktop collapse button - moved from Sidebar */}
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors hidden lg:flex"
          aria-label="Toggle sidebar"
        >
          <Menu className={cn('w-4 h-4 transition-transform', !isOpen && 'rotate-180')} />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/30">
            <User className="w-4 h-4 text-primary" />
          </div>
          <span className="text-sm font-medium capitalize">{role}</span>
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </header>
  );
};
