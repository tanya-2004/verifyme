import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ReloadButton from './ReloadButton';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Don't show navbar on login or signup page
  if (
    location.pathname === '/login' ||
    location.pathname === '/' ||
    location.pathname === '/signup'
  ) {
    return null;
  }

  // Get user email from localStorage
  const user =
    JSON.parse(localStorage.getItem('verifyme_auth') || '{}') || {};
  const email = user.email || 'Profile';

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('verifyme_auth');
    navigate('/login');
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/home" className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-blue-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-xl font-bold text-blue-600">
                VerifyMe AI
              </span>
            </Link>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex flex-1 justify-center items-center space-x-8">
            <NavLink to="/dashboard" current={location.pathname === '/dashboard'}>
              Verification
            </NavLink>
            <NavLink to="/home#about" current={location.hash === '#about'}>
              About
            </NavLink>
            <NavLink to="/help" current={location.pathname === '/help'}>
              Help
            </NavLink>
            <ReloadButton
              variant="ghost"
              size="sm"
              className="text-sm font-medium hover:text-blue-600 text-gray-600"
            />
          </nav>

          <div className="relative flex items-center ml-4" ref={dropdownRef}>
            <button
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-blue-100 transition"
              onClick={() => setDropdownOpen((open) => !open)}
              aria-label="Profile"
            >
              {/* Profile Icon Only */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 top-full w-56 bg-white border rounded shadow-lg z-50 overflow-hidden">
                <div className="px-4 py-3 border-b">
                  <div className="font-semibold text-blue-600 break-all">{email}</div>
                  <div className="text-xs text-gray-500">Signed in</div>
                </div>
                <button
                  className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Nav */}
          <div className="md:hidden flex items-center space-x-2 ml-2">
            <button className="p-2 text-blue-600 focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <ReloadButton
              variant="ghost"
              size="icon"
              className="text-blue-600"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

type NavLinkProps = {
  to: string;
  current: boolean;
  children: React.ReactNode;
};

function NavLink({ to, current, children }: NavLinkProps) {
  return (
    <Link
      to={to}
      className={`text-sm font-medium transition-colors hover:text-blue-600 ${current ? 'text-blue-600' : 'text-gray-600'
        }`}
    >
      {children}
    </Link>
  );
}