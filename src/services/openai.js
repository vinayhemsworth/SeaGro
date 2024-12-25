import axios from 'axios';
import { RateLimiter } from '../utils/rateLimiter';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const rateLimiter = new RateLimiter();

export const openaiService = {
  async generateResponse(messages) {
    try {
      // Check rate limit before making request
      await rateLimiter.tryRequest();

      const formattedMessages = [
        {
          role: 'system',
          content: 'You are a helpful assistant for the SeaGro platform. You help users with their questions about the platform, technology, and professional development.'
        },
        ...messages.map(msg => ({
          role: msg.type === 'user' ? 'user' : 'assistant',
          content: msg.content
        }))
      ];

      const response = await axios.post(
        OPENAI_API_URL,
        {
          model: 'gpt-3.5-turbo',
          messages: formattedMessages,
          temperature: 0.7,
          max_tokens: 150
        },
        {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.data?.choices?.[0]?.message?.content) {
        throw new Error('Invalid response format from OpenAI');
      }

      return response.data.choices[0].message.content;
    } catch (error) {
      if (error.message.includes('Please wait')) {
        throw error; // Rate limit error from our limiter
      }
      
      console.error('OpenAI API Error:', error.response?.data || error.message);
      
      if (error.response?.status === 401) {
        throw new Error('Authentication failed. Please check your API key.');
      } else if (error.response?.status === 429) {
        throw new Error('OpenAI rate limit exceeded. Please try again in a few minutes.');
      } else {
        throw new Error('Failed to generate response. Please try again.');
      }
    }
  }
};