import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Lock, User } from "lucide-react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const success = login(username, password);
    if (success) {
      const stored = JSON.parse(localStorage.getItem("auth_user") || "{}");
      navigate(stored.role === "admin" ? "/admin" : "/dashboard");
    } else {
      setError("Pogrešno korisničko ime ili lozinka.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
            <span className="text-primary-foreground font-bold text-2xl">PD</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            Precizna<span className="text-primary">Dijagnostika</span>
          </h1>
          <p className="text-muted-foreground text-sm">Slides Portal</p>
        </div>

        <Card className="border-border shadow-xl">
          <CardHeader className="pb-4">
            <h2 className="text-lg font-semibold text-foreground text-center">Prijava</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="username">Korisničko ime</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Unesite korisničko ime"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Lozinka</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Unesite lozinku"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              {error && (
                <p className="text-sm text-destructive text-center">{error}</p>
              )}
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                Prijavi se
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
