import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { User, Bell, Shield, CreditCard, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

const tabs = ["Perfil", "Segurança", "Idioma", "Notificações", "Faturamento"];

export default function SettingsPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
      } else {
        setUser(session.user);
      }
    };
    checkSession();
  }, [navigate]);

  const [activeTab, setActiveTab] = useState(0);
  const [lang, setLang] = useState("pt");

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

        <h1 className="font-heading text-2xl font-medium text-foreground mb-8 tracking-[-0.02em]">Configurações</h1>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`text-sm px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-300 ${
                activeTab === i
                  ? "glass-subtle text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-xl"
        >
          {activeTab === 0 && (
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-2xl glass flex items-center justify-center text-2xl font-heading font-semibold text-foreground">C</div>
                <Button variant="outline" size="sm">Alterar avatar</Button>
              </div>
              <div>
                <Label className="text-foreground text-sm">Nome de usuário</Label>
                <Input defaultValue={user?.user_metadata?.full_name || user?.email?.split('@')[0] || "criador"} className="mt-2 bg-secondary border-border rounded-xl h-11 text-foreground" />
              </div>
              <div>
                <Label className="text-foreground text-sm">Bio</Label>
                <Input defaultValue="Artista digital e prompt engineer" className="mt-2 bg-secondary border-border rounded-xl h-11 text-foreground" />
              </div>
              <Button variant="glass" onClick={() => toast.success("Perfil salvo!")}>Salvar</Button>
            </div>
          )}

          {activeTab === 1 && (
            <div className="space-y-6">
              <div>
                <Label className="text-foreground text-sm">Email atual</Label>
                <Input defaultValue={user?.email || "criador@email.com"} className="mt-2 bg-secondary border-border rounded-xl h-11 text-foreground" />
              </div>
              <div>
                <Label className="text-foreground text-sm">Nova senha</Label>
                <Input type="password" placeholder="••••••••" className="mt-2 bg-secondary border-border rounded-xl h-11 text-foreground placeholder:text-muted-foreground" />
              </div>
              <div>
                <Label className="text-foreground text-sm">Confirmar senha</Label>
                <Input type="password" placeholder="••••••••" className="mt-2 bg-secondary border-border rounded-xl h-11 text-foreground placeholder:text-muted-foreground" />
              </div>
              <Button variant="glass" onClick={() => toast.success("Senha atualizada!")}>Atualizar</Button>
            </div>
          )}

          {activeTab === 2 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground mb-4">Idioma da interface e dos prompts gerados.</p>
              {[
                { code: "pt", label: "Português 🇧🇷" },
                { code: "en", label: "English 🇺🇸" },
                { code: "es", label: "Español 🇪🇸" },
              ].map((l) => (
                <button
                  key={l.code}
                  onClick={() => { setLang(l.code); toast.success(`Idioma: ${l.label}`); }}
                  className={`block w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                    lang === l.code
                      ? "glass text-foreground border-primary/30"
                      : "glass-subtle text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          )}

          {activeTab === 3 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Configurações de notificação em breve.</p>
            </div>
          )}

          {activeTab === 4 && (
            <div className="space-y-6">
              <div className="p-6 glass">
                <p className="text-sm text-muted-foreground mb-1">Plano atual</p>
                <p className="text-xl font-heading font-semibold text-foreground">Free</p>
                <p className="text-xs text-muted-foreground mt-1">5 análises por mês</p>
              </div>
              <Button variant="glass" onClick={() => toast.info("Em breve!")}>Upgrade para Pro</Button>
            </div>
          )}
        </motion.div>
      </main>
      <div className="noise-overlay" />
    </div>
  );
}