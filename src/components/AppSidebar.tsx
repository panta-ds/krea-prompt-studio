import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Sparkles, BookOpen, Compass, Users, Settings, LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Sparkles, label: "Analisar", path: "/analyze" },
  { icon: BookOpen, label: "Biblioteca", path: "/library" },
  { icon: Compass, label: "Explorar", path: "/explore" },
  { icon: Users, label: "Comunidade", path: "/explore" },
  { icon: Settings, label: "Configurações", path: "/settings" },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <aside className="hidden lg:flex flex-col w-64 min-h-screen glass-subtle p-6 border-r border-border">
      <div className="flex items-center justify-between mb-10">
        <Link to="/" className="font-heading text-lg font-semibold tracking-tight">
          <span className="text-foreground">Krea</span>
          <span className="text-muted-foreground font-light">Prompts</span>
        </Link>
        <ThemeToggle />
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                active
                  ? "bg-accent/20 text-foreground border-l-2 border-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <item.icon className={`w-4 h-4 ${active ? "text-primary" : ""}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <Link
        to="/"
        className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200"
      >
        <LogOut className="w-4 h-4" />
        Sair
      </Link>
    </aside>
  );
}