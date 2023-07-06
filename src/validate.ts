const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");

export class ClientService {
  private client;

  constructor() {
      const API_KEY = '4f12e9cb0e90461baa19e082f52cdfad';
      const API_URL = 'https://gptdeployment.openai.azure.com/';
      this.client = new OpenAIClient(API_URL, new AzureKeyCredential(API_KEY));
  }
  
  public async validate(messages: string[]) {
      const maxTokens  = 500;
      const deploymentId = "text-davinci-003";
      const response = await this.client.getCompletions(deploymentId, messages, { maxTokens });
      console.log(response);

      return {
          text: response.choices[0].text,
          suggestion: response.choices[1].text
      };
  }
}

export async function validateMessages(messages: string[]) {
  const clientService = new ClientService();
  return clientService.validate(messages);
}