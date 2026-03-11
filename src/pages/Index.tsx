import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Braces, Globe, Pencil, BookOpen, Users, Copy, Upload, Sparkles, FileJson, Star, ArrowRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ParticleBackground = () => (
  <div className="particles-container">
    {[...Array(20)].map((_, i) => (
      <div 
        key={i} 
        className="particle"
        style={{
          left: `${Math.random() * 100}%`,
          width: `${Math.random() * 6 + 2}px`,
          height: `${Math.random() * 6 + 2}px`,
          "--duration": `${Math.random() * 10 + 10}s`,
          "--x-start": `${Math.random() * 20 - 10}px`,
          "--x-end": `${Math.random() * 60 - 30}px`,
        } as React.CSSProperties}
      />
    ))}
  </div>
);

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

const features = [
  { icon: Braces, title: "JSON estruturado", desc: "Prompts organizados em campos precisos — sujeito, estilo, iluminação, câmera, humor e mais. A IA lê melhor. Você controla melhor." },
  { icon: Globe, title: "Três idiomas", desc: "Gere o prompt em Português, Inglês ou Espanhol com um clique. Sem reprocessar a imagem." },
  { icon: Pencil, title: "Editor de prompts", desc: "Ajuste cada campo antes de exportar. Adicione, remova ou refine detalhes até chegar no resultado que você imagina." },
  { icon: BookOpen, title: "Biblioteca pessoal", desc: "Todos os seus prompts salvos, organizados e acessíveis. Crie coleções e encontre qualquer análise em segundos." },
  { icon: Users, title: "Galeria da comunidade", desc: "Explore prompts criados por outros usuários. Copie, se inspire e publique os seus para ganhar visibilidade." },
  { icon: Copy, title: "Copiar e exportar", desc: "Copie como JSON, como texto ou exporte o arquivo. Pronto para colar em qualquer ferramenta de IA em um clique." },
];

const plans = [
  { name: "Free", price: "R$ 0", period: "/para sempre", desc: "Para experimentar sem compromisso.", features: ["20 análises por mês", "Prompt JSON básico", "Biblioteca pessoal"], cta: "Começar grátis", highlight: false },
  { name: "Pro", price: "R$ 49", period: "/por mês", desc: "Para criadores que usam IA todos os dias.", features: ["200 análises por mês", "Multi-idioma", "Editor avançado", "Galeria pública", "Suporte prioritário"], cta: "Assinar Pro", highlight: true },
  { name: "Agency", price: "R$ 129", period: "/por mês", desc: "Para times e agências que produzem em escala.", features: ["Análises ilimitadas", "API de acesso direto", "Times e colaboração", "Exportação em massa", "Suporte dedicado"], cta: "Falar com a equipe", highlight: false },
];

const sampleJson = `{
  "subject": "Mulher jovem com traços asiáticos",
  "style": "Retrato editorial cyberpunk, fotografia de estúdio criativa",
  "lighting": "Gel studio lighting, luz de recorte azul e roxa",
  "colors": ["azul ciano", "roxo neon", "tons de pele naturais"],
  "mood": "Intenso, futurista, misterioso",
  "camera": "Sony A7R IV, lente 85mm f/1.4",
  "composition": "Close-up médio, contato visual direto",
  "quality_tags": ["8k", "masterpiece", "photorealistic"]
}`;

