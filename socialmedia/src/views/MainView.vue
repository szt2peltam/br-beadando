<script setup>
import Toolbar from '@/components/Toolbar.vue';
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { useRoute } from 'vue-router';

const route = useRoute();
</script>
<template>
    <Toolbar v-if="route.name !== 'profile'"/>
    <RouterView />
</template>
<style scoped>
</style>