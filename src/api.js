import axios from 'axios'

const apiClient = axios.create({
    baseURL: '/api',
    headers: {
      'Content-Type': 'application/json',
    },
})

export const getDailyQuote = async () => {
    try {
      console.log('Fetching quote question...')
      const response = await apiClient.get('/quote')
      return response.data
    } catch (error) {
      console.error('Error fetching quote question:', error)
      throw error
    }
}

export const getAllCharacters = async () => {
    try {
      const response = await apiClient.get('/characters')
      return response.data
    } catch (error) {
      console.error('Error fetching characters:', error)
      throw error
    }
}

export const createDailyQuestions = async () => {
  try {
    const response = await apiClient.get('/create-questions')
    return response.data
  } catch (error) {
    console.error('Error creating daily questions:', error)
    throw error
  }
}