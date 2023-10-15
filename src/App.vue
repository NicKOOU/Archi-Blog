<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Archi Blog</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/">Liste des Articles</v-btn>
      <v-btn to="/create">Créer un Article</v-btn>
      <v-btn to="/contact">Nous contacter</v-btn>
    </v-app-bar>

    <v-container>
      <v-progress-circular v-if="loading" indeterminate size="64" class="mx-auto mt-12"></v-progress-circular>

      <v-alert v-if="error" type="error">{{ error }}</v-alert>

      <router-view />
    </v-container>
  </v-app>
</template>

<script>

export default {
  data() {
    return {
      drawer: false,
      loading: false,
      error: null,
    };
  },
};
</script>

<style>
/* Vos styles globaux ici */
</style>
