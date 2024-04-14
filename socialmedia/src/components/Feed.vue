<script setup>
import LeftArea from '@/components/LeftArea.vue';
import MiddleArea from '@/components/MiddleArea.vue';
import RightArea from '@/components/RightArea.vue';
</script>
<template>
    <div class="feed-area">
        <div class="left">
            <LeftArea/>
        </div>
        <div class="middle">
            <MiddleArea/>
        </div>
        <div class="right">
            <RightArea/>
        </div>
    </div>

</template>
<style scoped>
    .feed-area{
        padding-top: 3rem;
        display: grid;
        grid-template-columns: 1fr 2fr 1fr;
    }
</style>