import axios from 'axios';
import { RateLimiter } from '../utils/rateLimiter';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
const API_KEY = 'AIzaSyA4eJ1rBcqqYhRCu7ccXEIXKa7kh2LMC1M';
const rateLimiter = new RateLimiter(3, 60000); // 3 requests per minute

export const geminiService = {
  async generateResponse(messages) {
    try {
      await rateLimiter.tryRequest();

      const latestMessage = messages[messages.length - 1];
      
      const response = await axios.post(
        `${GEMINI_API_URL}?key=${API_KEY}`,
        {
          contents: [{
            parts: [{
              text: latestMessage.content
            }]
          }]
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        throw new Error('Invalid response format from Gemini');
      }

      return response.data.candidates[0].content.parts[0].text;
    } catch (error) {
      if (error.message.includes('Please wait')) {
        throw error;
      }
      
      console.error('Gemini API Error:', error.response?.data || error.message);
      
      if (error.response?.status === 429) {
        throw new Error('Rate limit exceeded. Please try again in a few minutes.');
      }
      
      throw new Error('Failed to generate response. Please try again.');
    }
  }
};