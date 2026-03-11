import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/components/AppSidebar";
import { mockAnalyses } from "@/lib/mockData";
import { motion } from "framer-motion";
import { Upload, BarChart3, BookOpen, Zap, Copy } from "lucide-react";
import { toast } from "sonner";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
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
          <Link to="/" className="font-heading text-xl font-bold text-foreground">
            Krea<span className="text-gilding">Prompts</span>
          </Link>
          <Link to="/settings">
            <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-sm text-foreground font-medium">U</div>
          </Link>
        </div>

        <motion.div {...fadeUp(0)}>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
            Olá, <span className="text-gilding">Criador</span>
          </h1>
          <p className="text-muted-foreground mt-2">Bem-vindo ao seu estúdio de prompts.</p>
        </motion.div>

        {/* Stats */}
        <motion.div {...fadeUp(0.1)} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
          {stats.map((s) => (
            <div key={s.label} className="p-6 rounded-2xl bg-card border border-border/50">
              <s.icon className="w-5 h-5 text-gilding mb-3" />
              <p className="text-2xl font-heading font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Upload CTA */}
        <motion.div {...fadeUp(0.2)} className="mt-10">
          <Link to="/analyze">
            <div className="p-12 rounded-2xl border-2 border-dashed border-border/50 hover:border-gilding/30 bg-card/50 transition-colors duration-300 text-center cursor-pointer group">
              <Upload className="w-10 h-10 text-muted-foreground group-hover:text-gilding mx-auto transition-colors duration-300" />
              <p className="mt-4 text-foreground font-medium">Envie uma imagem para analisar</p>
              <p className="text-sm text-muted-foreground mt-1">Arraste e solte ou clique para selecionar</p>
            </div>
          </Link>
        </motion.div>

        {/* Recent */}
        <motion.div {...fadeUp(0.3)} className="mt-10">
          <h2 className="font-heading text-xl font-semibold text-foreground mb-6">Análises Recentes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockAnalyses.map((item) => (
              <div key={item.id} className="rounded-2xl bg-card border border-border/50 overflow-hidden group hover:border-border transition-colors duration-300">
                <div className="aspect-video relative overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-foreground">{item.title}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">{item.language}</span>
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
