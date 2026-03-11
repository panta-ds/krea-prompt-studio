import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Sparkles, BookOpen, Compass, Users, Settings, LogOut } from "lucide-react";

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
    <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-card border-r border-border/50 p-6">
      <Link to="/" className="font-heading text-xl font-bold text-foreground mb-10">
        Krea<span className="text-gilding">Prompts</span>
      </Link>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors duration-200 ${
                active
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              <item.icon className={`w-4 h-4 ${active ? "text-gilding" : ""}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <Link
        to="/"
        className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors duration-200"
      >
        <LogOut className="w-4 h-4" />
        Sair
      </Link>
    </aside>
  );
}
