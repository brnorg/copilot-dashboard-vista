
import { CopilotMetrics, CopilotDetailedMetrics } from "@/types/github";

export const mockDetailedData: CopilotDetailedMetrics[] = [
  {
    "date": "2024-06-24",
    "total_active_users": 24,
    "total_engaged_users": 20,
    "copilot_ide_code_completions": {
      "total_engaged_users": 20,
      "languages": [
        {
          "name": "python",
          "total_engaged_users": 10
        },
        {
          "name": "ruby",
          "total_engaged_users": 10
        }
      ],
      "editors": [
        {
          "name": "vscode",
          "total_engaged_users": 13,
          "models": [
            {
              "name": "default",
              "is_custom_model": false,
              "custom_model_training_date": null,
              "total_engaged_users": 13,
              "languages": [
                {
                  "name": "python",
                  "total_engaged_users": 6,
                  "total_code_suggestions": 249,
                  "total_code_acceptances": 123,
                  "total_code_lines_suggested": 225,
                  "total_code_lines_accepted": 135
                },
                {
                  "name": "ruby",
                  "total_engaged_users": 7,
                  "total_code_suggestions": 496,
                  "total_code_acceptances": 253,
                  "total_code_lines_suggested": 520,
                  "total_code_lines_accepted": 270
                }
              ]
            }
          ]
        },
        {
          "name": "neovim",
          "total_engaged_users": 7,
          "models": [
            {
              "name": "a-custom-model",
              "is_custom_model": true,
              "custom_model_training_date": "2024-02-01",
              "languages": [
                {
                  "name": "typescript",
                  "total_engaged_users": 3,
                  "total_code_suggestions": 112,
                  "total_code_acceptances": 56,
                  "total_code_lines_suggested": 143,
                  "total_code_lines_accepted": 61
                },
                {
                  "name": "go",
                  "total_engaged_users": 4,
                  "total_code_suggestions": 132,
                  "total_code_acceptances": 67,
                  "total_code_lines_suggested": 154,
                  "total_code_lines_accepted": 72
                }
              ]
            }
          ]
        }
      ]
    },
    "copilot_ide_chat": {
      "total_engaged_users": 13,
      "editors": [
        {
          "name": "vscode",
          "total_engaged_users": 13,
          "models": [
            {
              "name": "default",
              "is_custom_model": false,
              "custom_model_training_date": null,
              "total_engaged_users": 12,
              "total_chats": 45,
              "total_chat_insertion_events": 12,
              "total_chat_copy_events": 16
            },
            {
              "name": "a-custom-model",
              "is_custom_model": true,
              "custom_model_training_date": "2024-02-01",
              "total_engaged_users": 1,
              "total_chats": 10,
              "total_chat_insertion_events": 11,
              "total_chat_copy_events": 3
            }
          ]
        }
      ]
    },
    "copilot_dotcom_chat": {
      "total_engaged_users": 14,
      "models": [
        {
          "name": "default",
          "is_custom_model": false,
          "custom_model_training_date": null,
          "total_engaged_users": 14,
          "total_chats": 38
        }
      ]
    },
    "copilot_dotcom_pull_requests": {
      "total_engaged_users": 12,
      "repositories": [
        {
          "name": "demo/repo1",
          "total_engaged_users": 8,
          "models": [
            {
              "name": "default",
              "is_custom_model": false,
              "custom_model_training_date": null,
              "total_pr_summaries_created": 6,
              "total_engaged_users": 8
            }
          ]
        },
        {
          "name": "demo/repo2",
          "total_engaged_users": 4,
          "models": [
            {
              "name": "a-custom-model",
              "is_custom_model": true,
              "custom_model_training_date": "2024-02-01",
              "total_pr_summaries_created": 10,
              "total_engaged_users": 4
            }
          ]
        }
      ]
    }
  }
];

// Convert the detailed metrics to the simplified format our UI currently expects
export const getMockCopilotMetrics = (): CopilotMetrics => {
  const detailedData = mockDetailedData[0];
  
  // Calculate total suggested and accepted completions
  const vscodeCompletions = detailedData.copilot_ide_code_completions.editors
    .find(e => e.name === "vscode")?.models[0]?.languages || [];
  
  const totalSuggestions = vscodeCompletions.reduce((sum, lang) => 
    sum + (lang.total_code_suggestions || 0), 0);
  
  const totalAccepted = vscodeCompletions.reduce((sum, lang) => 
    sum + (lang.total_code_acceptances || 0), 0);
  
  // Create acceptance rate
  const acceptanceRate = totalSuggestions > 0 ? totalAccepted / totalSuggestions : 0;
  
  // Count repositories
  const repoCount = detailedData.copilot_dotcom_pull_requests.repositories.length;
  
  // Create mock data that fits our existing UI structure
  return {
    last_updated_at: new Date(detailedData.date).toISOString(),
    metrics: {
      completions: {
        suggested: totalSuggestions,
        accepted: totalAccepted,
        acceptance_rate: acceptanceRate
      },
      suggestions: {
        total: totalSuggestions,
        users: detailedData.total_engaged_users,
        repositories: repoCount
      },
      active_users: {
        total: detailedData.total_active_users,
        percent_of_seats: detailedData.total_active_users / 30 // Assuming 30 seats for demo
      }
    }
  };
};
