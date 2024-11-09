import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
      'Content-Type': 'application/json',
    },
})

export const getCharacters = async () => {
    try {
      const response = await apiClient.get('/characters');
      return response.data;
    } catch (error) {
      console.error('Error fetching characters:', error);
      throw error;
    }
}

export const getDailyQuestionCharacter = async () => {
    try {
      const response = await apiClient.get('/quote');
      return response.data;
    } catch (error) {
      console.error('Error fetching quote question:', error);
      throw error;
    }
  }