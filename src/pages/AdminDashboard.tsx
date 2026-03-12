import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link2, Trash2, ExternalLink, Save } from "lucide-react";
import { toast } from "sonner";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [embedUrl, setEmbedUrl] = useState(() => localStorage.getItem("embed_url") || "");
  const [inputUrl, setInputUrl] = useState(() => localStorage.getItem("embed_url") || "");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim()) {
      toast.error("Unesite URL za embedding.");
      return;
    }
    localStorage.setItem("embed_url", inputUrl.trim());
    setEmbedUrl(inputUrl.trim());
    toast.success("Embed URL je uspješno sačuvan.");
  };

  const handleDelete = () => {
    localStorage.removeItem("embed_url");
    setEmbedUrl("");
    setInputUrl("");
    toast.success("Embed URL je obrisan.");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header username={user?.username || ""} onLogout={handleLogout} />

      <main className="flex-1 flex items-start justify-center p-6 pt-12">
        <div className="w-full max-w-2xl space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Upravljajte embed linkom koji korisnici vide na svom dashboardu.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Link2 className="h-5 w-5 text-primary" />
                Embed URL
              </CardTitle>
              <CardDescription>
                Unesite link koji će biti prikazan korisnicima kroz iframe.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="url">URL adresa</Label>
                  <Input
                    id="url"
                    type="url"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    placeholder="https://docs.google.com/presentation/d/..."
                  />
                </div>
                <div className="flex gap-3">
                  <Button type="submit" className="gap-2">
                    <Save className="h-4 w-4" />
                    Sačuvaj
                  </Button>
                  {embedUrl && (
                    <Button type="button" variant="destructive" onClick={handleDelete} className="gap-2">
                      <Trash2 className="h-4 w-4" />
                      Obriši
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {embedUrl && (
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-4 flex items-center justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground mb-1">Trenutni embed URL</p>
                  <p className="text-sm text-foreground truncate">{embedUrl}</p>
                </div>
                <a href={embedUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </a>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
