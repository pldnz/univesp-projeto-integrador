import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, ArrowLeft, CheckCircle2, Heart } from 'lucide-react';
import api from '../services/api';

const RegisterUser = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: '',
    password: ''
  });

  // Funções de Máscara
  const maskCPF = (value) => {
    return value
      .replace(/\D/g, '') // Remove tudo que não é dígito
      .replace(/(\d{3})(\d)/, '$1.$2') // Coloca ponto após os 3 primeiros dígitos
      .replace(/(\d{3})(\d)/, '$1.$2') // Coloca ponto após os 6 primeiros dígitos
      .replace(/(\d{3})(\d{1,2})/, '$1-$2') // Coloca hífen após os 9 primeiros dígitos
      .replace(/(-\d{2})\d+?$/, '$1'); // Limita o tamanho
  };

  const maskPhone = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
  };

  const handleInputChange = (field, value) => {
    let maskedValue = value;
    if (field === 'cpf') maskedValue = maskCPF(value);
    if (field === 'telefone') maskedValue = maskPhone(value);
    
    setFormData({ ...formData, [field]: maskedValue });
  };

  const validateForm = () => {
    const cleanCPF = formData.cpf.replace(/\D/g, '');
    const cleanPhone = formData.telefone.replace(/\D/g, '');

    if (cleanCPF.length !== 11) {
      setError('O CPF deve conter 11 dígitos.');
      return false;
    }
    if (cleanPhone.length < 10 || cleanPhone.length > 11) {
      setError('O telefone deve conter entre 10 e 11 dígitos.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError('');
    
    try {
      await api.post('/users', formData);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      console.error('Erro ao cadastrar usuário:', err);
      setError(err.response?.data?.msg || 'Erro ao realizar cadastro.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-4">
        <div className="w-24 h-24 bg-secondary-container rounded-full flex items-center justify-center text-on-secondary-container mb-8 transform scale-110 shadow-lg shadow-on-secondary-container/10">
          <CheckCircle2 size={56} />
        </div>
        <h1 className="text-4xl font-black mb-4 italic">Cadastro Criado!</h1>
        <p className="text-tertiary text-xl font-medium">Prepare-se para transformar vidas.</p>
        <p className="text-primary mt-8 font-black animate-pulse uppercase tracking-[0.3em] text-[10px]">Redirecionando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface py-20 px-6">
      <div className="container">
        <div className="max-w-[800px] mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <button 
              onClick={() => navigate('/login')}
              className="flex items-center gap-2 text-tertiary hover:text-primary transition-colors mb-10 font-black uppercase tracking-[0.2em] text-[10px] mx-auto"
            >
              <ArrowLeft size={16} /> Voltar ao Login
            </button>
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mx-auto mb-6">
              <Heart size={24} fill="currentColor" />
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-on-surface mb-2 italic">Integrar ONG<span className="text-primary not-italic">.</span></h1>
            <p className="text-tertiary font-bold uppercase tracking-widest text-[10px]">Inicie seu trabalho no Univesp Pets</p>
          </div>

          {error && (
            <div className="bg-surface-container-highest text-primary p-6 rounded-2xl mb-10 text-[11px] font-black uppercase tracking-widest border border-primary/10 text-center">
              {error}
            </div>
          )}

          <div className="card-white p-10 md:p-16">
            <form onSubmit={handleSubmit} className="space-y-16">
              {/* Perfil */}
              <section>
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/40 mb-10">Dados do Responsável</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-tertiary uppercase tracking-widest ml-1">Nome Completo</label>
                    <input type="text" required className="input-tonal" value={formData.nome} onChange={(e) => handleInputChange('nome', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-tertiary uppercase tracking-widest ml-1">CPF</label>
                    <input type="text" required className="input-tonal" placeholder="000.000.000-00" value={formData.cpf} onChange={(e) => handleInputChange('cpf', e.target.value)} />
                  </div>
                </div>
              </section>

              {/* Contato e Localização */}
              <section>
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/40 mb-10">Conectividade & Sede</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-tertiary uppercase tracking-widest ml-1">E-mail Corporativo</label>
                    <input type="email" required className="input-tonal" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-tertiary uppercase tracking-widest ml-1">WhatsApp</label>
                    <input type="tel" required className="input-tonal" placeholder="(00) 00000-0000" value={formData.telefone} onChange={(e) => handleInputChange('telefone', e.target.value)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-tertiary uppercase tracking-widest ml-1">Endereço da Sedes</label>
                  <input type="text" required className="input-tonal" value={formData.endereco} onChange={(e) => handleInputChange('endereco', e.target.value)} />
                </div>
              </section>

              <section className="pt-10 border-t border-ghost-border">
                <div className="space-y-2 max-w-sm">
                  <label className="text-[10px] font-black text-tertiary uppercase tracking-widest ml-1">Senha do Portal</label>
                  <input type="password" required className="input-tonal" placeholder="••••••••" value={formData.password} onChange={(e) => handleInputChange('password', e.target.value)} />
                </div>
              </section>

              <button type="submit" disabled={loading} className="btn-primary w-full !py-7 text-xl shadow-2xl">
                {loading ? 'Processando...' : (
                  <>
                    <UserPlus size={24} /> Criar Conta de Protetor
                  </>
                )}
              </button>
            </form>
          </div>

          <p className="text-center mt-12 text-tertiary text-sm font-medium">
            Já faz parte da rede? <Link to="/login" className="text-primary font-black hover:underline italic">Fazer Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
