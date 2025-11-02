import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { toast, Toaster } from 'sonner';

const Layout = ({ onLogout }) => {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Overview', icon: '📊' },
    { path: '/job-market', label: 'Job Market', icon: '📈' },
    { path: '/salary', label: 'Salary', icon: '💰' },
    { path: '/skills', label: 'Skills', icon: '🎯' },
    { path: '/forecast', label: 'Forecast', icon: '🔮' },
    { path: '/export', label: 'Export', icon: '📥' },
    { path: '/about', label: 'About', icon: 'ℹ️' },
  ];

  const handleLogout = () => {
    toast.success('Logged out successfully');
    onLogout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Toaster position="top-right" richColors />
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200" data-testid="app-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900" style={{fontFamily: 'Work Sans'}}>Employability Analytics</h1>
                <p className="text-xs text-gray-500">U.S. Workforce Insights</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
              data-testid="logout-button"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 shadow-sm" data-testid="main-navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 overflow-x-auto py-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                  location.pathname === item.path
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
                data-testid={`nav-link-${item.label.toLowerCase().replace(' ', '-')}`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16" data-testid="app-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-600">
            © 2025 Employability Analytics – Group 3 | Saint Louis University
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
