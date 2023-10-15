<template>
    <v-container>
      <h1 class="text-center display-2 mb-4">Mes articles</h1>
      <v-row justify="center">
        <v-col v-if="articles.length > 0" v-for="article in articles" :key="article.id" cols="12" sm="6" md="4" lg="3">
          <v-card @click="showDetails(article.id)" class="mb-3">
            <v-img :src="article.image" alt="Article Image"></v-img>
            <v-card-title class="text-center">{{ article.title }}</v-card-title>
          </v-card>
        </v-col>
        <v-col v-else>
          <v-alert class="mx-auto" value="true" type="info">Aucun article disponible</v-alert>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
import { ref, onMounted, inject } from 'vue';
import { useRouter } from 'vue-router';
const apiUrl = inject('apiUrl');

const router = useRouter();
const articles = ref([]);

const showDetails = (articleId) => {
  router.push(`/articles/${articleId}`);
};

onMounted(() => {
  fetch(`${apiUrl}/articles`)
    .then(response => response.json())
    .then(data => {
      articles.value = data.articles; // Modifier ici pour accéder à la propriété "articles"
    })
    .catch(error => console.error('Error fetching articles:', error));
});
</script>
