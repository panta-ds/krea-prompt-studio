import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { Input } from "@/components/ui/input";
import { mockGalleryItems } from "@/lib/mockData";
import { motion } from "framer-motion";
import { Search, Copy } from "lucide-react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

const filters = ["Tendências", "Recentes", "Mais copiados"];

export default function ExplorePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
      }
    };
    checkSession();
  }, [navigate]);

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState(0);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublicAnalyses = async () => {
      const { data } = await supabase
        .from('analyses')
        .select('*')
        .eq('is_public', true)
        .order('created_at', { ascending: false });
      
      setItems(data || []);
      setLoading(false);
    };
    
    fetchPublicAnalyses();
  }, []);

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
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="glass h-64 animate-pulse bg-secondary/20" />
            ))}
          </div>
        ) : items.length > 0 ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -5, scale: 1.01 }}
                className="relative group break-inside-avoid mb-4 glass overflow-hidden hover:shadow-[0_0_30px_hsl(var(--primary)_/_0.2)] hover:border-primary/40 transition-all duration-500"
              >
                <img
                  src={item.image_url}
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
                  <span className="text-[10px] text-muted-foreground mt-2">visto publicamente</span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center glass border-dashed">
            <p className="text-muted-foreground">Nenhuma galeria pública disponível no momento.</p>
          </div>
        )}
      </main>
      <div className="noise-overlay" />
    </div>
  );
}