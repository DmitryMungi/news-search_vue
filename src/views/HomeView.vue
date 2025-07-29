<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { NewsApiService, type Article } from '../services/newsApi'
import { NewsCard }from '../components/NewsCard.vue'

const articles = ref<Article[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const loadTopHeadlines = async () => {
  loading.value = true
  error.value = null
  
  try {
    const response = await NewsApiService.getTopHeadlines('us')
    articles.value = response.articles
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Произошла ошибка при загрузке новостей'
    console.error('Error loading news:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadTopHeadlines()
})
</script>

<template>
  <div class="home-view">
    <div class="header">
      <h2>Топ новости США</h2>
      <button @click="loadTopHeadlines" :disabled="loading" class="refresh-btn">
        {{ loading ? 'Загрузка...' : 'Обновить' }}
      </button>
    </div>

    <div v-if="loading && articles.length === 0" class="loading">
      <div class="spinner"></div>
      <p>Загрузка новостей...</p>
    </div>

    <div v-if="error" class="error">
      <p>{{ error }}</p>
      <button @click="loadTopHeadlines" class="retry-btn">Попробовать снова</button>
    </div>

    <div v-if="articles.length > 0" class="news-list">
      <NewsCard 
        v-for="article in articles" 
        :key="article.url" 
        :article="article" 
      />
    </div>

    <div v-if="!loading && !error && articles.length === 0" class="no-news">
      <p>Новости не найдены</p>
    </div>
  </div>
</template>

<style scoped>
.home-view {
  max-width: 100%;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e0e0e0;
}

.header h2 {
  margin: 0;
  color: #2c3e50;
  font-size: 2rem;
}

.refresh-btn {
  padding: 0.75rem 1.5rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s ease;
}

.refresh-btn:hover:not(:disabled) {
  background-color: #2980b9;
}

.refresh-btn:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem;
  color: #666;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error {
  text-align: center;
  padding: 2rem;
  background-color: #fee;
  border: 1px solid #fcc;
  border-radius: 6px;
  color: #c33;
}

.retry-btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.retry-btn:hover {
  background-color: #c0392b;
}

.news-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.no-news {
  text-align: center;
  padding: 3rem;
  color: #666;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .header h2 {
    text-align: center;
    font-size: 1.5rem;
  }
}
</style>
