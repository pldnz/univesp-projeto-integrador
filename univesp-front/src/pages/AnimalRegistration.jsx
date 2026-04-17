import React, { useState, useEffect } from 'react';
import { Camera, MapPin, ArrowLeft, Heart, Dog, Cat, Bird, Sparkles, CheckCircle2, ChevronDown } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

const AnimalRegistration = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    type: 'Cachorro',
    age: '',
    size: 'Porte Médio',
    gender: 'Macho',
    location: '',
    image_url: '',
    description: ''
  });

  useEffect(() => {
    if (id) {
      const fetchPet = async () => {
        try {
          const response = await api.get('/pets');
          const petToEdit = response.data.find(p => p.id === parseInt(id));
          if (petToEdit) {
            setFormData({ ...petToEdit });
          }
        } catch (error) {
          console.error('Erro ao carregar animal:', error);
        }
      };
      fetchPet();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!id) {
        await api.post('/pets', {
          ...formData,
          age: parseInt(formData.age)
        });
        setSuccess(true);
        setTimeout(() => navigate('/dashboard'), 2000);
      }
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Erro ao salvar animal.');
    } finally {
      setLoading(false);
    }
  };

  const types = [
    { id: 'Cachorro', icon: Dog, label: 'Cachorro' },
    { id: 'Gato', icon: Cat, label: 'Gato' },
    { id: 'Pássaro', icon: Bird, label: 'Pássaro' },
    { id: 'Outros', icon: Sparkles, label: 'Outros' },
  ];

  if (success) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-4">
        <div className="w-24 h-24 bg-secondary-container rounded-full flex items-center justify-center text-on-secondary-container mb-8">
          <CheckCircle2 size={56} />
        </div>
        <h1 className="text-4xl font-black mb-4 italic">Publicado com Sucesso!</h1>
        <p className="text-tertiary text-xl font-medium">Sua história acaba de ganhar um novo capítulo.</p>
        <p className="text-primary mt-8 font-black animate-pulse uppercase tracking-[0.3em] text-[10px]">Voltando ao Painel...</p>
      </div>
    );
  }

  return (
    <div className="bg-surface min-h-screen py-20 px-6 md:py-32">
      <div className="container">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-3 text-tertiary hover:text-primary transition-colors mb-16 font-black uppercase tracking-[0.2em] text-[10px]"
        >
          <ArrowLeft size={18} /> Voltar ao Painel
        </button>

        <header className="mb-20">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6">
            {id ? 'Refinar' : 'Anunciar'} <br /><span className="text-primary italic">Amigo.</span>
          </h1>
          <div className="h-1.5 w-24 bg-primary/20 rounded-full mb-8" />
          <p className="text-tertiary text-xl font-medium max-w-2xl leading-relaxed">
            Cada detalhe conta. Seja específico na descrição para encontrar o adotante ideal.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="card-white p-10 md:p-16 space-y-20">
          {/* Espécie */}
          <section>
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/40 mb-10 text-center">Espécie do Animal</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {types.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, type: type.id })}
                  className={`flex flex-col items-center gap-5 p-8 rounded-[2.5rem] border-2 transition-all ${
                    formData.type === type.id 
                    ? 'border-primary bg-primary/5 text-primary scale-[1.05]' 
                    : 'border-surface-container hover:border-primary/20 text-tertiary'
                  }`}
                >
                  <type.icon size={32} />
                  <span className="font-black text-[10px] uppercase tracking-widest">{type.label}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Dados Gerais */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-10">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-tertiary uppercase tracking-widest ml-1">Nome do Pet</label>
                <input type="text" required className="input-tonal" placeholder="Como ele se chama?" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-tertiary uppercase tracking-widest ml-1">Idade aproximada (meses)</label>
                <input type="number" required className="input-tonal" placeholder="Ex: 12" value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-tertiary uppercase tracking-widest ml-1">Localização</label>
                <div className="relative">
                  <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/30" size={18} />
                  <input type="text" required className="input-tonal !pl-14" placeholder="Cidade, UF" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
                </div>
              </div>
            </div>

            <div className="space-y-10">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-tertiary uppercase tracking-widest ml-1">Porte</label>
                <div className="relative">
                  <select className="input-tonal appearance-none cursor-pointer" value={formData.size} onChange={(e) => setFormData({ ...formData, size: e.target.value })}>
                    <option>Pequeno</option>
                    <option>Porte Médio</option>
                    <option>Grande</option>
                  </select>
                  <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-primary/30 pointer-events-none" size={18} />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-tertiary uppercase tracking-widest ml-1">Gênero</label>
                <div className="flex gap-4">
                  {['Macho', 'Fêmea'].map((g) => (
                    <button key={g} type="button" onClick={() => setFormData({ ...formData, gender: g })} className={`flex-1 py-4 rounded-[1.25rem] font-black text-[10px] uppercase tracking-widest border-2 transition-all ${
                        formData.gender === g ? 'border-primary bg-primary/5 text-primary' : 'border-surface-container text-tertiary'
                      }`}>
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-tertiary uppercase tracking-widest ml-1">Link da Imagem (URL)</label>
                <div className="relative">
                  <Camera className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/30" size={18} />
                  <input type="url" required className="input-tonal !pl-14" placeholder="https://..." value={formData.image_url} onChange={(e) => setFormData({ ...formData, image_url: e.target.value })} />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-6">
            <label className="text-[10px] font-black text-tertiary uppercase tracking-widest ml-1">História & Comportamento</label>
            <textarea rows="6" className="input-tonal resize-none leading-relaxed" placeholder="Conte-nos sobre a personalidade dele..." value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}></textarea>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full !py-7 text-xl shadow-2xl">
            {loading ? 'Publicando...' : (
              <>
                <Heart size={24} /> Publicar Anúncio
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AnimalRegistration;
