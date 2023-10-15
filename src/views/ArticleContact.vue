<template>
    <v-snackbar v-model="errorSnackbar" color="error">
        {{ errorMessage }}
        <v-spacer></v-spacer>
    </v-snackbar>
    <v-snackbar v-model="successSnackbar" color="success">
        {{ successMessage }}
        <v-spacer></v-spacer>
    </v-snackbar>
    <v-container>
        <h1 class="text-center display-2 mb-4">Nous Contacter</h1>
        <v-form @submit.prevent="submitForm">
            <!-- Name -->
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field v-model="name" label="Nom" required></v-text-field>
                </v-col>
                <!-- Surname -->
                <v-col cols="12" md="6">
                    <v-text-field v-model="surname" label="Prénom" required></v-text-field>
                </v-col>
            </v-row>
            <!-- Email -->
            <v-text-field v-model="email" label="Email" required type="email"></v-text-field>
            <!-- Message -->
            <v-textarea v-model="message" label="Message" required></v-textarea>
            <!-- Submit Button -->
            <v-btn type="submit" color="primary">Envoyer</v-btn>
        </v-form>

    </v-container>
</template>

<script setup>
import { ref, inject } from 'vue';

const name = ref('');
const surname = ref('');
const email = ref('');
const message = ref('');
const serverResponse = ref(null);
const apiUrl = inject('apiUrl');
const errorSnackbar = ref(false);
const errorMessage = ref('');
const successSnackbar = ref(false);
const successMessage = ref('');

const submitForm = () => {
    // use fetch
    fetch(`${apiUrl}/contact`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, surname, email, message }),
    })
        .then(response => response.json())
        .then(data => {
            serverResponse.value = { type: 'success', message: 'Message bien envoyé' };
            successSnackbar.value = true;
            successMessage.value = 'Message bien envoyé'
        })
        .catch(error => {
            serverResponse.value = { type: 'error', message: "Le service n'est pas joignable" };
            errorSnackbar.value = true;
            errorMessage.value = 'Le service n\'est pas joignable'
        });
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
