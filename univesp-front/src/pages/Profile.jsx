import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, User, Camera, Phone, MapPin, Building2, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    nome_instituicao: '',
    telefone: '',
    avatar_url: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/users/me');
        const data = response.data;
        setFormData({
          nome: data.nome || '',
          nome_instituicao: data.nome_instituicao || '',
          telefone: data.telefone || '',
          avatar_url: data.avatar_url || '',
          endereco: data.endereco || '',
          cidade: data.cidade || '',
          estado: data.estado || '',
          cep: data.cep || ''
        });
      } catch (error) {
        console.error('Erro ao buscar perfil:', error);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put('/users/me', formData);
      updateUser(formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      alert('Erro ao atualizar perfil.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface min-h-screen py-20 px-6 md:py-32">
      <div className="container">
        <button 
          onClick={() => navigate('/dashboard')} 
          className="flex items-center gap-3 text-tertiary hover:text-primary transition-colors mb-16 font-black uppercase tracking-[0.2em] text-[10px]"
        >
          <ArrowLeft size={18} /> Voltar ao Painel
        </button>

        <header className="mb-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
            <div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6">
                Perfil <br /><span className="text-primary italic">Institucional.</span>
              </h1>
              <div className="h-1.5 w-24 bg-primary/20 rounded-full mb-8" />
              <p className="text-tertiary text-xl font-medium max-w-2xl">
                Apresente sua ONG para o mundo. Use uma foto nítida e mantenha seus contatos atualizados.
              </p>
            </div>
            
            {success && (
              <div className="flex items-center gap-3 px-6 py-4 bg-secondary-container text-on-secondary-container rounded-2xl font-black text-[10px] uppercase tracking-widest animate-fade-in shadow-xl shadow-on-secondary-container/5">
                <CheckCircle2 size={16} /> Perfil Salvo com Sucesso
              </div>
            )}
          </div>
        </header>

        <form onSubmit={handleSubmit} className="card-white p-10 md:p-16 space-y-20">
          {/* Avatar Preview Section */}
          <div className="flex flex-col md:flex-row items-center gap-10 pb-10 border-b border-ghost-border">
            <div className="w-32 h-32 md:w-44 md:h-44 bg-surface-container-low rounded-[3rem] overflow-hidden shadow-ambient ring-8 ring-surface relative group">
              <img 
                src={formData.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${formData.nome}`} 
                alt="Preview" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <Camera size={32} />
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <label className="text-[10px] font-black text-tertiary uppercase tracking-widest ml-1">URL da Foto de Perfil</label>
              <input 
                type="url" 
                className="input-tonal" 
                placeholder="https://sua-foto.com/image.jpg"
                value={formData.avatar_url}
                onChange={(e) => setFormData({...formData, avatar_url: e.target.value})}
              />
              <p className="text-xs text-tertiary/60 font-medium italic">Use links diretos de imagens ou logos da sua instituição.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-10">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/40 mb-2">Identidade</h3>
              
              <div className="space-y-3">
                <label className="text-[10px] font-black text-tertiary uppercase tracking-widest ml-1">Nome do Responsável</label>
                <div className="relative">
                  <User className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/30" size={18} />
                  <input type="text" required className="input-tonal !pl-14" value={formData.nome} onChange={(e) => setFormData({...formData, nome: e.target.value})} />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-tertiary uppercase tracking-widest ml-1">Nome da Instituição / ONG</label>
                <div className="relative">
                  <Building2 className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/30" size={18} />
                  <input type="text" className="input-tonal !pl-14" placeholder="Ex: Patas Felizes" value={formData.nome_instituicao} onChange={(e) => setFormData({...formData, nome_instituicao: e.target.value})} />
                </div>
              </div>
            </div>

            <div className="space-y-10">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/40 mb-2">Contato & Local</h3>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-tertiary uppercase tracking-widest ml-1">Telefone / WhatsApp</label>
                <div className="relative">
                  <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/30" size={18} />
                  <input type="tel" required className="input-tonal !pl-14" value={formData.telefone} onChange={(e) => setFormData({...formData, telefone: e.target.value})} />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-tertiary uppercase tracking-widest ml-1">Localização (Cidade/UF)</label>
                <div className="relative">
                  <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/30" size={18} />
                  <input type="text" className="input-tonal !pl-14" value={`${formData.cidade}${formData.estado ? `, ${formData.estado}` : ''}`} readOnly />
                </div>
                <p className="text-[9px] text-tertiary/40 font-bold uppercase tracking-widest ml-1 italic">Alteração de endereço requer suporte técnico.</p>
              </div>
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full !py-7 text-xl shadow-2xl">
            {loading ? 'Sincronizando...' : (
              <>
                <Save size={24} /> Atualizar Perfil Público
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
