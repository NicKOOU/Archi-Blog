<template>
    <v-container>
        <h1>{{ formTitle }}</h1>
        <!-- Ajoutez un formulaire Vuetify ici pour créer ou éditer un article -->
        <v-form>
            <v-text-field v-model="articleTitle" label="Title"></v-text-field>
            <v-textarea v-model="articleContent" label="Content"></v-textarea>
            <v-btn @click="saveArticle">Save Article</v-btn>
        </v-form>
    </v-container>
</template>
  
<script setup>
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';

const formTitle = ref('Create Article');
const router = useRouter();
const apiUrl = inject('apiUrl');

const articleTitle = ref('');
const articleContent = ref('');


const saveArticle = () => {
    fetch(`${apiUrl}/articles`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: articleTitle.value, content: articleContent.value }),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Article saved:', data);
            router.push('/');
        })
        .catch(error => console.error('Error saving article:', error));
};
</script>
  
  
<style scoped>
/* Styles spécifiques à ArticleForm.vue */
</style>
  