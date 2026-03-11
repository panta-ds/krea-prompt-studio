import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { Input } from "@/components/ui/input";
import { mockGalleryItems } from "@/lib/mockData";
import { motion } from "framer-motion";
import { Search, Copy } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const filters = ["Tendências", "Recentes", "Mais copiados"];

export default function ExplorePage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState(0);

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <main className="flex-1 p-6 md:p-10 overflow-auto">
        <div className="lg:hidden mb-6">
          <Link to="/dashboard" className="font-heading text-lg font-semibold tracking-tight">
            <span className="text-foreground">Krea</span>
            <span className="text-muted-foreground font-light">Prompts</span>
          </Link>
        </div>

        <h1 className="font-heading text-2xl font-medium text-foreground mb-8 tracking-[-0.02em]">Explorar</h1>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar na galeria..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-secondary border-border rounded-xl h-10 text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex gap-2">
            {filters.map((f, i) => (
              <button
                key={f}
                onClick={() => setActiveFilter(i)}
                className={`text-xs px-4 py-2 rounded-xl transition-all duration-300 ${
                  activeFilter === i
                    ? "glass-subtle text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
          {mockGalleryItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="relative group break-inside-avoid mb-4 glass overflow-hidden"
            >
              <img
                src={item.image}
                alt="Galeria"
                className="w-full block rounded-lg"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 rounded-lg">
                <pre className="font-mono text-[10px] text-muted-foreground max-h-32 overflow-hidden mb-4 text-center">
                  {JSON.stringify(item.prompt, null, 2).slice(0, 200)}...
                </pre>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(item.prompt, null, 2));
                    toast.success("Prompt copiado!");
                  }}
                  className="flex items-center gap-1 px-4 py-2 rounded-xl btn-glow text-foreground text-xs font-medium"
                >
                  <Copy className="w-3 h-3" /> Copiar
                </button>
                <span className="text-[10px] text-muted-foreground mt-2">{item.copies} cópias</span>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
      <div className="noise-overlay" />
    </div>
  );
}