const carouselImages = [
  { url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=800&fit=crop", prompt: JSON.stringify({ subject: "woman", lighting: "blue and orange teal shadows", quality: "cinematic 8k", style: "hyper-realistic portrait" }, null, 2) },
  { url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=800&fit=crop", prompt: JSON.stringify({ subject: "man", textures: "weathered skin details", style: "dramatic black and white", focus: "extremely detailed" }, null, 2) },
  { url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=800&fit=crop", prompt: JSON.stringify({ subject: "cyberpunk girl", makeup: "neon", atmosphere: "ambient purple light", engine: "unreal engine 5" }, null, 2) },
  { url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop", prompt: JSON.stringify({ subject: "male model", lighting: "soft natural", aesthetic: "minimalist", lens: "85mm" }, null, 2) },
  { url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop", prompt: JSON.stringify({ subject: "female portrait", skin: "glowy", style: "magazine", background: "soft focus" }, null, 2) },
  { url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=800&fit=crop", prompt: JSON.stringify({ subject: "business woman", attire: "corporate", focus: "sharp", style: "professional headshot" }, null, 2) },
  { url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=800&fit=crop", prompt: JSON.stringify({ subject: "man in natural light", setting: "outdoor", depth_of_field: "shallow", lens: "50mm" }, null, 2) },
  { url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=800&fit=crop", prompt: JSON.stringify({ subject: "elegant woman", colors: "vibrant", style: "fashion photography", aesthetic: "luxury" }, null, 2) },
];

const carouselImages2 = [
  { url: "/assets/images/cinematic_gallery_1_1773248641614.png", prompt: JSON.stringify({ subject: "cyberpunk wanderer", setting: "neon rainy city", aesthetic: "futuristic", detail: "ultra-detailed" }, null, 2) },
  { url: "/assets/images/cinematic_gallery_2_1773248657144.png", prompt: JSON.stringify({ subject: "astronaut", setting: "crystal desert", celestial: "two moons", lighting: "cinematic" }, null, 2) },
  { url: "/assets/images/cinematic_gallery_3_1773248672002.png", prompt: JSON.stringify({ setting: "Victorian library", elements: "magical floating books", atmosphere: "warm ambient" }, null, 2) },
  { url: "/assets/images/cinematic_gallery_4_1773248691187.png", prompt: JSON.stringify({ action: "high-speed chase", vehicle: "sleek futuristic car", time: "sunset", blur: "motion" }, null, 2) },
  { url: "/assets/images/cinematic_gallery_5_1773248708993.png", prompt: JSON.stringify({ subject: "mechanical dragon", material: "brass and gears", action: "breathing blue fire" }, null, 2) },
  { url: "/assets/images/cinematic_gallery_6_1773248727151.png", prompt: JSON.stringify({ character: "samurai", setting: "modern Tokyo", contrast: "tradition vs tech", elements: "cherry blossoms" }, null, 2) },
  { url: "/assets/images/cinematic_gallery_7_1773248743498.png", prompt: JSON.stringify({ subject: "deep sea explorer", setting: "sunken city", lighting: "bioluminescent" }, null, 2) },
  { url: "/assets/images/cinematic_gallery_8_1773248763573.png", prompt: JSON.stringify({ setting: "cozy cabin", weather: "heavy snowstorm", lighting: "warm indoor", style: "hyper-realistic" }, null, 2) },
];

const testimonials = [
  { name: "Ana Silva", avatar: "/assets/images/avatar_1_1773248795798.png", comment: "A precisão dos prompts JSON é assustadora. Economizo horas de trabalho!", rating: 5 },
  { name: "Marcos Oliveira", avatar: "/assets/images/avatar_2_1773248814423.png", comment: "Melhor ferramenta para quem trabalha seriamente com Midjourney.", rating: 5 },
  { name: "Beatriz Costa", avatar: "/assets/images/avatar_3_1773248830576.png", comment: "O editor de prompts me dá o controle que eu precisava. Incrível!", rating: 5 },
  { name: "Ricardo Santos", avatar: "/assets/images/avatar_4_1773248846644.png", comment: "Simplesmente essencial no meu workflow diário de criação.", rating: 5 },
  { name: "Julia Lins", avatar: "/assets/images/avatar_5_1773248861563.png", comment: "Gosto muito da biblioteca pessoal para organizar minhas ideias.", rating: 5 },
  { name: "Thiago Mendes", avatar: "/assets/images/avatar_6_1773248884271.png", comment: "O suporte é rápido e a IA está sempre evoluindo. Recomendo!", rating: 5 },
  { name: "Carla Souza", avatar: "/assets/images/avatar_7_1773248902734.png", comment: "A galeria da comunidade é uma fonte inesgotável de inspiração.", rating: 5 },
  { name: "Fernando Lima", avatar: "/assets/images/avatar_8_1773248917867.png", comment: "Excelente custo-benefício para agências de publicidade.", rating: 5 },
  { name: "Isabela Rocha", avatar: "/assets/images/avatar_1_1773248795798.png", comment: "Facilidade de uso e resultados de alta qualidade sempre.", rating: 5 },
  { name: "Gustavo Paiva", avatar: "/assets/images/avatar_2_1773248814423.png", comment: "Transformou minha maneira de interagir com as ferramentas de IA.", rating: 5 },
];

const faqs = [
  { q: "O prompt gerado funciona em qualquer IA?", a: "Sim! O prompt JSON extrai os conceitos universais da imagem, facilitando a recriação no Midjourney, DALL-E 3, Flux, Stable Diffusion e outras ferramentas." },
  { q: "Posso testar sem pagar nada?", a: "Com certeza. O plano Free permite até 20 análises gratuitas todos os meses para você conhecer a precisão da nossa IA." },
  { q: "Como o 'Editor de Prompts' ajuda na criação?", a: "A IA pode interpretar detalhes que você queira mudar. O editor permite ajustar campos específicos como iluminação ou estilo antes de você gerar sua nova imagem." },
  { q: "Meus dados e imagens estão seguros?", a: "Privacidade é nossa prioridade. Suas imagens de upload são processadas de forma segura e não são compartilhadas com terceiros." },
];

export default function LandingPage() {
  const { scrollY } = useScroll();
  const yOrb1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const yOrb2 = useTransform(scrollY, [0, 1000], [0, -150]);
  const yMockup = useTransform(scrollY, [0, 1000], [0, 100]);

  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: "start",
    dragFree: true
  }, [AutoScroll({ playOnInit: true, speed: 1, stopOnInteraction: false, stopOnMouseEnter: false, stopOnFocusIn: false })]);

  const [emblaRef2, emblaApi2] = useEmblaCarousel({ 
    loop: true, 
    align: "start",
    dragFree: true
  }, [AutoScroll({ playOnInit: true, speed: -1, stopOnInteraction: false, stopOnMouseEnter: false, stopOnFocusIn: false })]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-36 pb-24 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background orbs */}
        <motion.div style={{ y: yOrb1 }} className="bg-orb-blue -top-32 -left-32" />
        <motion.div style={{ y: yOrb2 }} className="bg-orb-purple -bottom-32 -right-32" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              {...fadeUp(0)}
              className="font-heading text-[40px] md:text-[64px] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground"
            >
              Qualquer imagem.<br className="hidden md:block" />{" "}
              <span className="text-gradient">O prompt perfeito.</span>
            </motion.h1>
            <motion.p
              {...fadeUp(0.15)}
              className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-[1.7]"
            >
              Envie uma foto e receba instantaneamente um prompt JSON estruturado, detalhado e pronto para recriar a imagem em Midjourney, DALL-E, Flux ou qualquer ferramenta de IA.
            </motion.p>
            <motion.div {...fadeUp(0.3)} className="mt-10 flex flex-col items-center">
              <Link to="/login">
                <Button variant="glass" size="lg" className="btn-machine-green px-12 py-7 h-auto text-lg group">
                  COMECE GRATUITAMENTE <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <p className="mt-4 text-xs text-muted-foreground">Sem cartão de crédito. Resultado em segundos.</p>
            </motion.div>
          </div>

          {/* Hero Mockup */}
          <motion.div
            style={{ y: yMockup }}
            {...fadeUp(0.4)}
            className="mt-20 max-w-5xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto items-center">
              <div className="relative aspect-[4/3] md:aspect-auto rounded-3xl overflow-hidden glass hover:border-primary/40 transition-all duration-700 shadow-2xl shadow-primary/5">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=600&fit=crop"
                  alt="Exemplo de imagem analisada"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-background/20" />
              </div>
              <div className="p-6 md:p-10 flex flex-col justify-center glass-code rounded-3xl hover:border-primary/40 transition-all duration-700 shadow-2xl overflow-hidden">
                <div className="flex items-center gap-2 mb-4">
                  <FileJson className="w-4 h-4 text-primary" />
                  <span className="text-xs font-mono text-muted-foreground">prompt.json</span>
                </div>
                <div className="overflow-x-auto">
                  <pre className="font-mono text-xs md:text-sm leading-relaxed text-muted-foreground json-container whitespace-pre-wrap">
                    {sampleJson}
                  </pre>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mini Gallery Carousel */}
      <section id="gallery" className="py-24 bg-secondary/30 section-divider-shadow">
        <div className="container mx-auto px-6 mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-xl">
              <span className="text-primary font-mono text-sm uppercase tracking-wider mb-2 block">Galeria em destaque</span>
              <h2 className="font-heading text-2xl md:text-4xl font-medium text-foreground tracking-[-0.02em]">
                Resultados reais dos nossos usuários
              </h2>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {[...carouselImages, ...carouselImages].map((img, i) => (
                <div key={i} className="flex-[0_0_80%] sm:flex-[0_0_35%] lg:flex-[0_0_20%] min-w-0">
                  <div className="glass rounded-xl overflow-hidden aspect-[4/5] group cursor-pointer border-border/20 relative">
                    <img 
                      src={img.url} 
                      alt="Carousel item" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-background/90 hover-slide-meta flex items-end p-6 overflow-auto">
                      <pre className="text-[10px] text-primary font-mono leading-tight whitespace-pre-wrap">
                        {img.prompt}
                      </pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden" ref={emblaRef2}>
            <div className="flex gap-4">
              {[...carouselImages2, ...carouselImages2].map((img, i) => (
                <div key={i} className="flex-[0_0_80%] sm:flex-[0_0_35%] lg:flex-[0_0_20%] min-w-0">
                  <div className="glass rounded-xl overflow-hidden aspect-[4/5] group cursor-pointer border-border/20 relative">
                    <img 
                      src={img.url} 
                      alt="Carousel item" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-background/90 hover-slide-meta flex items-end p-6 overflow-auto">
                      <pre className="text-[10px] text-primary font-mono leading-tight whitespace-pre-wrap">
                        {img.prompt}
                      </pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 md:py-32 relative overflow-hidden section-divider-shadow bg-secondary/10">
        <ParticleBackground />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div {...fadeUp(0)} className="text-center mb-20">
            <span className="text-primary font-mono text-sm uppercase tracking-wider mb-2 block">Como funciona</span>
            <h2 className="font-heading text-2xl md:text-4xl font-medium text-foreground tracking-[-0.02em]">
              De imagem a prompt em três passos
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-4xl mx-auto">
            {[
              { icon: Upload, step: "01", title: "Envie sua imagem", desc: "Arraste ou selecione qualquer foto, ilustração ou render 3D. JPG, PNG ou WEBP." },
              { icon: Sparkles, step: "02", title: "A IA lê cada detalhe", desc: "Nossa inteligência artificial analisa sujeito, composição, iluminação, cores, estilo e muito mais." },
              { icon: Braces, step: "03", title: "Receba seu prompt JSON", desc: "Um prompt estruturado, preciso e editável — pronto para recriar a imagem em qualquer ferramenta de IA." },
            ].map((item, i) => (
              <motion.div key={item.step} {...fadeUp(i * 0.15)} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl glass mb-6">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <span className="block font-mono text-xs text-muted-foreground mb-2">{item.step}</span>
                <h3 className="font-heading text-lg font-medium text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp(0.5)} className="mt-20 text-center">
            <a href="#pricing">
              <Button variant="glass" size="lg" className="btn-premium-glass btn-light-beam px-10 py-7 h-auto text-lg group">
                Libere seu Potencial Criativo Agora <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Practical Example */}
      <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp(0)} className="order-2 lg:order-1">
              <div className="relative rounded-[2rem] overflow-hidden aspect-square md:aspect-[4/3] glass-subtle border border-white/10 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=1200&h=900&fit=crop" 
                  alt="Dashboard Preview" 
                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-background/80 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 glass p-6 rounded-2xl border border-white/5 backdrop-blur-xl">
                  <pre className="text-[10px] md:text-xs text-primary font-mono leading-tight">
{JSON.stringify({
  subject: "majestic mountain landscape",
  lighting: "golden hour, volumetric rays",
  atmosphere: "mystical, fog",
  quality: "8k, unreal engine 5"
}, null, 2)}
                  </pre>
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeUp(0.2)} className="order-1 lg:order-2">
              <span className="text-primary font-mono text-sm uppercase tracking-[0.2em] mb-4 block">Exemplo na prática</span>
              <h2 className="font-heading text-3xl md:text-5xl font-medium text-foreground mb-8 leading-tight tracking-[-0.02em]">
                Do olhar à perfeição em <span className="text-gradient">segundos</span>
              </h2>
              
              <div className="space-y-8">
                {[
                  { step: "01", title: "Visão Profunda", desc: "Nossa IA 'enxerga' além dos pixels, identificando texturas, luzes e intenções artísticas ocultas." },
                  { step: "02", title: "Estruturação JSON", desc: "Transformamos a análise em dados estruturados. Cada detalhe vira um parâmetro editável e preciso." },
                  { step: "03", title: "Prompt Universal", desc: "O resultado é um prompt master, compatível com as melhores ferramentas de geração do mundo." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <span className="font-mono text-primary/40 text-2xl font-bold leading-none">{item.step}</span>
                    <div>
                      <h4 className="font-heading text-lg font-medium text-foreground mb-2">{item.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <a href="#pricing">
                  <Button variant="glass" className="btn-premium-glass btn-light-beam px-8 py-6 h-auto group">
                    Descobrir meu Potencial Agora <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 md:py-32 section-divider-shadow">
        <div className="container mx-auto px-6">
          <motion.div {...fadeUp(0)} className="text-center mb-20">
            <span className="text-primary font-mono text-sm uppercase tracking-wider mb-2 block">Recursos</span>
            <h2 className="font-heading text-2xl md:text-4xl font-medium text-foreground tracking-[-0.02em] mb-4">
              Tudo que um criador precisa
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Desenvolvido para quem leva criação com IA a sério.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                {...fadeUp(i * 0.08)}
                className="p-8 glass hover:-translate-y-1 hover:border-foreground/16 transition-all duration-300"
              >
                <f.icon className="w-5 h-5 text-primary mb-4" />
                <h3 className="font-heading text-base font-medium text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-24 bg-secondary/5 overflow-hidden">
        <div className="container mx-auto px-6 mb-16 text-center">
          <motion.div {...fadeUp(0)}>
            <div className="flex justify-center gap-1.5 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 star-yellow fill-current" />
              ))}
            </div>
            <h2 className="font-heading text-2xl md:text-4xl font-medium text-foreground tracking-[-0.02em]">
              Mais de <span className="text-gradient">3.000 avaliações</span> positivas
            </h2>
            <p className="mt-4 text-muted-foreground">Junte-se a milhares de criadores que já transformaram seu processo criativo.</p>
          </motion.div>
        </div>

        <div className="social-proof-carousel-wrapper space-y-8">
          <div className="flex gap-6 animate-social-proof-slide whitespace-nowrap">
            {[...testimonials.slice(0, 5), ...testimonials.slice(0, 5)].map((t, i) => (
              <div key={i} className="w-[350px] shrink-0">
                <div className="p-8 glass rounded-3xl h-full flex flex-col justify-between hover:border-primary/40 transition-all duration-500">
                  <div>
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="w-3 h-3 star-yellow fill-current" />
                      ))}
                    </div>
                    <p className="text-sm text-foreground/80 leading-relaxed italic whitespace-normal">"{t.comment}"</p>
                  </div>
                  <div className="flex items-center gap-3 mt-8">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-border/50">
                      <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">{t.name}</h4>
                      <span className="text-[10px] text-muted-foreground">Usuário Verificado</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-6 animate-social-proof-slide-reverse whitespace-nowrap">
            {[...testimonials.slice(5), ...testimonials.slice(5)].map((t, i) => (
              <div key={i} className="w-[350px] shrink-0">
                <div className="p-8 glass rounded-3xl h-full flex flex-col justify-between hover:border-primary/40 transition-all duration-500">
                  <div>
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="w-3 h-3 star-yellow fill-current" />
                      ))}
                    </div>
                    <p className="text-sm text-foreground/80 leading-relaxed italic whitespace-normal">"{t.comment}"</p>
                  </div>
                  <div className="flex items-center gap-3 mt-8">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-border/50">
                      <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">{t.name}</h4>
                      <span className="text-[10px] text-muted-foreground">Usuário Verificado</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 md:py-32 section-divider-shadow">
        <div className="container mx-auto px-6">
          <motion.div {...fadeUp(0)} className="text-center mb-20">
            <span className="text-primary font-mono text-sm uppercase tracking-wider mb-2 block">Preços</span>
            <h2 className="font-heading text-2xl md:text-4xl font-medium text-foreground tracking-[-0.02em] mb-4">
              Simples. Transparente. Sem surpresas.
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comece grátis e evolua conforme sua criação cresce.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6 items-center max-w-6xl mx-auto px-4 md:px-0">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                {...fadeUp(i * 0.1)}
                className={`relative p-8 glass transition-all duration-700 hover:-translate-y-2 border-beam-container ${
                  plan.highlight ? "pro-plan-glow border-primary/50 ring-1 ring-primary/30 md:scale-110 z-20 shadow-3xl shadow-primary/20" : "z-10"
                }`}
              >
                {plan.highlight && <div className="border-beam" />}
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1.5 text-xs font-bold uppercase tracking-widest btn-glow text-foreground rounded-full border border-primary/30 shadow-lg shadow-primary/20">
                      Popular
                    </span>
                  </div>
                )}
                <h3 className="font-heading text-lg font-medium text-foreground">{plan.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-heading text-4xl font-semibold text-foreground">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{plan.desc}</p>
                <ul className="mt-8 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link to="/signup">
                    <Button
                      variant={plan.name === "Pro" ? "glass" : (plan.highlight ? "glass" : "outline")}
                      className={`w-full py-6 h-auto ${plan.name === "Pro" ? "btn-machine-green" : ""}`}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeUp(0.2)} className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              Todos os planos incluem criptografia de dados, backups automáticos e acesso imediato após o pagamento.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 md:py-32 bg-secondary/20 section-divider-shadow">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div {...fadeUp(0)} className="text-center mb-16">
            <span className="text-primary font-mono text-sm uppercase tracking-wider mb-2 block">FAQ</span>
            <h2 className="font-heading text-2xl md:text-3xl font-medium text-foreground tracking-[-0.02em]">
              Perguntas Frequentes
            </h2>
          </motion.div>
          
          <motion.div {...fadeUp(0.1)}>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="glass-subtle mb-4 border-none px-6 rounded-2xl">
                  <AccordionTrigger className="text-left font-heading hover:no-underline py-6">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          <motion.div {...fadeUp(0.2)} className="mt-16 text-center">
            <h3 className="font-heading text-lg font-medium text-foreground mb-6">Ainda tem dúvidas?</h3>
            <a href="#pricing">
              <Button variant="glass" size="lg" className="btn-premium-glass btn-light-beam px-8 py-6 h-auto group">
                Quero me Inscrever Agora <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
      <div className="noise-overlay" />
    </div>
  );
}