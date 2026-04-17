import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Heart, Search, ShieldCheck, Globe } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
        <div className="container py-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <Heart size={20} fill="currentColor" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase text-primary">Univesp Pets</span>
          </Link>
          <div className="flex items-center gap-4 md:gap-10">
            <Link to="/" className="text-xs font-bold uppercase tracking-[0.2em] text-tertiary hover:text-primary transition-colors hidden md:block">Adotar</Link>
            <Link to="/login" className="text-xs font-bold uppercase tracking-[0.2em] text-tertiary hover:text-primary transition-colors">Portal ONG</Link>
            <Link to="/anunciar" className="btn-primary !px-6 !py-3 text-[10px]">Quero Anunciar</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 md:pt-64 md:pb-40 relative overflow-hidden">
        <div className="container grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 relative z-10">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-secondary-container text-on-secondary-container rounded-full text-[10px] font-bold uppercase tracking-widest mb-10 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-on-secondary-container animate-pulse" />
              Impactando +500 vidas hoje
            </div>
            <h1 className="text-6xl md:text-[6.5rem] font-black leading-[0.85] text-on-surface mb-10 tracking-tighter">
              Amor que <br /> <span className="text-primary italic font-semibold">conecta.</span>
            </h1>
            <p className="text-xl text-tertiary max-w-lg mb-14 leading-relaxed font-medium">
              Transforme a história de um animal e a sua própria. Encontre seu novo melhor amigo no portal de adoção da Univesp.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link to="/quero-adotar" className="btn-primary text-base !px-12 !py-6 group shadow-xl">
                Encontrar Amigo <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/anunciar" className="btn-secondary text-base !px-12 !py-6">
                Sou uma ONG
              </Link>
            </div>
          </div>
          
          <div className="lg:col-span-5 relative">
            <div className="relative group">
              <div className="aspect-[1/1] rounded-[4rem] overflow-hidden shadow-ambient z-10 relative mb-12 transform group-hover:-rotate-1 transition-transform duration-700">
                <img 
                  src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=1000" 
                  alt="Pet" 
                  className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
                />
              </div>
              {/* Asymmetrical Floating Element */}
              <div className="absolute -left-16 -bottom-8 bg-white p-6 rounded-[3rem] shadow-ambient z-20 flex items-center gap-4 border border-ghost-border hidden xl:flex">
                <div className="w-14 h-14 bg-secondary-container rounded-2xl flex items-center justify-center text-on-secondary-container">
                  <Heart size={24} fill="currentColor" />
                </div>
                <div>
                  <p className="text-xs font-bold text-tertiary uppercase tracking-wider">Adoção Responsável</p>
                  <p className="text-sm font-black text-on-surface">100% Verificado</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Decorative Background */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/2 h-1/2 bg-primary/5 rounded-full blur-[150px] -z-10" />
      </section>

      {/* Feature Section - Multi-Column Containerized */}
      <section className="section-padding">
        <div className="container">
          <div className="section-tonal grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: ShieldCheck, title: "Segurança", desc: "Processo criterioso de validação de ONGs e protetores parceiros." },
              { icon: Search, title: "Praticidade", desc: "Filtros pensados para encontrar o pet ideal para sua rotina." },
              { icon: Globe, title: "Comunidade", desc: "Unindo adotantes e protetores em toda a região da rede Univesp." }
            ].map((f, i) => (
              <div key={i} className="flex flex-col items-center text-center px-4">
                <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-primary shadow-sm mb-8">
                  <f.icon size={32} />
                </div>
                <h3 className="text-2xl font-black mb-4">{f.title}</h3>
                <p className="text-tertiary leading-relaxed font-medium">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-10 border-t border-ghost-border pt-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
              <Heart size={16} fill="currentColor" />
            </div>
            <span className="text-lg font-black tracking-tighter uppercase text-primary">Univesp Pets</span>
          </div>
          <p className="text-tertiary text-xs font-bold uppercase tracking-widest">© 2026 Projeto Integrador • Univesp</p>
          <div className="flex gap-8">
            {['Instagram', 'Twitter', 'Facebook'].map(s => (
              <span key={s} className="text-[10px] font-black uppercase tracking-widest text-primary hover:opacity-60 cursor-pointer">{s}</span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
