import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const tabs = ["Perfil", "Segurança", "Idioma", "Notificações", "Faturamento"];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [lang, setLang] = useState("pt");

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <main className="flex-1 p-6 md:p-10 overflow-auto">
        <div className="lg:hidden mb-6">
          <Link to="/dashboard" className="font-heading text-xl font-bold text-foreground">
            Krea<span className="text-gilding">Prompts</span>
          </Link>
        </div>

        <h1 className="font-heading text-3xl font-bold text-foreground mb-8">Configurações</h1>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`text-sm px-4 py-2 rounded-xl whitespace-nowrap transition-colors ${
                activeTab === i
                  ? "bg-secondary text-foreground"
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
                <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center text-2xl font-heading font-bold text-foreground">C</div>
                <Button variant="outline" size="sm">Alterar avatar</Button>
              </div>
              <div>
                <Label className="text-foreground">Nome de usuário</Label>
                <Input defaultValue="criador" className="mt-2 bg-card border-border/50 rounded-xl h-11 text-foreground" />
              </div>
              <div>
                <Label className="text-foreground">Bio</Label>
                <Input defaultValue="Artista digital e prompt engineer" className="mt-2 bg-card border-border/50 rounded-xl h-11 text-foreground" />
              </div>
              <Button variant="gilding" onClick={() => toast.success("Perfil salvo!")}>Salvar</Button>
            </div>
          )}

          {activeTab === 1 && (
            <div className="space-y-6">
              <div>
                <Label className="text-foreground">Email atual</Label>
                <Input defaultValue="criador@email.com" className="mt-2 bg-card border-border/50 rounded-xl h-11 text-foreground" />
              </div>
              <div>
                <Label className="text-foreground">Nova senha</Label>
                <Input type="password" placeholder="••••••••" className="mt-2 bg-card border-border/50 rounded-xl h-11 text-foreground placeholder:text-muted-foreground" />
              </div>
              <div>
                <Label className="text-foreground">Confirmar senha</Label>
                <Input type="password" placeholder="••••••••" className="mt-2 bg-card border-border/50 rounded-xl h-11 text-foreground placeholder:text-muted-foreground" />
              </div>
              <Button variant="gilding" onClick={() => toast.success("Senha atualizada!")}>Atualizar</Button>
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
                  className={`block w-full text-left px-4 py-3 rounded-xl transition-colors ${
                    lang === l.code
                      ? "bg-secondary text-foreground border border-gilding/30"
                      : "bg-card text-muted-foreground border border-border/50 hover:text-foreground"
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
              <div className="p-6 rounded-2xl bg-card border border-border/50">
                <p className="text-sm text-muted-foreground mb-1">Plano atual</p>
                <p className="text-xl font-heading font-bold text-foreground">Free</p>
                <p className="text-xs text-muted-foreground mt-1">5 análises por mês</p>
              </div>
              <Button variant="gilding" onClick={() => toast.info("Em breve!")}>Upgrade para Pro</Button>
            </div>
          )}
        </motion.div>
      </main>
      <div className="noise-overlay" />
    </div>
  );
}
