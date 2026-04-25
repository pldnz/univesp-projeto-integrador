import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock } from 'lucide-react';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-surface min-h-screen py-20 px-6 md:py-32">
      <div className="container max-w-4xl">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-3 text-tertiary hover:text-primary transition-colors mb-16 font-black uppercase tracking-[0.2em] text-[10px]"
        >
          <ArrowLeft size={18} /> Voltar
        </button>

        <header className="mb-20">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6 italic">
            Política de <br /><span className="text-primary not-italic">Privacidade.</span>
          </h1>
          <div className="h-1.5 w-24 bg-primary/20 rounded-full" />
        </header>

        <div className="card-white p-10 md:p-16 space-y-12 text-tertiary">
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-on-surface">1. Coleta de Dados</h2>
            <p className="leading-relaxed">
              Coletamos apenas os dados necessários para o funcionamento da plataforma, como nome, e-mail, telefone de contato e localização. Esses dados são essenciais para conectar adotantes a animais disponíveis.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black text-on-surface">2. Uso das Informações</h2>
            <p className="leading-relaxed">
              Seu telefone e nome da instituição (no caso de ONGs) serão exibidos publicamente nos anúncios de animais para facilitar o contato de possíveis adotantes. Seus dados de login são protegidos e usados apenas para autenticação.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black text-on-surface">3. Segurança</h2>
            <p className="leading-relaxed">
              Implementamos medidas de segurança para proteger suas informações, incluindo hashing de senhas e tokens de acesso seguros. No entanto, lembre-se que nenhum método de transmissão pela internet é 100% seguro.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black text-on-surface">4. Seus Direitos</h2>
            <p className="leading-relaxed">
              Você tem o direito de acessar, corrigir ou excluir seus dados pessoais a qualquer momento através das configurações do seu perfil na plataforma.
            </p>
          </section>

          <div className="pt-10 border-t border-ghost-border flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-primary/40">
            <Lock size={16} />
            <span>Respeitamos a LGPD • Abril de 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
