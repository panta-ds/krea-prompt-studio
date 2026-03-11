export const mockJsonPrompt = {
  subject: "Uma mulher jovem com cabelos ondulados escuros, olhando para o lado com expressão contemplativa",
  style: "Fotografia editorial de moda, estilo revista Vogue",
  lighting: "Luz natural suave vindo de uma janela lateral, golden hour, sombras dramáticas",
  colors: ["dourado quente", "preto profundo", "bege neutro", "tons de pele naturais"],
  composition: "Retrato meio-corpo, regra dos terços, fundo desfocado com bokeh",
  mood: "Elegante, introspectivo, sofisticado, intimista",
  camera: "Canon EOS R5, lente 85mm f/1.4, abertura ampla, ISO 200",
  environment: "Estúdio minimalista com paredes de concreto bruto, luz natural filtrada",
  negative_prompt: "deformado, baixa qualidade, pixelado, borrado, texto, marca d'água, cartoon, 3d render",
  quality_tags: ["8k", "ultra detalhado", "fotorrealista", "iluminação cinematográfica", "masterpiece"]
};

export const mockAnalyses = [
  {
    id: "1",
    title: "Retrato Editorial",
    date: "2026-03-10",
    language: "PT",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    prompt: mockJsonPrompt,
  },
  {
    id: "2",
    title: "Paisagem Nórdica",
    date: "2026-03-09",
    language: "PT",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
    prompt: { ...mockJsonPrompt, subject: "Montanhas cobertas de neve ao amanhecer" },
  },
  {
    id: "3",
    title: "Natureza Morta",
    date: "2026-03-08",
    language: "EN",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=400&h=400&fit=crop",
    prompt: { ...mockJsonPrompt, subject: "Arranjo de flores secas em vaso de cerâmica" },
  },
  {
    id: "4",
    title: "Arquitetura Brutalista",
    date: "2026-03-07",
    language: "PT",
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=400&fit=crop",
    prompt: { ...mockJsonPrompt, subject: "Edifício de concreto com formas geométricas" },
  },
  {
    id: "5",
    title: "Street Photography",
    date: "2026-03-06",
    language: "EN",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=400&fit=crop",
    prompt: { ...mockJsonPrompt, subject: "Rua urbana com reflexos de néon na chuva" },
  },
  {
    id: "6",
    title: "Macro Fotografia",
    date: "2026-03-05",
    language: "ES",
    image: "https://images.unsplash.com/photo-1550159930-40066082a4fc?w=400&h=400&fit=crop",
    prompt: { ...mockJsonPrompt, subject: "Gota de orvalho em pétala de rosa" },
  },
];

export const mockGalleryItems = [
  {
    id: "g1",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop",
    copies: 234,
    prompt: mockJsonPrompt,
  },
  {
    id: "g2",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    copies: 189,
    prompt: mockJsonPrompt,
  },
  {
    id: "g3",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=600&h=600&fit=crop",
    copies: 156,
    prompt: mockJsonPrompt,
  },
  {
    id: "g4",
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=600&h=900&fit=crop",
    copies: 142,
    prompt: mockJsonPrompt,
  },
  {
    id: "g5",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&h=400&fit=crop",
    copies: 128,
    prompt: mockJsonPrompt,
  },
  {
    id: "g6",
    image: "https://images.unsplash.com/photo-1550159930-40066082a4fc?w=600&h=700&fit=crop",
    copies: 115,
    prompt: mockJsonPrompt,
  },
  {
    id: "g7",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop",
    copies: 98,
    prompt: mockJsonPrompt,
  },
  {
    id: "g8",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=500&fit=crop",
    copies: 87,
    prompt: mockJsonPrompt,
  },
];
