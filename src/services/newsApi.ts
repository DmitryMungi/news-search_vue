const API_KEY = 'e19d1a6a2d6e469b8a97c29ea89f0edc'
const BASE_URL = 'https://newsapi.org/v2'

export interface Article {
  source: {
    id: string | null
    name: string
  }
  author: string | null
  title: string
  description: string | null
  url: string
  urlToImage: string | null
  publishedAt: string
  content: string | null
}

export interface NewsResponse {
  status: string
  totalResults: number
  articles: Article[]
}

export class NewsApiService {
  private static async makeRequest(endpoint: string): Promise<NewsResponse> {
    const url = `${BASE_URL}${endpoint}&apiKey=${API_KEY}`
    const response = await fetch(url)
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
  
    return response.json()
  }

  static async getTopHeadlines(country: string = 'us'): Promise<NewsResponse> {
    return this.makeRequest(`/top-headlines?country=${country}`)
  }

  static async searchNews(query: string, language: string = 'en'): Promise<NewsResponse> {
    return this.makeRequest(`/everything?q=${encodeURIComponent(query)}&language=${language}&sortBy=publishedAt`)
  }
}
