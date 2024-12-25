import { geminiService } from './gemini';
import { openaiService } from './openai';

export const chatService = {
  async generateResponse(messages, provider = 'gemini') {
    if (provider === 'gemini') {
      return geminiService.generateResponse(messages);
    }
    return openaiService.generateResponse(messages);
  }
};