<script setup>
import router from '@/router';
import axios from 'axios';
import { defineProps, onMounted } from 'vue';
import { ref } from 'vue';
import { useUserStore } from '@/stores/counter';

const userStore = useUserStore();
const props = defineProps({
    post: Object,
    showBorder: Boolean
})
const likeEl = ref(null);
const replies = ref([]);
let user = ref({});
let likes = ref([]);
onMounted(async() => {
    let fetch = await axios.get(`http://localhost:3000/users/${props.post.authorId}`);
    user.value = fetch.data
    let fetch2 = await axios.get(`http://localhost:3000/postlikes`);
    likes.value = fetch2.data.filter(data => data.postid === props.post.id);

    let fetch3 = await axios.get(`http://localhost:3000/replies`);
    replies.value = fetch3.data.filter(reply => reply.postId === props.post.id);

    likes.value.forEach(likeData => {
        if (likeData.userid === userStore.id && likeData.postid === props.post.id) {
            likeEl.value.classList.add('liked');
            likeEl.value.name = 'heart';
            
        }
    });

        
    
    if (props.showBorder) {
        postStyle.value = "post post-border";
        
    }
})
async function Like() {

    if (likeEl.value.classList.contains('liked')) {
        let likes2 = await axios.get(`http://localhost:3000/postlikes`);
        let likedata = likes2.data.filter(like => like.userid === userStore.id && like.postid === props.post.id);
        likeEl.value.classList.remove('liked');
        likeEl.value.name = 'heart-outline';
        await axios.delete(`http://localhost:3000/postlikes/${likedata[0].id}`);


        
    } else {
        likeEl.value.classList.add('liked');
        likeEl.value.name = 'heart';
        await axios.post(`http://localhost:3000/postlikes`, {
            userid: userStore.id,
            postid: props.post.id,
            date: new Date().toLocaleString(),
            authorId : props.post.authorId
        })
        
    }


    let fetch2 = await axios.get(`http://localhost:3000/postlikes`);
    likes.value = fetch2.data.filter(data => data.postid === props.post.id);
}
const postStyle = ref("post");

function OpenReplies(){
    console.log(props.post);
    router.push({path: '/feed/'+props.post.id})
}
</script>
<template>
    <div :class="postStyle">
        <div class="post-header">
            <RouterLink :to="{path: '/feed/profile', props: {user: user}}" ><img src="../assets/img/userplaceholder.jpg" alt="image"></RouterLink>
            <div class="info">
                <div class="userinfo">
                    <RouterLink :to="{path: '/feed/profile', props: {user: user}}" class="displayname" >{{user.displayname}} </RouterLink>
                    <ion-icon name="ellipsis-horizontal" class="dots grey"></ion-icon>
                    <RouterLink :to="{path: '/feed/profile', props: {user: user}}"  ><div class="grey">{{user.username}}</div> </RouterLink>

                </div>
                <div class="postinfo">
                    <div class="grey">{{post.date}}</div>
                </div>
            </div>
        </div>
        <div class="post-content">
            <h3>{{post.title}}</h3>
            <img src="../assets/img/noimage.png" alt="image">
            <p>{{post.content}}</p>
        </div>
        <hr>
        <div class="interact">
            <div class="icons">
                <div class="heart" @click="Like">
                    <ion-icon name="heart-outline" ref="likeEl" ></ion-icon>
                    <p>{{likes.length}}</p>
                </div>
                <div class="replies" @click="OpenReplies">
                    <ion-icon name="chatbubble-outline" ></ion-icon>
                    <p>{{replies.length}}</p>
                </div>
            </div>
            <button @click="OpenReplies">Reply</button>
        </div>
    </div>
</template>
<style scoped>

.interact{
    height: 3rem;
    display: flex;
    justify-content: space-between;
    padding-left: 1rem;
    padding-right: 1rem;
    align-items: center;
    margin-top:1rem;
    margin-bottom: 1rem;
}
.liked{
    color: #00A4FF;
}
hr{
    width: 95%;
    align-self: center;
    background-color: #bcbcbc;
}
.icons{
    display: flex;
    align-items: center;
    gap: 10px;
}
.icons div{
    display: flex;
    font-size: 1.2rem;
    gap: .2rem;
    align-items: center;
    cursor: pointer;
}

.interact button{
    border: none;
    color: #00A4FF;
    background-color: #00a6ff35;
    height: 70%;
    width: 5rem;
    border-radius: 5px;
    cursor: pointer;

}
.post{
    background-color: #fff;
    width: 100%;
    min-height: 20rem;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
}
.post-header{
    display: flex;
    padding: 1rem;
    gap: 2rem;
    align-items: center;
}
.post-content{
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.post-content img{
    width: 200px;
    align-self: center;
}

.post-header  img{
    
    width: 3rem;
    border-radius: 50%;
}
.info{
    display: flex;
    flex-direction: column;
}

.userinfo{
    display: flex;
    gap: .7rem;
    font-size: 1.3rem;
    align-items: center;

}
.userinfo a{
    text-decoration: none;
    color: black;
}

.displayname{
    font-weight: bold;
}


</style>