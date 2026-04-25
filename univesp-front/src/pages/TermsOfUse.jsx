import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';

const TermsOfUse = () => {
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
            Termos de <br /><span className="text-primary not-italic">Uso.</span>
          </h1>
          <div className="h-1.5 w-24 bg-primary/20 rounded-full" />
        </header>

        <div className="card-white p-10 md:p-16 space-y-12 text-tertiary">
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-on-surface">1. Aceitação dos Termos</h2>
            <p className="leading-relaxed">
              Ao acessar e usar a plataforma PetFinder, você concorda em cumprir e estar vinculado a estes Termos de Uso. Esta plataforma destina-se a facilitar a adoção responsável de animais.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black text-on-surface">2. Responsabilidades do Usuário</h2>
            <p className="leading-relaxed">
              O usuário é responsável por fornecer informações verdadeiras e atualizadas. A plataforma PetFinder não se responsabiliza pelas interações diretas entre adotantes e ONGs/Protetores. Recomendamos sempre a verificação presencial e cautela em todas as etapas da adoção.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black text-on-surface">3. Cadastro de Animais</h2>
            <p className="leading-relaxed">
              As ONGs e Protetores cadastrados garantem que possuem a guarda legal dos animais anunciados e que as informações de saúde e comportamento são precisas de acordo com seu conhecimento.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black text-on-surface">4. Proibições</h2>
            <p className="leading-relaxed">
              É terminantemente proibida a comercialização de animais através desta plataforma. O PetFinder é um portal exclusivo para adoção e bem-estar animal.
            </p>
          </section>

          <div className="pt-10 border-t border-ghost-border flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-primary/40">
            <Shield size={16} />
            <span>Última atualização: Abril de 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;
