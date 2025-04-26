
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { GitHubSettings } from "@/types/github";
import { Github } from "lucide-react";

interface SettingsFormProps {
  onSave: (settings: GitHubSettings) => void;
  loading: boolean;
}

const SettingsForm = ({ onSave, loading }: SettingsFormProps) => {
  const [organization, setOrganization] = useState("");
  const [token, setToken] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ organization, token });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center mb-2">
          <Github className="h-10 w-10 text-github-blue" />
        </div>
        <CardTitle className="text-2xl text-center">GitHub Copilot Dashboard</CardTitle>
        <CardDescription className="text-center">
          Insira os dados da sua organização para visualizar as métricas do Copilot
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="organization">Nome da Organização</Label>
            <Input
              id="organization"
              placeholder="Nome da sua organização no GitHub"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="token">Token de Acesso</Label>
            <Input
              id="token"
              type="password"
              placeholder="Token de acesso pessoal do GitHub"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">
              Seu token precisa ter permissões para acessar métricas de organizações
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full bg-github-blue hover:bg-github-darkBlue"
            disabled={loading}
          >
            {loading ? "Carregando..." : "Conectar"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default SettingsForm;
