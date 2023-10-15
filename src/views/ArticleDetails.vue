<template>
    <v-container v-if="articleDetails">
        <v-row justify="center">
            <v-col cols="12">
                <v-card class="mb-2">
                    <v-row>
                        <!-- Image on the left -->
                        <v-col cols="12" md="6">
                            <v-img src="@/assets/img1.jpg" alt="Article Image" max-width="400px"></v-img>
                        </v-col>
                        <!-- Title and content on the right -->
                        <v-col cols="12" md="6">
                            <v-text-field v-model="editedTitle" label="Title"></v-text-field>

                            <v-divider></v-divider>
                            <v-textarea v-model="editedContent" label="Content"></v-textarea>
                            <v-divider></v-divider>
                            <v-card-actions>
                                <v-btn @click="saveChanges" color="primary">Save Changes</v-btn>
                            </v-card-actions>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue';
import { useRouter } from 'vue-router';
const apiUrl = inject('apiUrl');

const router = useRouter();
const articleDetails = ref(null);
const editedTitle = ref('');
const editedContent = ref('');

onMounted(() => {
    const articleId = router.currentRoute.value.params.id;

    fetch(`${apiUrl}/articles/${articleId}`)
        .then(response => response.json())
        .then(data => {
            articleDetails.value = data.article;
            // Set initial values for editing
            editedTitle.value = data.article.title;
            editedContent.value = data.article.content;
        })
        .catch(error => console.error('Error fetching article details:', error));
});

const saveChanges = async () => {
    const articleId = router.currentRoute.value.params.id;

    try {
        const response = await fetch(`${apiUrl}/articles/${articleId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: editedTitle.value,
                content: editedContent.value,
            }),
        });

        if (response.ok) {
            // Route to the home page
            router.push('/');
        } else {
            console.error('Error updating article');
        }
    } catch (error) {
        console.error('Error updating article:', error);
    }
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
