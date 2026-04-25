import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Share2,
  Info,
  MessageSquare,
  Calendar,
  Ruler,
  User,
} from "lucide-react";
import api from "../services/api";

const formatPhone = (phone) => {
  if (!phone) return "";
  const cleaned = phone.replace(/\D/g, "");
  
  // Caso: 5515997321279 (13 dígitos)
  if (cleaned.length === 13 && cleaned.startsWith("55")) {
    return `(${cleaned.slice(2, 4)}) ${cleaned.slice(4, 9)}-${cleaned.slice(9)}`;
  }
  
  // Caso: 15997321279 (11 dígitos)
  if (cleaned.length === 11) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
  }

  // Caso: 1532711234 (10 dígitos)
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
  }
  
  return phone;
};

const PetDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await api.get(`/pets/${id}`);
        setPet(response.data);
      } catch (error) {
        console.error("Erro ao buscar animal:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPet();
  }, [id]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Conheça o ${pet?.name}`,
          text: `Olha que fofura esse ${pet?.type} esperando por um lar!`,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Erro ao compartilhar:", err);
      }
    } else {
      alert("Link copiado para a área de transferência!");
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleContact = () => {
    if (pet?.owner_phone) {
      // aqui substituir por "Acesse https://wa.me/5515997321279"
      window.location.href = `https://wa.me/${pet.owner_phone}`;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-black mb-4">Inexistente.</h1>
        <p className="text-tertiary mb-12 max-w-sm">
          Este amigo já pode ter encontrado um lar ou o link expirou.
        </p>
        <button onClick={() => navigate("/")} className="btn-primary">
          Voltar ao Feed
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface pb-40">
      <div className="container pt-12">
        <div className="flex justify-between items-center mb-12">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-3 font-black uppercase tracking-widest text-[10px] text-tertiary hover:text-primary transition-colors"
          >
            <ArrowLeft size={18} /> Voltar ao Feed
          </button>
          <button
            onClick={handleShare}
            className="w-12 h-12 flex items-center justify-center bg-white border border-ghost-border rounded-2xl text-tertiary shadow-sm hover:text-primary transition-all"
          >
            <Share2 size={20} />
          </button>
        </div>
      </div>

      <main className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-6">
            <div className="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-ambient ring-8 ring-white/50">
              <img
                src={pet.image_url || "https://via.placeholder.com/800x1000"}
                alt={pet.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="mb-12">
              <h1 className="text-7xl md:text-8xl font-black text-on-surface mb-6 tracking-tighter italic">
                {pet.name}
                <span className="text-primary">.</span>
              </h1>
              <div className="flex items-center gap-3 text-tertiary text-xl font-bold">
                <MapPin size={24} className="text-primary" />
                <span>{pet.location}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-16">
              {[
                {
                  label: "Idade",
                  value:
                    pet.age < 12
                      ? `${pet.age} meses`
                      : `${Math.floor(pet.age / 12)} anos`,
                  icon: Calendar,
                },
                { label: "Porte", value: pet.size, icon: Ruler },
                { label: "Espécie", value: pet.type, icon: Info },
                { label: "Sexo", value: pet.gender, icon: User },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-surface-container-low p-8 rounded-[2.5rem] flex flex-col gap-6 border border-transparent hover:border-ghost-border transition-colors group"
                >
                  <item.icon size={24} className="text-primary" />
                  <div>
                    <label className="text-[10px] font-black text-tertiary uppercase tracking-[0.2em] mb-1 block">
                      {item.label}
                    </label>
                    <p className="text-2xl font-black text-on-surface">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {pet.description && (
              <div className="mb-16">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary/40 mb-8 ml-1">
                  Descrição
                </h3>
                <p className="text-on-surface-variant text-xl md:text-2xl leading-relaxed font-medium">
                  {pet.description}
                </p>
              </div>
            )}

            <div className="card-white p-10 md:p-14 relative overflow-hidden ring-1 ring-ghost-border">
              <div className="relative z-10">
                <div className="flex items-center gap-6 mb-10">
                  <div className="w-20 h-20 bg-surface-container-low rounded-[1.5rem] overflow-hidden border border-ghost-border">
                    <img
                      src={
                        pet.owner_avatar ||
                        `https://api.dicebear.com/7.x/initials/svg?seed=${pet.institution_name}`
                      }
                      alt="ONG"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-2xl font-black text-on-surface leading-tight italic">
                      {pet.institution_name}
                    </h4>
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  {pet.owner_phone ? (
                    <button
                      onClick={handleContact}
                      className="btn-primary w-full !py-7 text-xl shadow-2xl flex items-center justify-center gap-4"
                    >
                      <MessageSquare size={24} /> Entrar em Contato
                    </button>
                  ) : (
                    <div className="p-8 bg-surface-container-low rounded-2xl text-center text-tertiary font-bold">
                      Contato indisponível.
                    </div>
                  )}
                  <p className="text-center text-tertiary text-[10px] font-black uppercase tracking-[0.2em]">
                    {pet.owner_phone
                      ? `Ligue para ${formatPhone(pet.owner_phone)}`
                      : ""}
                  </p>
                </div>
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl opacity-50" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PetDetail;
