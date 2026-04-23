import React, { useState, useEffect } from 'react';
import { Plus, Settings, LogOut, Heart, Trash2, Edit, ChevronRight, MapPin } from 'lucide-react';

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [myPets, setMyPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyPets = async () => {
      try {
        const response = await api.get('/pets/me');
        setMyPets(response.data);
      } catch (error) {
        console.error('Erro ao buscar meus animais:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyPets();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja remover este anúncio?')) {
      try {
        await api.delete(`/pets/${id}`);
        setMyPets(myPets.filter(p => p.id !== id));
      } catch (error) {
        alert('Erro ao deletar animal.');
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col md:flex-row">
      {/* Sidebar - Fixed & White Card Style */}
      <aside className="w-full md:w-80 bg-white border-r border-ghost-border flex flex-col justify-between h-[calc(100vh-88px)] sticky top-[88px]">
        <div className="p-10">
          <div className="flex items-center gap-3 mb-20">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <Heart size={20} fill="currentColor" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase text-primary">Petfinder</span>
          </div>

          <div className="mb-16 px-2">
            <div className="w-20 h-20 bg-surface-container-low rounded-[1.5rem] flex items-center justify-center text-primary mb-6 overflow-hidden shadow-sm ring-4 ring-surface">
              <img 
                src={user?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${user?.nome}`} 
                alt="Avatar" 
                className="w-full h-full object-cover" 
              />
            </div>
            <h2 className="text-2xl font-black text-on-surface line-clamp-1 italic">{user?.nome_instituicao || user?.nome || 'Protetor'}</h2>
            <p className="text-[10px] text-primary font-black uppercase tracking-[0.2em] mt-2">Parceiro Verificado</p>
          </div>

          <nav className="space-y-4">
            <button 
              onClick={() => navigate('/dashboard')}
              className="w-full flex items-center justify-between p-5 bg-primary/5 text-primary rounded-2xl font-black text-xs uppercase tracking-widest transition-all"
            >
              <div className="flex items-center gap-4">
                <Heart size={20} /> Meus Pets
              </div>
              <ChevronRight size={16} />
            </button>
            <button 
              onClick={() => navigate('/perfil')}
              className="w-full flex items-center gap-4 p-5 text-tertiary hover:bg-surface-container-low rounded-2xl font-bold text-xs uppercase tracking-widest transition-all group"
            >
              <Settings size={20} className="group-hover:text-primary" /> Perfil da ONG
            </button>
          </nav>
        </div>

        <div className="p-10 border-t border-ghost-border">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 p-4 text-primary font-black text-xs uppercase tracking-widest hover:bg-primary/5 rounded-2xl transition-all"
          >
            <LogOut size={20} /> Sair
          </button>
        </div>
      </aside>

      {/* Main Workspace - Containerized */}
      <main className="flex-1 bg-surface py-16 md:py-24 overflow-y-auto">
        <div className="container">
          
          <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-20">
            <div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6 italic">
                Painel Geral<span className="text-primary not-italic">.</span>
              </h1>
              <div className="h-1.5 w-20 bg-primary/20 rounded-full mb-6" />
              <p className="text-tertiary text-lg font-medium max-w-lg">Aqui você gerencia as vidas que estão sob sua proteção.</p>
            </div>
            <Link to="/anunciar" className="btn-primary !py-5 !px-10 shadow-2xl group shrink-0">
              <Plus size={24} className="group-hover:rotate-90 transition-transform duration-500" /> Novo Anúncio
            </Link>
          </header>

          {/* Stats Section - Tight Tonal Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {[
              { label: 'Anunciados', value: myPets.length, color: 'text-on-surface' },
              { label: 'Disponíveis', value: myPets.filter(p => p.status === 'disponível').length, color: 'text-primary' },
              { label: 'Contatos', value: 0, color: 'text-tertiary' }
            ].map((stat, i) => (
              <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-ambient border border-ghost-border flex flex-col justify-between min-h-[160px]">
                <p className="text-[10px] font-black text-tertiary uppercase tracking-[0.2em]">{stat.label}</p>
                <h3 className={`text-6xl font-black ${stat.color} tracking-tighter`}>{stat.value}</h3>
              </div>
            ))}
          </div>

          {/* List Section */}
          <div className="space-y-8">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary/40 ml-1 mb-6">Lista de Animais</h3>
            {loading ? (
              <div className="py-24 text-center font-black uppercase tracking-widest text-xs text-tertiary animate-pulse italic">Processando informações...</div>
            ) : myPets.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {myPets.map((pet) => (
                  <div key={pet.id} className="card-white p-6 flex flex-col sm:flex-row gap-8 group hover:-translate-y-1 transition-all duration-300">
                    <div className="w-full sm:w-44 aspect-square rounded-[2rem] overflow-hidden flex-shrink-0 animate-fade-in shadow-sm">
                      <img 
                        src={pet.image_url || 'https://via.placeholder.com/200'} 
                        alt={pet.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-4xl font-black tracking-tight text-on-surface group-hover:text-primary transition-colors mb-2 italic">{pet.name}</h3>
                          <div className="flex items-center gap-3 text-tertiary text-xs font-bold uppercase tracking-widest">
                            <MapPin size={14} className="text-primary" /> {pet.location}
                          </div>
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full ${
                          pet.status === 'disponível' ? 'bg-secondary-container text-on-secondary-container' : 'bg-surface-container-highest text-tertiary'
                        }`}>
                          {pet.status}
                        </span>
                      </div>
                      
                      <div className="flex gap-4 pt-6 border-t border-ghost-border mt-6">
                        <Link 
                          to={`/edit/${pet.id}`}
                          className="flex-1 flex items-center justify-center gap-3 py-4 bg-surface-container-low text-on-surface rounded-2xl hover:bg-surface-container-high transition-colors font-bold text-xs uppercase tracking-widest"
                        >
                          <Edit size={16} /> Editar Dados
                        </Link>
                        <button 
                          onClick={() => handleDelete(pet.id)}
                          className="w-14 h-14 flex items-center justify-center text-primary/30 hover:text-primary hover:bg-primary/5 rounded-2xl transition-all"
                        >
                          <Trash2 size={24} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="section-tonal py-24 text-center border-2 border-dashed border-tertiary/20">
                <Heart size={48} className="mx-auto text-primary/10 mb-8" />
                <h3 className="text-3xl font-black mb-4">Abrigo Vazio.</h3>
                <p className="text-tertiary mb-10 max-w-sm mx-auto font-medium">Você ainda não cadastrou nenhum pet para doação neste portal.</p>
                <Link to="/anunciar" className="btn-primary">Anunciar Primeiro Pet</Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
