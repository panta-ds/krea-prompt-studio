import React from "react";
import { motion } from "framer-motion";
import { FileText, Scale, UserCheck, AlertTriangle, ShieldCheck, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const TermsOfService = () => {
  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.23, 1, 0.32, 1] as any },
  });

  const sections = [
    {
      title: "1. Aceitação dos Termos",
      icon: UserCheck,
      content: "Ao acessar e utilizar o Krea Prompts, você concorda em cumprir e estar vinculado a estes Termos de Serviço. Se você não concordar com qualquer parte destes termos, você não deve utilizar nossa plataforma."
    },
    {
      title: "2. Uso da Plataforma",
      icon: Scale,
      content: "Nossos serviços destinam-se a ajudar na geração de prompts de imagem através de nossa ferramenta. Você é responsável por manter a confidencialidade de sua conta e senha e por todas as atividades que ocorrem sob sua conta."
    },
    {
      title: "3. Propriedade Intelectual",
      icon: FileText,
      content: "Todo o conteúdo, logotipo, design e software da plataforma são propriedade do Krea Prompts e protegidos por leis de propriedade intelectual. O uso não autorizado de nossa marca ou material é estritamente proibido."
    },
    {
      title: "4. Limitação de Responsabilidade",
      icon: AlertTriangle,
      content: "O Krea Prompts é fornecido 'como está'. Não garantimos que a plataforma estará livre de erros ou que o processamento de IA produzirá resultados específicos. Não somos responsáveis por perdas decorrentes do uso da ferramenta."
    },
    {
      title: "5. Modificações nos Termos",
      icon: ShieldCheck,
      content: "Reservamo-nos o direito de alterar estes termos a qualquer momento. Mudanças significativas serão notificadas através de nossa plataforma ou por e-mail. O uso continuado após as alterações constitui sua aceitação dos novos termos."
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
              <span className="text-primary font-mono text-xs uppercase tracking-[0.3em] mb-4 block">Contrato</span>
              <h1 className="font-heading text-4xl md:text-5xl font-medium text-foreground mb-6 leading-tight tracking-[-0.02em]">
                Termos de <span className="text-gradient">Serviço</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                Leia atentamente nossos termos de uso para entender as regras e condições de utilização da plataforma Krea Prompts.
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
                Última atualização: 12 de Março de 2024. Se tiver dúvidas sobre estes termos, entre em contato através do nosso 
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

export default TermsOfService;
