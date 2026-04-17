import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-[100] glass-nav py-6">
      <div className="container flex justify-between items-center">
        {/* Logo / Brand */}
        <Link to="/" className="flex items-center gap-3 active:scale-95 transition-transform">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <Heart size={20} fill="currentColor" />
          </div>
          <span className="text-2xl font-black uppercase tracking-tighter text-primary">Petfinder</span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link 
                to="/dashboard" 
                className="flex items-center gap-2 px-5 py-3 bg-primary/10 text-primary rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all"
              >
                <Settings size={16} /> Painel
              </Link>
              <button 
                onClick={() => { logout(); navigate('/'); }}
                className="w-12 h-12 flex items-center justify-center bg-surface-container-low text-tertiary rounded-2xl hover:bg-error/10 hover:text-error transition-all"
                title="Sair"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="btn-primary !px-8 !py-3.5 text-xs tracking-widest"
            >
              Sou Protetor
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
