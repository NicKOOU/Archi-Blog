<template>
    <v-container>
      <h1>Article Details</h1>
      <v-card>
        <v-img :src="articleDetails.image" alt="Article Image"></v-img>
        <v-card-title class="text-center">{{ articleDetails.title }}</v-card-title>
        <v-card-text>{{ articleDetails.content }}</v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted, inject } from 'vue';
  import { useRouter } from 'vue-router';
  const apiUrl = inject('apiUrl');
  
  const router = useRouter();
  const articleDetails = ref(null);
  
  onMounted(() => {
    const articleId = router.params.id;
  
    fetch(`${apiUrl}/articles/${articleId}`)
      .then(response => response.json())
      .then(data => {
        articleDetails.value = data.article; // Modifier ici pour accéder à la propriété "article"
      })
      .catch(error => console.error('Error fetching article details:', error));
  });
  </script>
  
  
  <style scoped>
  /* Styles spécifiques à ArticleDetails.vue */
  </style>
  