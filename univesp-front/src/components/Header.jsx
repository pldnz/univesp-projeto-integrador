import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, LogOut, Settings } from "lucide-react";

import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky left-0 top-0 z-[100] glass-nav py-6">
      <div className="container flex justify-between items-center">
        {/* Logo / Brand */}
        <Link
          to="/"
          className="flex items-center gap-3 active:scale-95 transition-transform"
        >
          <span className="text-3xl font-black tracking-tighter text-primary">
            PetFinder
          </span>
        </Link>

        {/* Navigation - momentaneamente escondido até hospedar o backend */}
        <div className="flex items-center gap-4 hidden">
          {user ? (
            <div className="flex items-center gap-4">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-5 py-3 bg-primary/10 text-primary rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all"
              >
                <Settings size={16} /> Painel
              </Link>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="w-12 h-12 flex items-center justify-center bg-surface-container-low text-tertiary rounded-2xl hover:bg-error/10 hover:text-error transition-all"
                title="Sair"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <a
              href="https://wa.me/5515981349240?text=Olá, sou protetor e gostaria de saber mais sobre o PetFinder."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary !px-8 !py-3.5 text-xs tracking-widest"
            >
              Sou Protetor
            </a>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
