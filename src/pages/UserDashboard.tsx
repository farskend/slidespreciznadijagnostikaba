import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import { MonitorX } from "lucide-react";

export default function UserDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);

  useEffect(() => {
    setEmbedUrl(localStorage.getItem("embed_url"));
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header username={user?.username || ""} onLogout={handleLogout} />

      <main className="flex-1 flex flex-col">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            className="flex-1 w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            title="Embed Content"
          />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-muted-foreground">
            <MonitorX className="h-16 w-16 opacity-40" />
            <div className="text-center">
              <p className="text-lg font-medium">Nema postavljenog sadržaja</p>
              <p className="text-sm">Administrator još nije postavio embed link.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
