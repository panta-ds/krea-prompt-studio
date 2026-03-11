import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <span className="font-heading text-2xl font-bold text-foreground">
              Krea<span className="text-gilding">Prompts</span>
            </span>
            <p className="mt-4 text-sm text-muted-foreground max-w-sm">
              Transforme qualquer imagem em prompts de IA perfeitos. Plataforma premium para criadores exigentes.
            </p>
          </div>
          <div>
            <h4 className="font-heading text-lg mb-4 text-foreground">Produto</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/#features" className="hover:text-foreground transition-colors">Features</a></li>
              <li><a href="/#pricing" className="hover:text-foreground transition-colors">Preços</a></li>
              <li><Link to="/explore" className="hover:text-foreground transition-colors">Galeria</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading text-lg mb-4 text-foreground">Conta</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/login" className="hover:text-foreground transition-colors">Entrar</Link></li>
              <li><Link to="/signup" className="hover:text-foreground transition-colors">Criar Conta</Link></li>
              <li><Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-border/30 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} KreaPrompts. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
