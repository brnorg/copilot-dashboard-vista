
import { useState } from "react";
import { GitHubSettings } from "@/types/github";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Github } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface SettingsFormProps {
  onSave: (settings: GitHubSettings) => void;
  loading: boolean;
}

const SettingsForm = ({ onSave, loading }: SettingsFormProps) => {
  const [organization, setOrganization] = useState("");
  const [token, setToken] = useState("");
  const [useDemo, setUseDemo] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      organization: organization.trim(),
      token: token.trim(),
      useDemo
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center mb-2">
          <Github className="h-6 w-6 mr-2 text-github-blue" />
          <CardTitle>GitHub Copilot</CardTitle>
        </div>
        <CardDescription>
          Conecte-se à API do GitHub para obter métricas do Copilot para sua organização.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="useDemo" 
              checked={useDemo} 
              onCheckedChange={(checked) => {
                if (checked) {
                  setOrganization("demo-org");
                  setToken("demo-token");
                }
                setUseDemo(!!checked);
              }} 
            />
            <div className="grid gap-1.5 leading-none">
              <Label htmlFor="useDemo" className="font-medium">
                Usar dados de demonstração
              </Label>
              <p className="text-sm text-muted-foreground">
                Use dados fictícios para testar o dashboard sem precisar de uma chave real
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="organization">Nome da Organização</Label>
            <Input
              id="organization"
              placeholder="sua-organizacao"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              required
              disabled={loading || useDemo}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="token">Token de Acesso</Label>
            <Input
              id="token"
              type="password"
              placeholder="ghp_xxxxxxxxxxxx"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
              disabled={loading || useDemo}
            />
            {!useDemo && (
              <p className="text-xs text-muted-foreground mt-1">
                O token precisa de permissão <code>read:org</code> para acessar as métricas.
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Conectando..." : "Conectar"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default SettingsForm;
