import React from 'react';
import { useNavigate } from 'react-router-dom';

const PetCard = ({ pet }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/pet/${pet.id}`)}
      style={{
        background: 'var(--surface-container-lowest)',
        borderRadius: '2rem',
        overflow: 'hidden',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'var(--ambient-shadow)',
        transition: 'transform 0.3s ease',
        position: 'relative'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px) scale(1.01)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
      }}
    >
      <div style={{ height: '260px', width: '100%', position: 'relative' }}>
        <img 
          src={pet.image} 
          alt={pet.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute',
          bottom: '-16px',
          right: '24px',
          background: 'var(--surface-container-lowest)',
          borderRadius: '50%',
          width: '48px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          zIndex: 10
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill={pet.status === 'disponível' ? 'var(--primary)' : '#ccc'} stroke="none">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
      </div>
      
      <div style={{ padding: '32px 24px 24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '22px' }}>
          <div>
            <h3 className="headline" style={{ fontSize: '1.4rem', color: 'var(--primary)', marginBottom: '4px' }}>
              {pet.name}
            </h3>
            <span style={{ color: 'var(--on-surface-variant)', fontSize: '0.85rem' }}>{pet.location}</span>
          </div>
        </div>

        {/* Tonal Layering Stats */}
        <div style={{
          background: 'var(--surface-container)',
          padding: '16px',
          borderRadius: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 'auto'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--tertiary)', marginBottom: '4px' }}>Idade</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--on-surface)' }}>{pet.age}</div>
          </div>
          <div style={{ width: '1px', background: 'var(--ghost-border)' }}></div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--tertiary)', marginBottom: '4px' }}>Tipo</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--on-surface)' }}>{pet.type.split(' ')[0]}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetCard;
