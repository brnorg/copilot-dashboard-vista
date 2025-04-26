
export interface CopilotMetrics {
  last_updated_at: string;
  metrics: {
    completions: {
      suggested: number;
      accepted: number;
      acceptance_rate: number;
    };
    suggestions: {
      total: number;
      users: number;
      repositories: number;
    };
    active_users: {
      total: number;
      percent_of_seats: number;
    };
  };
}

export interface GitHubSettings {
  organization: string;
  token: string;
}
