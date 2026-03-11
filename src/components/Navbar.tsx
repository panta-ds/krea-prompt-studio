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
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-3xl"
    >
      <nav className="glass flex h-14 items-center justify-between px-6 rounded-2xl">
        <Link to="/" className="font-heading text-lg font-semibold tracking-tight">
          <span className="text-foreground font-semibold">Krea</span>
          <span className="text-muted-foreground font-light">Prompts</span>
        </Link>

        {isLanding && (
          <div className="hidden md:flex items-center gap-6">
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

        <div className="flex items-center gap-2">
          <Link to="/login">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">Entrar</Button>
          </Link>
          <Link to="/signup">
            <Button variant="glass" size="sm">Começar Grátis</Button>
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}