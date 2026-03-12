import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface HeaderProps {
  username: string;
  onLogout: () => void;
}

export default function Header({ username, onLogout }: HeaderProps) {
  return (
    <header className="w-full border-b border-border bg-card px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-sm">PD</span>
        </div>
        <span className="text-lg font-semibold text-foreground tracking-tight">
          Precizna<span className="text-primary">Dijagnostika</span>
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">{username}</span>
        <Button variant="ghost" size="sm" onClick={onLogout} className="gap-2">
          <LogOut className="h-4 w-4" />
          Odjavi se
        </Button>
      </div>
    </header>
  );
}
