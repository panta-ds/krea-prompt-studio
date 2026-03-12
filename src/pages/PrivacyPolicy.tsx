import React from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileText, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const PrivacyPolicy = () => {
  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.23, 1, 0.32, 1] as any },
  });

  const sections = [
    {
      title: "1. Coleta de Informações",
      icon: Eye,
      content: "Coletamos informações que você nos fornece diretamente ao criar uma conta, como seu nome, endereço de e-mail e preferências de configuração. Também podemos coletar automaticamente dados técnicos sobre seu dispositivo e como você interage com nossa plataforma."
    },
    {
      title: "2. Uso dos Dados",
      icon: Lock,
      content: "Utilizamos as informações coletadas para fornecer, manter e melhorar nossos serviços, processar suas solicitações de geração de prompts, personalizar sua experiência e enviar atualizações importantes sobre sua conta."
    },
    {
      title: "3. Compartilhamento de Informações",
      icon: Shield,
      content: "Não vendemos seus dados pessoais a terceiros. Podemos compartilhar informações com provedores de serviços que nos auxiliam na operação da plataforma (como processamento de IA ou hospedagem), sempre sob estritas obrigações de confidencialidade."
    },
    {
      title: "4. Segurança",
      icon: Lock,
      content: "Implementamos medidas de segurança técnicas e organizacionais projetadas para proteger seus dados contra acesso não autorizado, alteração ou destruição. No entanto, nenhum método de transmissão pela internet é 100% seguro."
    },
    {
      title: "5. Seus Direitos",
      icon: FileText,
      content: "Você tem o direito de acessar, corrigir ou excluir seus dados pessoais a qualquer momento através das configurações de sua conta ou entrando em contato com nosso suporte."
    }
  ];

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      <Navbar />
      
      <main className="pt-32 pb-24 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-primary/10 via-background to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div {...fadeUp(0)} className="text-center mb-16">
              <span className="text-primary font-mono text-xs uppercase tracking-[0.3em] mb-4 block">Jurídico</span>
              <h1 className="font-heading text-4xl md:text-5xl font-medium text-foreground mb-6 leading-tight tracking-[-0.02em]">
                Política de <span className="text-gradient">Privacidade</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                Sua privacidade é nossa prioridade. Entenda como protegemos seus dados e garantimos uma experiência segura no Krea Prompts.
              </p>
            </motion.div>

            <div className="space-y-8">
              {sections.map((section, i) => (
                <motion.div 
                  key={i} 
                  {...fadeUp(0.1 + i * 0.1)}
                  className="glass p-8 md:p-10 rounded-[2rem] border-white/5 group hover:border-primary/20 transition-all duration-500"
                >
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-14 h-14 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
                      <section.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-medium text-foreground mb-4 flex items-center gap-2">
                        {section.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              {...fadeUp(0.7)}
              className="mt-16 p-8 glass-subtle rounded-3xl border-white/5 text-center"
            >
              <p className="text-sm text-muted-foreground">
                Última atualização: 12 de Março de 2024. Se tiver dúvidas, entre em contato através do nosso 
                <a href="/contact" className="text-primary hover:underline ml-1 inline-flex items-center gap-1">
                  suporte <ChevronRight className="w-3 h-3" />
                </a>
              </p>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
      <div className="noise-overlay" />
    </div>
  );
};

export default PrivacyPolicy;
