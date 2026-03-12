import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import logo from "@/assets/logo.png";

interface HeaderProps {
  username: string;
  onLogout: () => void;
}

export default function Header({ username, onLogout }: HeaderProps) {
  return (
    <header className="w-full border-b border-border bg-card px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img src={logo} alt="PrecisionDiagnostics" className="h-10" />
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
