import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, PlusCircle, Hexagon, LogIn } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="glass-nav" style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '24px 40px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      borderBottom: '1px solid var(--ghost-border)'
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ background: 'var(--primary)', color: 'white', padding: '6px', borderRadius: '8px' }}>
          <Hexagon size={24} />
        </div>
        <h1 style={{ color: 'var(--primary)', fontSize: '1.4rem', margin: 0, fontWeight: 800 }}>
          PetFinder
        </h1>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <Link to="/" style={{ color: location.pathname === '/' ? 'var(--primary)' : 'var(--on-surface-variant)', fontWeight: 600, fontSize: '0.95rem' }}>
          Animais
        </Link>
        <Link to="/about" style={{ color: 'var(--on-surface-variant)', fontWeight: 600, fontSize: '0.95rem' }}>
          Nossa Missão
        </Link>

        {user ? (
          <div style={{ paddingLeft: '24px', borderLeft: '1px solid var(--surface-container-highest)', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link to="/dashboard" style={{ color: 'var(--on-surface)', fontWeight: 600, fontSize: '0.95rem' }}>Painel ONGs</Link>
            <Link to="/register" style={{ color: 'var(--primary-container)', fontWeight: 600, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <PlusCircle size={18} /> Novo Pet
            </Link>
            <button onClick={handleLogout} style={{
              background: 'transparent',
              color: 'var(--tertiary)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 600,
              fontSize: '0.9rem'
            }}>
              Sair <LogOut size={16} />
            </button>
          </div>
        ) : (
          <div style={{ paddingLeft: '24px', borderLeft: '1px solid var(--surface-container-highest)', display: 'flex', alignItems: 'center' }}>
            <Link to="/login" className="btn-primary" style={{
              padding: '12px 24px',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <LogIn size={16} /> Sou ONG
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
