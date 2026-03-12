import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/components/AppSidebar";
import { mockAnalyses } from "@/lib/mockData";
import { motion } from "framer-motion";
import { Upload, BarChart3, BookOpen, Zap, Copy } from "lucide-react";
import { toast } from "sonner";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.23, 1, 0.32, 1] as any },
});

export default function DashboardPage() {
  const stats = [
    { icon: BarChart3, label: "Análises este mês", value: "12" },
    { icon: BookOpen, label: "Prompts salvos", value: "47" },
    { icon: Zap, label: "Créditos restantes", value: "188" },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <main className="flex-1 p-6 md:p-10 overflow-auto">
        {/* Mobile header */}
        <div className="lg:hidden mb-6 flex items-center justify-between">
          <Link to="/" className="font-heading text-lg font-semibold tracking-tight">
            <span className="text-foreground">Krea</span>
            <span className="text-muted-foreground font-light">Prompts</span>
          </Link>
          <Link to="/settings">
            <div className="w-9 h-9 rounded-full glass flex items-center justify-center text-sm text-foreground font-medium">U</div>
          </Link>
        </div>

        <motion.div {...fadeUp(0)}>
          <h1 className="font-heading text-2xl md:text-3xl font-semibold text-foreground tracking-[-0.02em]">
            Olá, <span className="text-gradient">Criador</span>
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">Bem-vindo ao seu estúdio de prompts.</p>
        </motion.div>

        {/* Stats */}
        <motion.div {...fadeUp(0.1)} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
          {stats.map((s) => (
            <div key={s.label} className="p-6 glass group hover:-translate-y-1 transition-all duration-300">
              <s.icon className="w-4 h-4 text-muted-foreground mb-3 opacity-40" />
              <p className="text-2xl font-heading font-semibold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Upload CTA */}
        <motion.div {...fadeUp(0.2)} className="mt-10">
          <Link to="/analyze">
            <div className="p-12 glass border-dashed hover:-translate-y-1 transition-all duration-300 text-center cursor-pointer group">
              <Upload className="w-10 h-10 text-muted-foreground group-hover:text-primary mx-auto transition-colors duration-300" />
              <p className="mt-4 text-foreground font-medium text-sm">Envie uma imagem para analisar</p>
              <p className="text-xs text-muted-foreground mt-1">Arraste e solte ou clique para selecionar</p>
            </div>
          </Link>
        </motion.div>

        {/* Recent */}
        <motion.div {...fadeUp(0.3)} className="mt-10">
          <h2 className="font-heading text-lg font-medium text-foreground mb-6 tracking-[-0.02em]">Análises Recentes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockAnalyses.map((item) => (
              <div key={item.id} className="glass overflow-hidden group hover:-translate-y-1 hover:border-foreground/16 transition-all duration-300">
                <div className="aspect-video relative overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-foreground">{item.title}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full glass-subtle text-muted-foreground">{item.language}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-3 w-full text-xs"
                    onClick={() => {
                      navigator.clipboard.writeText(JSON.stringify(item.prompt, null, 2));
                      toast.success("Prompt copiado!");
                    }}
                  >
                    <Copy className="w-3 h-3 mr-1" /> Copiar prompt
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
      <div className="noise-overlay" />
    </div>
  );
}