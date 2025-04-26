import { useState } from "react";
import SettingsForm from "@/components/SettingsForm";
import Dashboard from "@/components/Dashboard";
import { GitHubSettings, CopilotMetrics, CopilotDetailedMetrics } from "@/types/github";
import { fetchCopilotMetrics } from "@/services/githubService";
import { useToast } from "@/components/ui/use-toast";
import { Users, Database, Server } from "lucide-react";
import { mockDetailedData } from "@/services/mockData";

const Index = () => {
  const [settings, setSettings] = useState<GitHubSettings | null>(null);
  const [metrics, setMetrics] = useState<CopilotMetrics | null>(null);
  const [detailedMetrics, setDetailedMetrics] = useState<CopilotDetailedMetrics[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSettingsSave = async (newSettings: GitHubSettings) => {
    setLoading(true);
    try {
      const data = await fetchCopilotMetrics(newSettings);
      setMetrics(data);
      if (newSettings.useDemo) {
        setDetailedMetrics(mockDetailedData);
      }
      setSettings(newSettings);
      toast({
        title: newSettings.useDemo 
          ? "Modo de demonstração ativado" 
          : "Conectado com sucesso",
        description: newSettings.useDemo 
          ? "Usando dados de demonstração" 
          : `Dados obtidos para a organização ${newSettings.organization}`,
      });
    } catch (error) {
      let errorMessage = "Falha ao conectar com a API do GitHub";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast({
        title: "Erro de conexão",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setSettings(null);
    setMetrics(null);
    setDetailedMetrics([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
      {!metrics ? (
        <div className="container max-w-5xl mx-auto px-4">
          <div className="py-12">
            <SettingsForm onSave={handleSettingsSave} loading={loading} />
          </div>
          
          <div className="mt-12 space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-semibold text-github-darkGrey dark:text-white">
                GitHub Copilot Metrics Dashboard
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Visualize métricas detalhadas sobre o uso do GitHub Copilot na sua organização, 
                incluindo taxas de aceitação de sugestões, usuários ativos e muito mais.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-github-lightBlue bg-opacity-10 text-github-blue mb-4">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium mb-2">Usuários Ativos</h3>
                <p className="text-muted-foreground">
                  Monitore quantos membros da sua organização estão usando ativamente o GitHub Copilot.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-github-lightBlue bg-opacity-10 text-github-blue mb-4">
                  <Database className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium mb-2">Repositórios</h3>
                <p className="text-muted-foreground">
                  Veja em quais repositórios o GitHub Copilot está sendo mais utilizado.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-github-lightBlue bg-opacity-10 text-github-blue mb-4">
                  <Server className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium mb-2">Sugestões</h3>
                <p className="text-muted-foreground">
                  Analise a quantidade e qualidade das sugestões fornecidas pelo GitHub Copilot.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Dashboard 
          metrics={metrics} 
          detailedMetrics={detailedMetrics}
          organization={settings?.organization || ""} 
          onBack={handleBack}
          isDemo={settings?.useDemo || false}
        />
      )}
    </div>
  );
};

export default Index;
