<script setup>
import { onMounted,ref } from 'vue';
import { useRoute } from 'vue-router';
import Reply from './Reply.vue';
import axios from 'axios';
import { useToast } from 'vue-toast-notification';
const route = useRoute();
const post = ref({});
let user = ref({});
let replies = ref([]);
const toast = useToast();
const replyinpt = ref("");
const inputelRef = ref(null);
onMounted(async () => {
    let fetch = await axios.get(`http://localhost:3000/posts/${route.params.id}`);
    post.value = fetch.data
    let fetch2 = await axios.get(`http://localhost:3000/users/${post.value.authorId}`);
    user.value = fetch2.data
    let fetch3 = await axios.get(`http://localhost:3000/replies`);
    replies.value = fetch3.data.filter(reply => reply.postId === route.params.id)
    replies.value = replies.value.sort((a,b)=> new Date(b.date) - new Date(a.date))

})
const placeholder = ref("Write a reply...")
async function WatchIfSent(e) {
    if (e.key === "Enter") {
        if (replyinpt.value.trim()) {
            await axios.post(`http://localhost:3000/replies`, {
                content: replyinpt.value.trim(),
                postId: route.params.id,
                authorId: user.value.id,
                likes: [],
                date: new Date().toLocaleString()
            })
            let fetch3 = await axios.get(`http://localhost:3000/replies`);
            replies.value = fetch3.data.filter(reply => reply.postId === route.params.id)
            replies.value = replies.value.sort((a,b)=> new Date(b.date) - new Date(a.date))

            toast.success("Reply sent!", {duration: 5000})
            replyinpt.value = ""
            inputelRef.value.blur()
            inputelRef.value.disabled = true
            placeholder.value = "Disabled for 5s..."
            setTimeout(() => {
                inputelRef.value.disabled = false
                
                placeholder.value = "Write a reply..."
            },5000)
        }
        else {
            toast.error("Reply can't be empty!", {duration: 5000})
        }
    }
}
        
    

</script>
<template>

<div class="post-wrapper">
    <div class="post">
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
    
        </div>
        <div class="reply-input">
            <input type="text" :placeholder="placeholder" v-model="replyinpt" ref="inputelRef" @keydown="WatchIfSent">
        </div>
        <div class="replies-wrapper">
            <div class="replies">
                <Reply v-for="reply in replies" :reply="reply" :key="reply.id" v-if="replies" />
                
                <h3 v-else>No replies</h3>
            </div>
        </div>
</div>


</template>
<style scoped>
.reply-input{
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
}

input{
    width: 60%;
    height: 3rem;
    font-size: 1.3rem;
    padding: 1rem;
    border :none;
    border-radius: 10px;
}
input:focus{
    outline: 3px solid #00A4FF;
}
    .replies-wrapper{
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: center;
        margin-top: 1rem;
    }
    .replies{
        display: flex;
        min-height: 30px;
        flex-direction: column;
        gap: 1rem;
        width: 60%;
        justify-content: center;
        align-items: center;
    }
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
.post-wrapper{
    display: flex;
    flex-direction: column;
    margin-top: 3rem;
    align-items: center;
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

.post{
    background-color: #fff;
    width: 60%;
    min-height: 20rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 10px;
    padding-bottom: 2rem;
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

.grey{
    color: #bcbcbc;
}


</style>