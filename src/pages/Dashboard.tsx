import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/components/AppSidebar";
import { mockAnalyses } from "@/lib/mockData";
import { motion } from "framer-motion";
import { Upload, BarChart3, BookOpen, Zap, Copy } from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.23, 1, 0.32, 1] as any },
});

export default function DashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [analyses, setAnalyses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
        return;
      }
      
      setUser(session.user);

      // Buscar perfil
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
      
      setProfile(profileData);

      // Buscar análises recentes
      const { data: analysesData } = await supabase
        .from('analyses')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })
        .limit(3);
      
      setAnalyses(analysesData || []);
      setLoading(false);
    };
    
    fetchData();
  }, [navigate]);

  const stats = [
    { icon: BarChart3, label: "Análises totais", value: analyses.length.toString() },
    { icon: BookOpen, label: "Prompts na biblioteca", value: analyses.length.toString() },
    { icon: Zap, label: "Créditos restantes", value: profile?.credits?.toString() || "0" },
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
            Olá, <span className="text-gradient">{user?.user_metadata?.full_name || user?.email?.split('@')[0] || "Criador"}</span>
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
          {analyses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {analyses.map((item) => (
                <div key={item.id} className="glass overflow-hidden group hover:-translate-y-1 hover:border-foreground/16 transition-all duration-300">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={item.image_url} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      loading="lazy" 
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-foreground">{item.title}</h3>
                      <span className="text-[10px] px-2 py-0.5 rounded-full glass-subtle text-muted-foreground">{item.language}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(item.created_at).toLocaleDateString('pt-BR')}
                    </p>
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
          ) : (
            <div className="py-12 glass border-dashed text-center">
              <p className="text-sm text-muted-foreground">Você ainda não realizou nenhuma análise.</p>
              <Link to="/analyze">
                <Button variant="link" className="text-primary mt-2">Começar agora</Button>
              </Link>
            </div>
          )}
        </motion.div>
      </main>
      <div className="noise-overlay" />
    </div>
  );
}