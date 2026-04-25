import React from "react";
import { Link } from "react-router-dom";
import { Heart, Globe, MessageSquare, Plus } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-ghost-border pt-32 pb-20">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-32">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-8">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                <Heart size={16} fill="currentColor" />
              </div>
              <span className="text-xl font-black uppercase tracking-tighter text-primary">
                Petfinder
              </span>
            </Link>
            <p className="text-tertiary text-lg font-medium max-w-sm leading-relaxed">
              Transformando a vida de animais abandonados através de conexões
              reais e amorosas entre ONGs e adotantes.
            </p>
            {/* <div className="flex gap-6">
              {[Globe, MessageSquare, Plus].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 flex items-center justify-center bg-surface rounded-2xl text-tertiary hover:bg-primary/10 hover:text-primary transition-all">
                  <Icon size={20} />
                </a>
              ))}
            </div> */}
          </div>

          {/* Links Quick */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">
              Navegação
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  className="text-tertiary font-bold hover:text-primary transition-colors"
                >
                  Encontrar Pet
                </Link>
              </li>
              <li>
                <a
                  href="https://wa.me/5515981349240?text=Olá, sou protetor e gostaria de saber mais sobre o PetFinder."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-tertiary font-bold hover:text-primary transition-colors"
                >
                  Sou Protetor
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5515981349240?text=Olá, gostaria de cadastrar minha ONG no PetFinder."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-tertiary font-bold hover:text-primary transition-colors"
                >
                  Cadastrar ONG
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">
              Suporte
            </h4>
            <ul className="space-y-4">
              {/* <li className="flex items-center gap-3 text-tertiary font-bold italic">
                <MessageSquare size={16} /> suporte@petfinder.com
              </li> */}
              <li>
                <Link to="/termos" className="text-tertiary font-bold hover:text-primary transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link to="/privacidade" className="text-tertiary font-bold hover:text-primary transition-colors">
                  Privacidade
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-10 border-t border-ghost-border text-[10px] font-black uppercase tracking-[0.3em] text-tertiary/40">
          <p>© 2026 Petfinder • Projeto Integrador Univesp</p>
          <div className="flex gap-10">
            <span>Desenvolvido com ❤️ por Alunos Univesp</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
