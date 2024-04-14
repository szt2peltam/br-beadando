<script setup>
import { defineProps, onMounted , ref} from 'vue';
import axios from 'axios';
import { useUserStore } from '@/stores/counter';
const props = defineProps({
    reply: Object
})
const store = useUserStore();
const user = ref({})
const likeEl = ref(null);
let replylikes = ref([]);
onMounted(async () => {
    const fetch = await axios.get(`http://localhost:3000/users/${props.reply.authorId}`)
    let fetch2 = await axios.get(`http://localhost:3000/replylikes`);
    replylikes.value = fetch2.data.filter(like => like.replyid === props.reply.id && like.likerid === store.id);
    user.value = fetch.data
    
    replylikes.value.forEach(like => {
        console.log(like);
        if (like.likerid === store.id && like.replyid === props.reply.id) {
            likeEl.value.classList.add('liked');
            likeEl.value.name = 'heart';
            
        }
    });


})

async function Like() {
    if (likeEl.value.classList.contains('liked')) {
        likeEl.value.classList.remove('liked');
        likeEl.value.name = 'heart-outline';
        let fetch2 = await axios.get(`http://localhost:3000/replylikes`);
        replylikes.value = fetch2.data.filter(like => like.replyid === props.reply.id && like.likerid === store.id);

        await axios.delete(`http://localhost:3000/replylikes/${replylikes.value[0].id}`)	

    }else{
        likeEl.value.classList.add('liked');
        likeEl.value.name = 'heart';
        await axios.post(`http://localhost:3000/replylikes`, {
            likerid: store.id,
            replyid: props.reply.id,
            authorid : props.reply.authorId,
            postid : props.reply.postId

        })
    }

    let fetch2 = await axios.get(`http://localhost:3000/replylikes`);
    replylikes.value = fetch2.data.filter(like => like.replyid === props.reply.id && like.likerid === store.id);

}
</script>
<template>
    
    <div class="reply">
        <RouterLink :to="{path: '/feed/profile', props: {user: user}}" ><img src="../assets/img/userplaceholder.jpg" alt="image"></RouterLink>
        <div class="reply-content">
            <div class="user-info">
                <RouterLink :to="{path: '/feed/profile', props: {user: user}}" class="displayname" >{{user.displayname}} </RouterLink>
                <ion-icon name="ellipsis-horizontal" class="dots grey"></ion-icon>
                <RouterLink :to="{path: '/feed/profile', props: {user: user}}"  ><div class="grey">{{user.username}}</div> </RouterLink>
                <div class="grey">{{reply.date}}</div>
            </div>

            <p>{{reply.content}}</p>
            <button>Reply</button>
        </div>
        <div class="like" @click="Like">
            <ion-icon name="heart-outline" ref="likeEl" ></ion-icon>
            <p>{{replylikes.length}}</p>
        </div>
    </div>

</template>
<style scoped>
.user-info{
    display: flex;
    gap: 5px;
    align-items: center;
}
.liked{
    color: #00a4ff;
}
.like{
    display: flex;
    gap: 2px;
    justify-content: center;
    align-items: center;
    width: 100%;
    cursor: pointer;
    font-size: 1.3rem;
}
a{
    text-decoration: none;
    color: #121212;
}
button{
    border : none;
    background-color: #fff;
    width: fit-content;
    cursor: pointer;
    color: #959595;
    font-weight: 600;
}
.displayname{
    font-weight: 600;
}
.grey{
    color: #bcbcbc;
}
.reply-content{
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: .3rem;
    padding-left: 1rem;
}
    .reply{
        background-color: #fff;
        display: grid;
        grid-template-columns: 1fr 6fr 1fr;
        width: 100%;
        justify-items: center;
        align-items: center;
        padding: .7rem;
        border-radius: 10px;
        
    }

    img{
        width: 3rem;
        border-radius: 50%;
        display: block;
        
    }
</style>