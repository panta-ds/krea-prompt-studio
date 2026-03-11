import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const navLinks = [
  { label: "Features", href: "/#features" },
  { label: "Galeria", href: "/#gallery" },
  { label: "Preços", href: "/#pricing" },
];

export function Navbar() {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-md bg-background/80"
    >
      <nav className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link to="/" className="font-heading text-2xl font-bold text-foreground tracking-wide">
          Krea<span className="text-gilding">Prompts</span>
        </Link>

        {isLanding && (
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm">Entrar</Button>
          </Link>
          <Link to="/signup">
            <Button variant="gilding" size="sm">Começar Grátis</Button>
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}
