<template>
  <v-container>
    <h1 class="text-center display-2 mb-4">Mes articles</h1>
    <v-row justify="center">
      <v-col v-if="articles.length > 0" v-for="article in articles" :key="article.id" cols="12" sm="6" md="4" lg="3">
        <v-card @click="showDetails(article.id)" class="mb-3">
          <v-img src="@/assets/img1.jpg" alt="Article Image"></v-img>
          <v-card-title class="text-center">{{ article.title }}</v-card-title>
          <v-card-actions>
            <v-btn @click.stop="deleteArticle(article.id)" color="error">Supprimer</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-snackbar v-else-if="errorMessage" v-model="errorSnackbar" color="error">
        {{ errorMessage }}
        <v-spacer></v-spacer>
      </v-snackbar>
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
const errorSnackbar = ref(false);
const errorMessage = ref('');



const router = useRouter();
const articles = ref([]);

const showDetails = (articleId) => {
  router.push(`/articles/${articleId}`);
};

const fetchArticles = async () => {
  try {
    const response = await fetch(`${apiUrl}/articles`);
    const data = await response.json();
    articles.value = data.articles;
  } catch (error) {
    console.error('Error fetching articles:', error);
    errorSnackbar.value = true;
    errorMessage.value = 'Erreur lors de la récupération des articles';
  }
};

const deleteArticle = async (articleId) => {
  try {
    const response = await fetch(`${apiUrl}/articles/${articleId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      console.log('Article deleted');
      // Refresh the articles after deletion
      fetchArticles();
    } else {
      console.error('Error deleting article');
    }
  } catch (error) {
    console.error('Error deleting article:', error);
  }
};

onMounted(() => {
  fetchArticles();
});
</script>

