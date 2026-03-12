import { Link, useLocation } from "react-router-dom";

export function Footer() {
  const location = useLocation();

  const handleLogoClick = (e: React.MouseEvent) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  return (
    <footer className="border-t border-border bg-background py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <Link 
              to="/" 
              onClick={handleLogoClick}
              className="font-heading text-xl font-semibold tracking-tight hover:opacity-80 transition-opacity"
            >
              <span className="text-foreground">Krea</span>
              <span className="text-muted-foreground font-light">Prompts</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-sm leading-relaxed">
              Transforme qualquer imagem no prompt perfeito. A plataforma de prompts para criadores que exigem precisão.
            </p>
          </div>
          <div>
            <h4 className="font-heading text-sm font-medium mb-4 text-foreground">Conta</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/login" className="hover:text-foreground transition-colors">Entrar</Link></li>
              <li><Link to="/signup" className="hover:text-foreground transition-colors">Criar conta</Link></li>
              <li>
                <Link 
                  to="/dashboard"
                  className="hover:text-foreground transition-colors"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading text-sm font-medium mb-4 text-foreground">Empresa</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="#" className="hover:text-foreground transition-colors">Sobre</Link></li>
              <li><a href="/contact" className="hover:text-foreground transition-colors">Contato</a></li>
              <li><Link to="/privacy-policy" className="hover:text-foreground transition-colors">Política de Privacidade</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-foreground transition-colors">Termos de Serviço</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-border text-center text-xs text-muted-foreground flex flex-col items-center gap-2">
          <span>© {new Date().getFullYear()} KreaPrompts. Todos os direitos reservados.</span>
        </div>
      </div>
    </footer>
  );
}