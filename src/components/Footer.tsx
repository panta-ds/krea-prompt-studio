import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <span className="font-heading text-xl font-semibold tracking-tight">
              <span className="text-foreground">Krea</span>
              <span className="text-muted-foreground font-light">Prompts</span>
            </span>
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
              <li><Link to="/contact" className="hover:text-foreground transition-colors">Contato</Link></li>
              <li><Link to="#" className="hover:text-foreground transition-colors">Termos de uso</Link></li>
              <li><Link to="#" className="hover:text-foreground transition-colors">Privacidade</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-border text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} KreaPrompts. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}