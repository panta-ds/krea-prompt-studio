import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageSquare, Send, Phone, Mail, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    const whatsappNumber = "5511959139374";
    const text = `Olá! Meu nome é ${formData.name}. Minha dúvida é: ${formData.message}. (E-mail para contato: ${formData.email})`;
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

    window.open(whatsappUrl, "_blank");
    toast.success("Redirecionando para o WhatsApp...");
  };

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.23, 1, 0.32, 1] as any },
  });

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      <Navbar />
      
      <main className="pt-32 pb-24 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-primary/10 via-background to-transparent pointer-events-none" />
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Left Side: Info */}
              <motion.div {...fadeUp(0)}>
                <span className="text-primary font-mono text-sm uppercase tracking-[0.2em] mb-4 block">Fale Conosco</span>
                <h1 className="font-heading text-4xl md:text-6xl font-medium text-foreground mb-8 leading-tight tracking-[-0.02em]">
                  Estamos aqui para <span className="text-gradient">potencializar</span> sua visão.
                </h1>
                <p className="text-muted-foreground text-lg mb-12 leading-relaxed max-w-md">
                  Tem alguma dúvida técnica ou quer saber mais sobre nossos planos personalizados? Nossa equipe está pronta para ajudar.
                </p>

                <div className="space-y-8">
                  {[
                    { icon: Phone, title: "WhatsApp Direct", detail: "+55 11 95913-9374" },
                    { icon: Mail, title: "E-mail Suporte", detail: "suporte@kreaprompts.ai" },
                    { icon: MapPin, title: "Global Office", detail: "Digital Nomad Hub" },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6 items-start">
                      <div className="w-12 h-12 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center shrink-0">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-heading text-sm font-medium text-foreground/60 uppercase tracking-widest mb-1">{item.title}</h4>
                        <p className="text-lg font-medium text-foreground">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right Side: Form */}
              <motion.div {...fadeUp(0.2)}>
                <div className="glass p-8 md:p-10 rounded-[2.5rem] border-white/5 relative group">
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-heading text-2xl font-medium">Enviar Mensagem</h3>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground/60 ml-1">Seu Nome</label>
                        <Input 
                          placeholder="Como podemos te chamar?"
                          className="glass-input h-14 px-6"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground/60 ml-1">Seu E-mail</label>
                        <Input 
                          type="email"
                          placeholder="email@exemplo.com"
                          className="glass-input h-14 px-6"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground/60 ml-1">Sua Dúvida ou Projeto</label>
                        <Textarea 
                          placeholder="Descreva brevemente o que você precisa..."
                          className="glass-input min-h-[160px] p-6 resize-none"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        />
                      </div>

                      <Button 
                        type="submit" 
                        variant="glass" 
                        size="lg" 
                        className="w-full btn-premium-glass btn-light-beam py-8 h-auto text-lg group bg-primary/10 border-primary/20 hover:border-primary/40"
                      >
                        Enviar para WhatsApp <Send className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </Button>
                      
                      <p className="text-[11px] text-center text-muted-foreground mt-4 px-8">
                        Ao clicar em enviar, você será redirecionado para o WhatsApp com sua mensagem pré-preenchida de forma segura.
                      </p>
                    </form>
                  </div>
                </div>

                {/* Decorative Element */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="mt-12 p-6 glass-subtle rounded-3xl flex items-center justify-between border-white/5"
                >
                  <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-secondary flex items-center justify-center text-[10px] font-bold overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                      </div>
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-background bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
                      +12
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-foreground/80">Time de especialistas online</p>
                    <div className="flex items-center justify-end gap-1.5 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[10px] text-green-500 font-mono tracking-widest uppercase">Resposta Rápida</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <div className="noise-overlay" />
    </div>
  );
};

export default Contact;
