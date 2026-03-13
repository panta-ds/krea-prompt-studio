import { useState, useCallback, useEffect, useRef } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Copy, FileText, BookmarkPlus, Share2, X, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { analyzeImage } from "@/lib/gemini";

interface PromptResult {
  subject: string;
  style: string;
  lighting: string;
  colors: string[];
  composition: string;
  mood: string;
  quality_tags: string[];
}

export default function AnalyzePage() {
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

  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<PromptResult | null>(null);
  const [language, setLanguage] = useState("PT");
  const [detailLevel, setDetailLevel] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) processFile(file);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const removeImage = () => {
    setImage(null);
    setResult(null);
    setAnalyzing(false);
  };

  const processFile = async (file: File) => {
    try {
      setAnalyzing(true);
      setResult(null);

      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Image = e.target?.result as string;
        setImage(base64Image);
        
        try {
          console.log("Iniciando análise real via Gemini API...");
          // Chamada REAL para o Gemini
          const geminiResult = await analyzeImage(base64Image, language);
          console.log("Resultado da análise Gemini:", geminiResult);
          
          setResult(geminiResult);
          setAnalyzing(false);

          // Salvar no Supabase
          const { data: { session } } = await supabase.auth.getSession();
          if (session) {
            const { error } = await supabase.from('analyses').insert({
              user_id: session.user.id,
              title: file.name.split('.')[0] || "Nova Análise",
              image_url: base64Image,
              prompt: geminiResult,
              language: language,
              is_public: false
            });

            if (error) {
              console.error("Erro ao salvar análise:", error.message);
              toast.error("Análise concluída, mas erro ao salvar na biblioteca.");
            } else {
              toast.success("Análise concluída com sucesso!");
            }
          }
        } catch (apiError: any) {
          console.error("Erro detalhado na API Gemini:", apiError);
          toast.error(`Erro na IA: ${apiError.message || "Tente novamente"}`);
          setAnalyzing(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (error: any) {
      toast.error("Erro ao processar imagem.");
      setAnalyzing(false);
    }
  };

  const formatJson = (obj: object) => JSON.stringify(obj, null, 2);

  const detailLabels = ["Básico", "Intermediário", "Avançado"];

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

        <h1 className="font-heading text-2xl font-medium text-foreground mb-8 tracking-[-0.02em]">Analisar Imagem</h1>

        {/* Controls */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex items-center gap-2 glass-subtle px-4 py-2">
            <span className="text-xs text-muted-foreground">Idioma:</span>
            {["PT 🇧🇷", "EN 🇺🇸", "ES 🇪🇸"].map((lang) => {
              const code = lang.split(" ")[0];
              return (
                <button
                  key={code}
                  onClick={() => setLanguage(code)}
                  className={`text-xs px-2 py-1 rounded-lg transition-all duration-300 ${
                    language === code ? "bg-accent/20 text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {lang}
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-2 glass-subtle px-4 py-2">
            <span className="text-xs text-muted-foreground">Detalhe:</span>
            {detailLabels.map((label, i) => (
              <button
                key={label}
                onClick={() => setDetailLevel(i)}
                className={`text-xs px-2 py-1 rounded-lg transition-all duration-300 ${
                  detailLevel === i ? "bg-accent/20 text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload / Image Preview */}
          <div
            className="relative glass border-dashed overflow-hidden min-h-[400px] flex items-center justify-center hover:border-primary/30 transition-all duration-300"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            {image ? (
              <div 
                className="relative w-full h-full group cursor-pointer" 
                onClick={() => !analyzing && fileInputRef.current?.click()}
              >
                <img src={image} alt="Imagem enviada" className={`w-full h-full object-contain transition-all duration-1000 ${analyzing ? "grayscale" : ""}`} />
                {analyzing && (
                  <motion.div
                    className="absolute left-0 right-0 h-[3px] bg-primary shadow-[0_0_20px_rgba(var(--primary),0.8)] z-10"
                    initial={{ top: "0%" }}
                    animate={{ top: "100%" }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
                {!analyzing && (
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button 
                      variant="glass" 
                      size="icon" 
                      className="w-10 h-10 rounded-full" 
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage();
                      }}
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                )}
                <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <div className="bg-background/80 px-4 py-2 rounded-xl text-xs font-medium flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" /> Clique ou arraste para substituir
                  </div>
                </div>
              </div>
            ) : (
              <label className="flex flex-col items-center cursor-pointer p-12">
                <Upload className="w-12 h-12 text-muted-foreground mb-4" />
                <p className="text-foreground font-medium text-sm">Arraste sua imagem aqui</p>
                <p className="text-xs text-muted-foreground mt-1">ou clique para selecionar</p>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleFileSelect} 
                />
              </label>
            )}
          </div>

          {/* JSON Output */}
          <div className="glass-code overflow-hidden flex flex-col min-h-[400px]">
            <div className="flex items-center gap-2 px-6 py-4 border-b border-border">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="font-mono text-xs text-muted-foreground grow">prompt.json</span>
              <span className="text-[10px] text-muted-foreground/40 font-mono">v1.4.1</span>
            </div>
            <div className="flex-1 p-6 overflow-auto">
              <AnimatePresence mode="wait">
                {analyzing ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-3"
                  >
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-4 rounded bg-secondary animate-shimmer"
                        style={{
                          width: `${60 + Math.random() * 40}%`,
                          backgroundImage: "linear-gradient(90deg, hsl(0 0% 100% / 0.03) 0%, hsl(0 0% 100% / 0.08) 50%, hsl(0 0% 100% / 0.03) 100%)",
                          backgroundSize: "200% 100%",
                          animationDelay: `${i * 0.1}s`,
                        }}
                      />
                    ))}
                  </motion.div>
                ) : result ? (
                  <motion.pre
                    key="result"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-mono text-xs leading-relaxed text-muted-foreground whitespace-pre-wrap"
                  >
                    {formatJson(result)}
                  </motion.pre>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full flex items-center justify-center"
                  >
                    <p className="text-sm text-muted-foreground text-center">
                      Envie uma imagem para ver o prompt gerado aqui
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {result && (
              <div className="px-6 py-4 border-t border-border flex flex-wrap gap-2">
                <Button
                  variant="glass"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(formatJson(result));
                    toast.success("JSON copiado!");
                  }}
                >
                  <Copy className="w-3 h-3 mr-1" /> Copiar JSON
                </Button>
                <Button variant="outline" size="sm" onClick={() => toast.success("Copiado como texto!")}>
                  <FileText className="w-3 h-3 mr-1" /> Copiar texto
                </Button>
                <Button variant="outline" size="sm" onClick={() => toast.success("Salvo na biblioteca!")}>
                  <BookmarkPlus className="w-3 h-3 mr-1" /> Salvar
                </Button>
                <Button variant="outline" size="sm" onClick={() => toast.success("Link copiado!")}>
                  <Share2 className="w-3 h-3 mr-1" /> Compartilhar
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <div className="noise-overlay" />
    </div>
  );
}