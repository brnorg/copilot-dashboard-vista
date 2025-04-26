
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { CopilotDetailedMetrics } from "@/types/github";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface CopilotDailyUsageProps {
  data: CopilotDetailedMetrics[];
}

const CopilotDailyUsage = ({ data }: CopilotDailyUsageProps) => {
  const chartData = data.map(day => ({
    date: format(new Date(day.date), "dd/MM", { locale: ptBR }),
    "Usuários Ativos": day.total_active_users,
    "Usuários Engajados": day.total_engaged_users,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Uso Diário do Copilot</CardTitle>
        <CardDescription>
          Usuários ativos e engajados por dia
        </CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Usuários Ativos" fill="#2188ff" />
            <Bar dataKey="Usuários Engajados" fill="#28a745" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CopilotDailyUsage;
