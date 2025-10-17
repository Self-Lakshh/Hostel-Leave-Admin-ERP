import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import apiService from '../../api/apiService';
import { setStoredAuth } from '../../lib/auth';
import { useToast } from '../../components/ui/Toast';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const inputClasses =
    'w-full bg-white/40 dark:bg-gray-700/40 border border-gray-300/40 rounded-xl ' +
    'px-4 py-2.5 placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 ' +
    'focus:ring-blue-300 shadow-inner backdrop-blur-md';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await apiService.adminLogin({ emp_id: username, password });
      const token = (data && (data.token || data.access_token)) as string | undefined;
      if (!token) throw new Error('No token received from server');
      // Persist token and a minimal user shape. Role is admin for this app.
      setStoredAuth({ token, user: { id: '', name: username, email: '', role: 'admin' } });
      navigate('/admin/dashboard', { replace: true });
    } catch (err: any) {
      const message = err?.response?.data?.message || err?.message || 'Login failed';
      addToast({ title: 'Login error', description: String(message), type: 'error', duration: 5000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="h-full bg-white dark:bg-gray-800"
      style={{
        minHeight: '100vh',
        backgroundImage: "url('/img/spsu-bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
      }}
    >
      {/* Top-left overlay logo */}
      <img
        src="/logos/SPSU-Logo_Blue.png"
        alt="SPSU Logo"
        style={{
          position: 'absolute',
          top: 24,
          left: 24,
          width: 160,
          height: 'auto',
          zIndex: 2,
        }}
      />

      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div
            className="relative w-full mx-auto overflow-hidden p-8 sm:p-10"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              boxShadow: '0px 8px 30px rgba(2,6,23,0.35)',
              borderRadius: '40px',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <h1 className="text-center text-3xl font-bold mb-3 text-gray-900 dark:text-white">SPSU Hostel Leave ERP</h1>
            <h2 className="text-center text-2xl font-semibold mb-3 text-gray-800 dark:text-white">Admin Panel</h2>

            <form onSubmit={handleSubmit} className="space-y-5 px-1">
              <div className="relative">
                <label className="sr-only">Employee ID</label>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="text-gray-400 w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="Employee ID"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={inputClasses + ' pl-11 py-3 text-base'}
                />
              </div>

              <div className="relative">
                <label className="sr-only">Password</label>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="text-gray-400 w-5 h-5" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClasses + ' pl-11 pr-14 py-3 text-base'}
                  style={{ height: '48px' }}
                />
                <button
                  type="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all text-white font-semibold py-3 text-lg"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
