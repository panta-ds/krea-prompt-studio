import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Braces, Globe, Pencil, BookOpen, Users, Copy, Upload, Sparkles, FileJson, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  { name: "Free", price: "R$ 0", period: "/para sempre", desc: "Para experimentar sem compromisso.", features: ["5 análises por mês", "Prompt JSON básico", "Biblioteca pessoal", "1 idioma de saída"], cta: "Começar grátis", highlight: false },
  { name: "Pro", price: "R$ 49", period: "/por mês", desc: "Para criadores que usam IA todos os dias.", features: ["200 análises por mês", "Prompt JSON avançado (10+ campos)", "Editor completo de prompts", "3 idiomas de saída", "Galeria pública", "Exportação JSON e CSV", "Suporte prioritário"], cta: "Assinar Pro", highlight: true },
  { name: "Agency", price: "R$ 129", period: "/por mês", desc: "Para times e agências que produzem em escala.", features: ["Análises ilimitadas", "Tudo do plano Pro", "API de acesso direto", "Até 5 usuários no time", "Análise em lote (bulk)", "Suporte dedicado"], cta: "Falar com a equipe", highlight: false },
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
  { url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=800&fit=crop", prompt: "Hyper-realistic portrait of a woman, creative studio lighting, blue and orange teal shadows, cinematic 8k" },
  { url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=800&fit=crop", prompt: "Close up face of a man, weathered skin details, dramatic black and white photography, extremely detailed" },
  { url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=800&fit=crop", prompt: "Cyberpunk girl with neon makeup, purple ambient light, futuristic fashion, high gloss finish, unreal engine 5" },
  { url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop", prompt: "Male model editorial, soft natural lighting, minimalist aesthetic, portrait photography, 85mm lens" },
  { url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop", prompt: "Stunning female portrait, glowy skin, soft focus background, magazine style, elegant and sharp" },
];

const faqs = [
  { q: "O prompt gerado funciona em qualquer IA?", a: "Sim! O prompt JSON extrai os conceitos universais da imagem, facilitando a recriação no Midjourney, DALL-E 3, Flux, Stable Diffusion e outras ferramentas." },
  { q: "Posso testar sem pagar nada?", a: "Com certeza. O plano Free permite até 5 análises gratuitas todos os meses para você conhecer a precisão da nossa IA." },
  { q: "Como o 'Editor de Prompts' ajuda na criação?", a: "A IA pode interpretar detalhes que você queira mudar. O editor permite ajustar campos específicos como iluminação ou estilo antes de você gerar sua nova imagem." },
  { q: "Meus dados e imagens estão seguros?", a: "Privacidade é nossa prioridade. Suas imagens de upload são processadas de forma segura e não são compartilhadas com terceiros." },
];

export default function LandingPage() {
  const { scrollY } = useScroll();
  const yOrb1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const yOrb2 = useTransform(scrollY, [0, 1000], [0, -150]);
  const yMockup = useTransform(scrollY, [0, 1000], [0, 100]);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [Autoplay({ delay: 3000, stopOnInteraction: false })]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <div className="min-h-screen bg-background">
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
              <Link to="/analyze">
                <Button variant="glass" size="lg" className="text-base btn-traveling-glow px-8 py-6 h-auto">
                  Criar meu primeiro prompt grátis
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div className="relative aspect-[4/3] md:aspect-auto rounded-2xl overflow-hidden glass hover:border-primary/30 transition-all duration-500">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=600&fit=crop"
                  alt="Exemplo de imagem analisada"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-background/20" />
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-center glass-code rounded-2xl hover:border-primary/30 transition-all duration-500">
                <div className="flex items-center gap-2 mb-4">
                  <FileJson className="w-4 h-4 text-primary" />
                  <span className="text-xs font-mono text-muted-foreground">prompt.json</span>
                </div>
                <pre className="font-mono text-xs md:text-sm leading-relaxed text-muted-foreground json-container">
                  {sampleJson}
                </pre>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mini Gallery Carousel */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-xl">
              <span className="text-primary font-mono text-sm uppercase tracking-wider mb-2 block">Galeria em destaque</span>
              <h2 className="font-heading text-2xl md:text-4xl font-medium text-foreground tracking-[-0.02em]">
                Resultados reais dos nossos usuários
              </h2>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={scrollPrev} className="rounded-full">
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon" onClick={scrollNext} className="rounded-full">
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {carouselImages.map((img, i) => (
                <div key={i} className="flex-[0_0_80%] sm:flex-[0_0_40%] lg:flex-[0_0_25%] min-w-0">
                  <div className="glass rounded-2xl overflow-hidden aspect-[3/4] group cursor-pointer border-border/40">
                    <img 
                      src={img.url} 
                      alt="Carousel item" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <p className="text-xs text-muted-foreground font-mono leading-relaxed line-clamp-3">
                        {img.prompt}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 md:py-32 relative">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200&h=400&fit=crop" 
            alt="AI Face Banner" 
            className="w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        </div>
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
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 md:py-32">
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

      {/* Pricing */}
      <section id="pricing" className="py-24 md:py-32">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                {...fadeUp(i * 0.1)}
                className={`relative p-8 glass transition-all duration-500 hover:-translate-y-2 ${
                  plan.highlight ? "border-primary/50 ring-1 ring-primary/20 scale-105 z-20 shadow-2xl shadow-primary/10" : "z-10"
                }`}
              >
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
                      variant={plan.highlight ? "glass" : "outline"}
                      className="w-full"
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
      <section className="py-24 md:py-32 bg-secondary/20">
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
        </div>
      </section>

      <Footer />
      <div className="noise-overlay" />
    </div>
  );
}