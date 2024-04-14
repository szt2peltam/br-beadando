<script setup>
import { onMounted, ref } from 'vue';
import Post from '@/components/Post.vue';
import axios from 'axios';


    let posts = ref([]);
    onMounted(async () => {
         let fetch = await axios.get('http://localhost:3000/posts');
         posts.value = fetch.data
    })


</script>
<template>
    <h3>Recent Posts</h3>
    <div class="post-list">
        <Post v-for="post in posts" :post="post"/>
    </div>
</template>
<style scoped>

h3{
    margin-top: 2rem;
    margin-bottom: 2rem;
}

.post-list{
    
    display: flex;
    flex-direction: column;
    gap: 2rem;
}
</style>