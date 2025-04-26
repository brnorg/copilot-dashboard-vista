
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
  useDemo?: boolean;
}

// New mock data model
export interface CopilotDetailedMetrics {
  date: string;
  total_active_users: number;
  total_engaged_users: number;
  copilot_ide_code_completions: {
    total_engaged_users: number;
    languages: LanguageMetric[];
    editors: EditorMetric[];
  };
  copilot_ide_chat: {
    total_engaged_users: number;
    editors: ChatEditorMetric[];
  };
  copilot_dotcom_chat: {
    total_engaged_users: number;
    models: ChatModelMetric[];
  };
  copilot_dotcom_pull_requests: {
    total_engaged_users: number;
    repositories: RepositoryMetric[];
  };
}

export interface LanguageMetric {
  name: string;
  total_engaged_users: number;
  total_code_suggestions?: number;
  total_code_acceptances?: number;
  total_code_lines_suggested?: number;
  total_code_lines_accepted?: number;
}

export interface EditorMetric {
  name: string;
  total_engaged_users: number;
  models: EditorModelMetric[];
}

export interface EditorModelMetric {
  name: string;
  is_custom_model: boolean;
  custom_model_training_date: string | null;
  total_engaged_users?: number;
  languages?: LanguageMetric[];
}

export interface ChatEditorMetric {
  name: string;
  total_engaged_users: number;
  models: ChatModelMetric[];
}

export interface ChatModelMetric {
  name: string;
  is_custom_model: boolean;
  custom_model_training_date: string | null;
  total_engaged_users?: number;
  total_chats?: number;
  total_chat_insertion_events?: number;
  total_chat_copy_events?: number;
}

export interface RepositoryMetric {
  name: string;
  total_engaged_users: number;
  models: RepositoryModelMetric[];
}

export interface RepositoryModelMetric {
  name: string;
  is_custom_model: boolean;
  custom_model_training_date: string | null;
  total_pr_summaries_created?: number;
  total_engaged_users?: number;
}
