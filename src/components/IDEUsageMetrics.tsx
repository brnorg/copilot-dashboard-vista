
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CopilotDetailedMetrics } from "@/types/github";
import { Code, Terminal } from "lucide-react"; // Replace Vscode and Neovim
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface IDEUsageMetricsProps {
  data: CopilotDetailedMetrics[];
}

const IDEUsageMetrics = ({ data }: IDEUsageMetricsProps) => {
  const latestData = data[0]; // Using most recent data point
  const ideStats = latestData.copilot_ide_code_completions.editors;

  const getIconForEditor = (editorName: string) => {
    switch (editorName.toLowerCase()) {
      case 'vscode':
        return <Code className="h-4 w-4" />;
      case 'neovim':
        return <Terminal className="h-4 w-4" />; // Using Terminal as a replacement for Neovim
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Uso por IDE</CardTitle>
        <CardDescription>
          Estatísticas de uso do Copilot por editor
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>IDE</TableHead>
              <TableHead>Usuários Engajados</TableHead>
              <TableHead>Modelos</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ideStats.map((ide) => (
              <TableRow key={ide.name}>
                <TableCell className="flex items-center gap-2">
                  {getIconForEditor(ide.name)}
                  {ide.name}
                </TableCell>
                <TableCell>{ide.total_engaged_users}</TableCell>
                <TableCell>
                  {ide.models.map(model => model.name).join(", ")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default IDEUsageMetrics;
