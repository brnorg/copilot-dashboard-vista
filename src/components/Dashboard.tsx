import { CopilotMetrics, CopilotDetailedMetrics } from "@/types/github";
import MetricCard from "./MetricCard";
import CompletionsChart from "./CompletionsChart";
import CopilotDailyUsage from "./CopilotDailyUsage";
import IDEUsageMetrics from "./IDEUsageMetrics";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Github, Users, Database, Server } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface DashboardProps {
  metrics: CopilotMetrics;
  detailedMetrics?: CopilotDetailedMetrics[];
  organization: string;
  onBack: () => void;
  isDemo?: boolean;
}

const Dashboard = ({ metrics, detailedMetrics = [], organization, onBack, isDemo = false }: DashboardProps) => {
  const lastUpdated = new Date(metrics.last_updated_at);
  let timeAgo = "";
  
  try {
    timeAgo = formatDistanceToNow(lastUpdated, { addSuffix: true, locale: ptBR });
  } catch (error) {
    console.error("Erro ao formatar data:", error);
    timeAgo = "data indisponível";
  }
  
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onBack}
            className="mb-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold flex items-center">
            <Github className="mr-2 h-6 w-6 text-github-blue" />
            {organization}
            {isDemo && <span className="ml-2 text-sm bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md">Demo</span>}
          </h1>
          <p className="text-muted-foreground">
            Última atualização: {timeAgo}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Usuários Ativos"
          value={metrics.metrics.active_users.total}
          description={`${(metrics.metrics.active_users.percent_of_seats * 100).toFixed(1)}% dos assentos disponíveis`}
          icon={<Users className="h-4 w-4" />}
        />
        <MetricCard
          title="Repositórios"
          value={metrics.metrics.suggestions.repositories}
          description="Repositórios com sugestões do Copilot"
          icon={<Database className="h-4 w-4" />}
        />
        <MetricCard
          title="Total de Sugestões"
          value={metrics.metrics.suggestions.total.toLocaleString()}
          description={`${metrics.metrics.suggestions.users} usuários receberam sugestões`}
          icon={<Server className="h-4 w-4" />}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CompletionsChart metrics={metrics} />
        {isDemo && detailedMetrics.length > 0 && <CopilotDailyUsage data={detailedMetrics} />}
      </div>

      {isDemo && detailedMetrics.length > 0 && (
        <div className="grid grid-cols-1 gap-4">
          <IDEUsageMetrics data={detailedMetrics} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
