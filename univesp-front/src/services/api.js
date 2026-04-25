import axios from 'axios';
import mockPets from '../data/mockPets';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Interceptor para adicionar o token JWT em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para fallback de dados mockados em caso de erro na API
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { config } = error;
    
    // Se a requisição falhar (API indisponível) e for para a rota de pets
    if (!error.response || error.code === 'ERR_NETWORK' || error.response.status >= 500) {
      if (config.url.includes('/pets')) {
        console.warn('API indisponível, usando dados mockados para /pets');
        
        // Simular o comportamento da listagem com filtros
        if (config.method === 'get' && config.url.endsWith('/pets')) {
          let filteredPets = [...mockPets];
          const params = config.params || {};

          if (params.type && params.type !== 'Todos') {
            filteredPets = filteredPets.filter(p => p.type === params.type);
          }
          if (params.gender) {
            filteredPets = filteredPets.filter(p => p.gender === params.gender);
          }
          if (params.size) {
            filteredPets = filteredPets.filter(p => p.size === params.size);
          }
          if (params.search) {
            const search = params.search.toLowerCase();
            filteredPets = filteredPets.filter(p => 
              p.name.toLowerCase().includes(search) || 
              p.location.toLowerCase().includes(search) ||
              p.institution_name.toLowerCase().includes(search)
            );
          }
          // Filtro de idade simplificado para o mock
          if (params.age_group) {
            if (params.age_group === 'Filhote') {
              filteredPets = filteredPets.filter(p => p.age < 12);
            } else if (params.age_group === 'Adulto') {
              filteredPets = filteredPets.filter(p => p.age >= 12 && p.age <= 84);
            } else if (params.age_group === 'Sênior') {
              filteredPets = filteredPets.filter(p => p.age > 84);
            }
          }

          return Promise.resolve({ data: filteredPets, status: 200 });
        }
        
        // Simular o comportamento do detalhe
        const detailMatch = config.url.match(/\/pets\/(\d+)$/);
        if (config.method === 'get' && detailMatch) {
          const id = parseInt(detailMatch[1]);
          const pet = mockPets.find(p => p.id === id);
          if (pet) return Promise.resolve({ data: pet, status: 200 });
        }

        // Simular listagem do usuário (meus pets)
        if (config.method === 'get' && config.url.includes('/pets/me')) {
          return Promise.resolve({ data: mockPets.slice(0, 3), status: 200 });
        }
      }
    }
    
    return Promise.reject(error);
  }
);


export default api;

