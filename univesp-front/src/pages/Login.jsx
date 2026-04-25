import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, ArrowLeft, Heart } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const success = await login(email, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Credenciais inválidas. Verifique seu e-mail e senha.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-6">
      <div className="container flex items-center justify-center">
        <div className="w-full max-w-[480px]">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center gap-2 text-tertiary hover:text-primary transition-colors mb-10 font-black uppercase tracking-[0.2em] text-[10px] mx-auto"
        >
          <ArrowLeft size={16} /> Voltar ao Início
        </button>

        {/* Brand Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-primary/20">
            <Heart size={32} fill="currentColor" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-on-surface mb-2 italic">Portal ONG<span className="text-primary not-italic">.</span></h1>
          <p className="text-tertiary font-bold uppercase tracking-widest text-[10px]">Acesso Restrito a Protetores</p>
        </div>

        {/* Login Card */}
        <div className="card-white p-10 md:p-14">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-black mb-2">Bem-vinde!</h2>
            <p className="text-tertiary text-sm font-medium">Insira seus dados para gerenciar seus animais.</p>
          </div>

          {error && (
            <div className="bg-surface-container-highest text-primary p-4 rounded-xl mb-8 text-[11px] font-black uppercase tracking-widest border border-primary/10 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-1">E-mail de Acesso</label>
              <input
                type="email"
                required
                className="input-tonal"
                placeholder="exemplo@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-1">Senha</label>
              <input
                type="password"
                required
                className="input-tonal"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full !py-6 text-base shadow-2xl mt-4">
              {loading ? 'Entrando...' : (
                <>
                  <LogIn size={20} /> Entrar no Painel
                </>
              )}
            </button>
          </form>

          <p className="text-center mt-12 text-tertiary text-sm font-medium">
            Ainda não tem conta? <a href="https://wa.me/5515981349240?text=Olá, gostaria de cadastrar minha ONG no PetFinder." target="_blank" rel="noopener noreferrer" className="text-primary font-black hover:underline italic">Cadastrar ONG</a>
          </p>
        </div>
        
        <p className="text-center mt-12 text-tertiary/30 text-[9px] font-bold uppercase tracking-[0.4em]">
          Univesp • Projeto Integrador v2
        </p>
      </div>
    </div>
  </div>
  );
};

export default Login;
