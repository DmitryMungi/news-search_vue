<script setup lang="ts">
import type { Article } from '../services/newsApi'

defineProps<{
  article: Article
}>()

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<template>
  <article class="news-card">
    <div class="news-image" v-if="article.urlToImage">
      <img :src="article.urlToImage" :alt="article.title" />
    </div>
    <div class="news-content">
      <div class="news-source">{{ article.source.name }}</div>
      <h3 class="news-title">
        <a :href="article.url" target="_blank" rel="noopener noreferrer">
          {{ article.title }}
        </a>
      </h3>
      <p class="news-description" v-if="article.description">
        {{ article.description }}
      </p>
      <div class="news-meta">
        <span class="news-author" v-if="article.author">{{ article.author }}</span>
        <span class="news-date">{{ formatDate(article.publishedAt) }}</span>
      </div>
    </div>
  </article>
</template>

<style scoped>
.news-card {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s ease;
}

.news-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.news-image {
  flex-shrink: 0;
  width: 200px;
  height: 120px;
  overflow: hidden;
  border-radius: 6px;
}

.news-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.news-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.news-source {
  font-size: 0.875rem;
  color: #666;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.news-title {
  margin: 0;
  font-size: 1.25rem;
  line-height: 1.4;
}

.news-title a {
  color: #2c3e50;
  text-decoration: none;
  transition: color 0.2s ease;
}

.news-title a:hover {
  color: #3498db;
}

.news-description {
  margin: 0;
  color: #555;
  line-height: 1.5;
  flex: 1;
}

.news-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  color: #888;
  margin-top: auto;
}

.news-author {
  font-weight: 500;
}

@media (max-width: 768px) {
  .news-card {
    flex-direction: column;
    padding: 1rem;
  }

  .news-image {
    width: 100%;
    height: 180px;
  }

  .news-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
}
</style>
