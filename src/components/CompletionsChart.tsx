
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { CopilotMetrics } from "@/types/github";

interface CompletionsChartProps {
  metrics: CopilotMetrics;
}

const CompletionsChart = ({ metrics }: CompletionsChartProps) => {
  const data = [
    {
      name: "Sugestões",
      Sugeridas: metrics.metrics.completions.suggested,
      Aceitas: metrics.metrics.completions.accepted,
    }
  ];

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Completions do Copilot</CardTitle>
        <CardDescription>
          Taxa de aceitação: {(metrics.metrics.completions.acceptance_rate * 100).toFixed(1)}%
        </CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Sugeridas" fill="#2188ff" />
            <Bar dataKey="Aceitas" fill="#28a745" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CompletionsChart;
