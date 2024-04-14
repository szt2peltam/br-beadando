<script setup>
import { defineProps, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
const props = defineProps({
    user:Object
})

</script>
<template>
    <div class="userlist-card">
        <div class="top">
            <img src="../assets/img/userplaceholder.jpg" alt="image">
        </div>
        <div class="bottom">
            <h4>{{user.displayname}}</h4>
            <h5>{{user.username}}</h5>
            <div class="btn">
                <RouterLink :to="{path: '/feed/profile/'+user.id}" ><button>View Profile</button></RouterLink>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .userlist-card{
        display: grid;
        background-color: #fff;
        grid-template-rows: 1fr 1fr;
        width: 10rem;
        border-radius: 10px;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        height: 15rem;
        

    }
    img{
        width: 100%;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
    }
    .bottom{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        margin-top: 5px;
        margin-bottom: 5px;

    }

    h5{
        color: #bcbcbc;
    }
    button{
        border : none;
        padding: 10px;
        padding-left: 15px;
        padding-right: 15px;
        color: #00A4FF;
        background-color: #00a6ff35;
        font-weight: 600;
        letter-spacing: 0.5px;
        border-radius: 10px;
        cursor: pointer;
    }

</style>