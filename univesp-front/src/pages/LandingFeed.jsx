import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, MapPin, Filter, Search, Sparkles } from "lucide-react";
import api from "../services/api";
import goldenBanner from "../assets/golden-banner.png";

const LandingFeed = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // States de Filtro
  const [search, setSearch] = useState("");
  const [type, setType] = useState("Todos");
  const [gender, setGender] = useState("");
  const [size, setSize] = useState("");
  const [ageGroup, setAgeGroup] = useState("");

  const fetchPets = async () => {
    setLoading(true);
    try {
      const params = {
        status: "disponível",
        search: search,
        type: type,
        gender: gender,
        size: size,
        age_group: ageGroup,
      };
      const response = await api.get("/pets", { params });
      setPets(response.data);
    } catch (error) {
      console.error("Erro ao buscar animais:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(fetchPets, 500); // Debounce search
    return () => clearTimeout(timeoutId);
  }, [search, type, gender, size, ageGroup]);

  const speciesFilters = ["Todos", "Cachorro", "Gato", "Outros"];

  const clearFilters = () => {
    setSearch("");
    setType("Todos");
    setGender("");
    setSize("");
    setAgeGroup("");
  };
  return (
    <div className="min-h-screen bg-surface pb-40">
      <main className="container pt-20">
        {/* Editorial Heading */}
        <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-10">
          <figure>
            <img src={goldenBanner} alt="PetFinder" />
            <figcaption>
              <h2 className="text-5xl md:text-7xl font-black text-on-surface tracking-tighter leading-none mb-6">
                Encontre seu
                <br />
                novo
                <br />
                <span className="text-primary italic">melhor amigo.</span>
              </h2>
            </figcaption>
          </figure>

          {(gender || size || ageGroup || search || type !== "Todos") && (
            <button
              onClick={clearFilters}
              className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline"
            >
              Limpar Todos os Filtros
            </button>
          )}
        </div>

        {/* Search & Action Bar - Integrated into Content */}
        <div className="flex flex-col md:flex-row gap-8 mb-20 items-center">
          <div className="flex-1 w-full relative group">
            <Search
              className="absolute left-6 top-1/2 -translate-y-1/2 text-tertiary/40 group-focus-within:text-primary transition-colors"
              size={20}
            />
            <input
              type="text"
              placeholder="Pesquisar por Cidade, Estado ou ONG..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-16 pr-8 py-6 bg-white rounded-[2rem] border border-ghost-border focus:ring-4 focus:ring-primary/5 outline-none transition-all shadow-sm text-lg font-medium"
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-4 px-10 py-6 rounded-[2rem] font-black text-xs uppercase tracking-widest transition-all shadow-sm ${
              showFilters || gender || size || ageGroup
                ? "bg-primary text-white scale-105"
                : "bg-white text-tertiary hover:bg-surface-container-low border border-ghost-border"
            }`}
          >
            <Filter size={20} />{" "}
            {showFilters ? "Recolher Filtros" : "Filtros Avançados"}
          </button>
        </div>

        {/* Species Filter Scroll */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-4 no-scrollbar">
          {speciesFilters.map((s) => (
            <button
              key={s}
              onClick={() => setType(s)}
              className={`px-10 py-5 rounded-3xl font-bold whitespace-nowrap transition-all text-xs uppercase tracking-widest ${
                type === s
                  ? "bg-primary text-white shadow-xl shadow-primary/20 scale-105"
                  : "bg-white text-tertiary hover:bg-surface-container-low border border-ghost-border"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Advanced Filters Bar */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 animate-fade-in">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-1">
                Sexo
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full p-5 bg-white border border-ghost-border rounded-[1.5rem] font-bold text-xs appearance-none cursor-pointer outline-none focus:ring-2 focus:ring-primary/10"
              >
                <option value="">Todos</option>
                <option value="Macho">Macho</option>
                <option value="Fêmea">Fêmea</option>
              </select>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-1">
                Porte
              </label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full p-5 bg-white border border-ghost-border rounded-[1.5rem] font-bold text-xs appearance-none cursor-pointer outline-none focus:ring-2 focus:ring-primary/10"
              >
                <option value="">Todos</option>
                <option value="Pequeno">Pequeno</option>
                <option value="Porte Médio">Médio</option>
                <option value="Grande">Grande</option>
              </select>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-1">
                Idade
              </label>
              <select
                value={ageGroup}
                onChange={(e) => setAgeGroup(e.target.value)}
                className="w-full p-5 bg-white border border-ghost-border rounded-[1.5rem] font-bold text-xs appearance-none cursor-pointer outline-none focus:ring-2 focus:ring-primary/10"
              >
                <option value="">Todas</option>
                <option value="Filhote">Filhote (até 1 ano)</option>
                <option value="Adulto">Adulto (1-7 anos)</option>
                <option value="Sênior">Sênior (+7 anos)</option>
              </select>
            </div>
          </div>
        )}

        {/* Grid Containerized */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="animate-pulse flex flex-col gap-6">
                <div className="aspect-[3/4] bg-surface-container-highest rounded-[3rem]" />
                <div className="h-6 w-1/2 bg-surface-container-highest rounded-full" />
                <div className="h-4 w-1/3 bg-surface-container-highest rounded-full" />
              </div>
            ))}
          </div>
        ) : pets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-20">
            {pets.map((pet) => (
              <Link
                key={pet.id}
                to={`/pet/${pet.id}`}
                className="group relative"
              >
                <div className="relative aspect-[3/4] rounded-[3rem] overflow-hidden mb-6 shadow-ambient transition-all duration-700 group-hover:scale-[1.02] group-hover:-translate-y-2">
                  <img
                    src={pet.image_url || "https://via.placeholder.com/600x800"}
                    alt={pet.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-6 right-6">
                    <div className="w-12 h-12 bg-white/95 backdrop-blur rounded-2xl flex items-center justify-center text-tertiary shadow-lg group-hover:text-primary transition-colors">
                      <Heart size={24} />
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-6 px-4 py-2 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest">
                    {pet.type}
                  </div>
                </div>

                <div className="px-2">
                  <h3 className="text-3xl font-black tracking-tight text-on-surface group-hover:text-primary transition-colors mb-2 italic">
                    {pet.name}
                  </h3>
                  <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4 line-clamp-1">
                    {pet.institution_name}
                  </p>
                  <div className="flex items-center gap-2 text-tertiary mb-6">
                    <MapPin size={14} className="text-primary" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {pet.location}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="chip uppercase">{pet.gender}</span>
                    <span className="chip bg-surface-container-highest text-tertiary uppercase">
                      {pet.size}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-32 text-center section-tonal border-2 border-dashed border-primary/10">
            <Sparkles size={64} className="mx-auto text-primary/10 mb-8" />
            <h2 className="text-4xl font-black mb-4 italic">
              Nenhum amigo encontrado.
            </h2>
            <p className="text-tertiary font-medium mb-12">
              Tente ajustar seus filtros ou pesquisar por outra cidade.
            </p>
            <button onClick={clearFilters} className="btn-primary">
              Ver Todos os Animais
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default LandingFeed;
