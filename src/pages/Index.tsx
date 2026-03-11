import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Braces, Globe, Pencil, BookOpen, Users, Copy, Upload, Sparkles, FileJson } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

const features = [
  { icon: Braces, title: "JSON Preciso", desc: "Prompts estruturados com campos detalhados para reproduzir qualquer imagem com fidelidade." },
  { icon: Globe, title: "Multi-idioma", desc: "Gere prompts em Português, Inglês ou Espanhol com um clique." },
  { icon: Pencil, title: "Editor de Prompts", desc: "Edite e refine cada campo do prompt antes de exportar." },
  { icon: BookOpen, title: "Biblioteca Pessoal", desc: "Salve e organize todos os seus prompts em um acervo privado." },
  { icon: Users, title: "Galeria Pública", desc: "Explore e copie prompts de outros criadores da comunidade." },
  { icon: Copy, title: "Copiar & Exportar", desc: "Copie como JSON ou texto formatado, pronto para colar em qualquer ferramenta de IA." },
];

const plans = [
  { name: "Free", price: "R$ 0", period: "/mês", features: ["5 análises por mês", "Prompts em JSON", "Biblioteca pessoal"], cta: "Começar Grátis", highlight: false },
  { name: "Pro", price: "R$ 149", period: "/mês", features: ["200 análises por mês", "Multi-idioma", "Editor avançado", "Galeria pública", "Suporte prioritário"], cta: "Assinar Pro", highlight: true },
  { name: "Agency", price: "R$ 499", period: "/mês", features: ["Análises ilimitadas", "API de acesso", "Times e colaboração", "Exportação em massa", "Suporte dedicado"], cta: "Falar com Vendas", highlight: false },
];

const sampleJson = `{
  "subject": "Mulher jovem, cabelos ondulados",
  "style": "Editorial de moda, Vogue",
  "lighting": "Golden hour, luz lateral",
  "colors": ["dourado", "preto", "bege"],
  "mood": "Elegante, introspectivo",
  "camera": "85mm f/1.4, bokeh",
  "quality_tags": ["8k", "masterpiece"]
}`;

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-24 md:pt-44 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              {...fadeUp(0)}
              className="font-heading text-5xl md:text-7xl font-bold leading-tight tracking-tight text-foreground"
            >
              Transforme qualquer imagem em um{" "}
              <span className="text-gilding">prompt perfeito</span>
            </motion.h1>
            <motion.p
              {...fadeUp(0.15)}
              className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Faça upload de uma imagem e receba um prompt JSON estruturado e detalhado, 
              pronto para recriar em Midjourney, DALL-E ou Flux.
            </motion.p>
            <motion.div {...fadeUp(0.3)} className="mt-10">
              <Link to="/analyze">
                <Button variant="gilding" size="lg" className="text-base">
                  Analise sua primeira imagem — é grátis
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Hero Mockup */}
          <motion.div
            {...fadeUp(0.4)}
            className="mt-20 max-w-5xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-border/50 bg-card">
              <div className="relative aspect-[4/3] md:aspect-auto">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=600&fit=crop"
                  alt="Exemplo de imagem analisada"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-background/20" />
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-center bg-secondary/30">
                <div className="flex items-center gap-2 mb-4">
                  <FileJson className="w-4 h-4 text-gilding" />
                  <span className="text-xs font-mono text-muted-foreground">prompt.json</span>
                </div>
                <pre className="font-mono text-xs md:text-sm leading-relaxed text-foreground/80 overflow-x-auto">
                  {sampleJson}
                </pre>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <motion.h2
            {...fadeUp(0)}
            className="font-heading text-3xl md:text-5xl font-bold text-center text-foreground mb-20"
          >
            Como funciona
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-4xl mx-auto">
            {[
              { icon: Upload, step: "01", title: "Faça upload", desc: "Envie qualquer imagem — foto, ilustração ou render 3D." },
              { icon: Sparkles, step: "02", title: "IA analisa", desc: "Nossa inteligência artificial extrai cada detalhe visual da imagem." },
              { icon: Braces, step: "03", title: "Receba o JSON", desc: "Um prompt estruturado, pronto para usar em qualquer ferramenta de IA." },
            ].map((item, i) => (
              <motion.div key={item.step} {...fadeUp(i * 0.15)} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary mb-6">
                  <item.icon className="w-7 h-7 text-gilding" />
                </div>
                <span className="block font-mono text-xs text-muted-foreground mb-2">{item.step}</span>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 md:py-32 bg-secondary/20">
        <div className="container mx-auto px-6">
          <motion.h2
            {...fadeUp(0)}
            className="font-heading text-3xl md:text-5xl font-bold text-center text-foreground mb-20"
          >
            Recursos
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                {...fadeUp(i * 0.08)}
                className="p-8 rounded-2xl bg-card hover:bg-secondary/50 transition-colors duration-300"
              >
                <f.icon className="w-6 h-6 text-gilding mb-4" />
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <motion.h2
            {...fadeUp(0)}
            className="font-heading text-3xl md:text-5xl font-bold text-center text-foreground mb-20"
          >
            Preços
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                {...fadeUp(i * 0.1)}
                className={`relative p-8 rounded-2xl transition-colors duration-300 ${
                  plan.highlight
                    ? "bg-card border-2 border-gilding/30"
                    : "bg-card border border-border/50"
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-8 px-3 py-1 text-xs font-medium bg-gilding text-vault rounded-full">
                    Popular
                  </span>
                )}
                <h3 className="font-heading text-xl font-semibold text-foreground">{plan.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-heading text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                </div>
                <ul className="mt-8 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-gilding shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link to="/signup">
                    <Button
                      variant={plan.highlight ? "gilding" : "outline"}
                      className="w-full"
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <div className="noise-overlay" />
    </div>
  );
}
