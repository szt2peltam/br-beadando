<script setup>
import UserListCard from '@/components/UserListCard.vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';
let users = ref([]);
onMounted(async () => {
     let fetch = await axios.get('http://localhost:3000/users');
     users.value = fetch.data
})
</script>
<template>
    <div class="userlist-wrapper">
        <div class="userlist-header">
            <div class="title">
                <ion-icon name="ellipse" class="online" ></ion-icon>
                <h3>People you may know</h3>
            </div>
            <div class="buttons">
                <button class="left">
                    <ion-icon name="chevron-back-outline"></ion-icon>
                </button>
                <button class="right">
                    <ion-icon name="chevron-forward-outline"></ion-icon>
                </button>
            </div>
        </div>
        <div class="userlist">
            <UserListCard v-for="user in users" :user="user"/>
        </div>
    </div>
</template>
    <style scoped>
    .userlist-wrapper{
        display: grid;
        grid-template-rows: 1fr 5fr;
    }
    .userlist-header{
        display: flex;
        justify-content: space-between;
        padding-right: 3rem;
        padding-left: 1rem;
    }

    .userlist{
        display: flex;
        gap: 1rem;
        max-width: 100%;
        overflow-x: scroll;
        
    }
    .title{
        display: flex;
        align-items: center;
        gap: .8rem;
    }
    .buttons{
        display: flex;
        align-items: center;
        gap: 3px;
    }
    .left , .right{
        color: #00A4FF;
        background-color: #00a6ff35;
        border-radius: 3px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 1.5rem;
        width: 1.5rem;
        cursor: pointer;
        border: none;

    }
    .online{
        color: rgb(1, 185, 1);

    }
</style>