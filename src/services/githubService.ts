
import { CopilotMetrics, GitHubSettings } from "@/types/github";

export const fetchCopilotMetrics = async (settings: GitHubSettings): Promise<CopilotMetrics> => {
  try {
    const response = await fetch(`https://api.github.com/orgs/${settings.organization}/copilot/metrics`, {
      headers: {
        Authorization: `token ${settings.token}`,
        Accept: "application/vnd.github.v3+json"
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Falha ao obter métricas do Copilot");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar métricas do Copilot:", error);
    throw error;
  }
};
