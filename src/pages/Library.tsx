import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockAnalyses } from "@/lib/mockData";
import { motion } from "framer-motion";
import { Search, Copy, Trash2, Eye, BookOpen } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

export default function LibraryPage() {
  const [search, setSearch] = useState("");
  const items = mockAnalyses.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <main className="flex-1 p-6 md:p-10 overflow-auto">
        <div className="lg:hidden mb-6">
          <Link to="/dashboard" className="font-heading text-xl font-bold text-foreground">
            Krea<span className="text-gilding">Prompts</span>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h1 className="font-heading text-3xl font-bold text-foreground">Minha Biblioteca</h1>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar prompts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-card border-border/50 rounded-xl h-10 text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="rounded-2xl bg-card border border-border/50 overflow-hidden group"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-medium text-foreground">{item.title}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">{item.language}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                  <div className="flex gap-1 mt-3">
                    <Button variant="ghost" size="sm" className="flex-1 text-xs" onClick={() => toast.info("Visualizando...")}>
                      <Eye className="w-3 h-3 mr-1" /> Ver
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1 text-xs" onClick={() => { navigator.clipboard.writeText(JSON.stringify(item.prompt, null, 2)); toast.success("Copiado!"); }}>
                      <Copy className="w-3 h-3 mr-1" /> Copiar
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs text-destructive" onClick={() => toast.success("Removido!")}>
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <BookOpen className="w-16 h-16 text-muted-foreground/30 mb-6" />
            <h2 className="font-heading text-xl text-foreground mb-2">Sua biblioteca está vazia</h2>
            <p className="text-sm text-muted-foreground mb-6">Analise uma imagem e salve o prompt para começar.</p>
            <Link to="/analyze">
              <Button variant="gilding">Analisar primeira imagem</Button>
            </Link>
          </div>
        )}
      </main>
      <div className="noise-overlay" />
    </div>
  );
}
