import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockAnalyses } from "@/lib/mockData";
import { motion } from "framer-motion";
import { Search, Copy, Trash2, Eye, BookOpen } from "lucide-react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

export default function LibraryPage() {
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
  const [analyses, setAnalyses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalyses = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
        return;
      }
      
      const { data } = await supabase
        .from('analyses')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });
      
      setAnalyses(data || []);
      setLoading(false);
    };
    
    fetchAnalyses();
  }, [navigate]);

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('analyses')
      .delete()
      .eq('id', id);
    
    if (error) {
      toast.error("Erro ao remover análise.");
    } else {
      setAnalyses(analyses.filter(a => a.id !== id));
      toast.success("Análise removida!");
    }
  };

  const items = analyses.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

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

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h1 className="font-heading text-2xl font-medium text-foreground tracking-[-0.02em]">Minha Biblioteca</h1>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar prompts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-secondary border-border rounded-xl h-10 text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
             {Array.from({ length: 6 }).map((_, i) => (
               <div key={i} className="glass aspect-video animate-pulse bg-secondary/20" />
             ))}
          </div>
        ) : items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="glass overflow-hidden group hover:-translate-y-1 hover:border-foreground/16 transition-all duration-300"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={item.image_url} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    loading="lazy" 
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-medium text-foreground">{item.title}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full glass-subtle text-muted-foreground">{item.language}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {new Date(item.created_at).toLocaleDateString('pt-BR')}
                  </p>
                  <div className="flex gap-2 mt-4">
                    <Button variant="ghost" size="sm" className="flex-1 h-9 text-xs py-5" onClick={() => toast.info("Visualizando...")}>
                      <Eye className="w-4 h-4 mr-2" /> Ver
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1 h-9 text-xs py-5" onClick={() => { navigator.clipboard.writeText(JSON.stringify(item.prompt, null, 2)); toast.success("Copiado!"); }}>
                      <Copy className="w-4 h-4 mr-2" /> Copiar
                    </Button>
                    <Button variant="ghost" size="sm" className="h-9 w-10 py-5 text-destructive" onClick={() => handleDelete(item.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <BookOpen className="w-16 h-16 text-muted-foreground/30 mb-6" />
            <h2 className="font-heading text-lg text-foreground mb-2">Sua biblioteca está vazia</h2>
            <p className="text-sm text-muted-foreground mb-6">Analise uma imagem e salve o prompt para começar.</p>
            <Link to="/analyze">
              <Button variant="glass">Analisar primeira imagem</Button>
            </Link>
          </div>
        )}
      </main>
      <div className="noise-overlay" />
    </div>
  );
}