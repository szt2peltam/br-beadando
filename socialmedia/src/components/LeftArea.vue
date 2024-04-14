<script setup>
import { ref, onMounted } from 'vue';
import router from '@/router';
import { useUserStore } from '@/stores/counter';
const store = useUserStore();
function RemoveActive(e) {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.classList.remove('active');
    });
}
function AddActive(e) {
    RemoveActive();
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.classList.remove('active');
    });
     e.target.parentNode.classList.add('active');
}
function ClearUserStore() {
    store.id = null
    store.username = null
    store.password = null
    store.displayname = null
    store.email = null
}

</script>
<template>
    <div class="left-area-wrapper">
        <div class="menu" >
            <div class="menu-item active" >
                <ion-icon name="home-outline" size="large " @click="AddActive"> </ion-icon>
                <h3 @click="AddActive">Explore</h3>
            </div>
            <div class="menu-item" @click="router.push('/feed/profile/' + store.id);" >
                <ion-icon name="person-outline" size="large" @click="AddActive"></ion-icon>
                <h3 @click="AddActive">Profile</h3>
            </div>
            <div class="menu-item"  >
                <ion-icon name="create-outline" size="large" @click="AddActive"></ion-icon>
                <h3 @click="AddActive">Write a post</h3>
            </div>
            <div class="menu-item" >
                <ion-icon name="albums-outline" size="large" @click="AddActive"></ion-icon>
                <h3 @click="AddActive">My posts</h3>
            </div>
            <div class="menu-item" >
                <ion-icon name="people-outline" size="large" @click="AddActive"></ion-icon>
                <h3 @click="AddActive">Friends</h3>
            </div>
            <div class="menu-item" @click="router.push('/'); ClearUserStore();">
                <ion-icon name="log-out-outline" size="large" ></ion-icon>
                <h3 >Log out</h3>
            </div>
        </div>
    </div>
</template>
<style scoped>
.active{
    color: #00A4FF;
}
.left-area-wrapper{
    display: flex;
    flex-direction: column;

}
.menu{
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-left: 2rem;
    margin-top: 2rem;
}
.menu-item{
    display: flex;
    gap: 1rem;
    padding-left: 1rem;
    align-items: center;
    cursor: pointer;
}

</style>