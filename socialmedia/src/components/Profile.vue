<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Post from './Post.vue';
import { useUserStore } from '@/stores/counter';
import axios from 'axios';
import router from '@/router';
const route = useRoute();
const store = useUserStore();
const user = ref({});
const posts = ref([]);
const likes = ref(0);
const postLikesOrReplies = ref([]);
const postsLikedOrReplied= ref([]);
const followers = ref([]);
const followEl = ref(null);
const followText = ref('Follow');
async function Follow() {
    if (followEl.value.name === 'radio-button-off-outline') {
        followEl.value.name = 'radio-button-on';
        followText.value = 'Unfollow';
        await axios.post(`http://localhost:3000/subscriptions`, {
            userid: route.params.id,
            subscriberid: store.id
            ,date : new Date().toLocaleString()
        })
    }else{
        followEl.value.name = 'radio-button-off-outline';
        followText.value = 'Follow';
        let fetch = await axios.get(`http://localhost:3000/subscriptions`);
        const sub = fetch.data.find(sub => sub.userid === route.params.id && sub.subscriberid === store.id);
        await axios.delete(`http://localhost:3000/subscriptions/${sub.id}`)
    }
}
onMounted(async() => {
    let fetch = await axios.get(`http://localhost:3000/users/${route.params.id}`);
    user.value = fetch.data
    let fetch2 = await axios.get(`http://localhost:3000/posts`);
    posts.value = fetch2.data.filter(post => post.authorId === route.params.id)
    let fetch3 = await axios.get(`http://localhost:3000/postlikes`);
    postLikesOrReplies.value = fetch3.data.filter(like => like.userid === route.params.id)
    
    likes.value = fetch3.data.filter(like => like.authorId === route.params.id).length;
    let fetch4 = await axios.get(`http://localhost:3000/replylikes`);
    postLikesOrReplies.value = postLikesOrReplies.value.concat(fetch4.data.filter(like => like.likerid === route.params.id))
    postLikesOrReplies.value = postLikesOrReplies.value.filter((v,i,a)=>a.findIndex(v2=>(v2.postid===v.postid))===i)
    likes.value += fetch4.data.filter(like => like.authorid === route.params.id).length;
    postsLikedOrReplied.value = fetch2.data.filter(post => postLikesOrReplies.value.some(like => like.postid === post.id))
    let fetch5 = await axios.get(`http://localhost:3000/subscriptions`);
    followers.value = fetch5.data.filter(sub => sub.userid === route.params.id)
    if (followers.value.some(sub => sub.subscriberid === store.id)) {
        followEl.value.name = 'radio-button-on';
        followText.value = 'Unfollow';
    }
        
    
})
</script>
<template>
    <div class="profile-wrapper">
        <div class="profile">
            <div class="thumbnail">
            </div>
            <div class="back" @click="router.back()">
                <ion-icon name="chevron-back-outline" ></ion-icon>
            </div>
            <div class="options">
                <ion-icon name="ellipsis-horizontal"></ion-icon>
            </div>
            <div class="border">
                <div class="userimg">
                </div>
            </div>
            <div class="metrics">
                <div class="post-count">{{posts.length}} posts</div>
                <ion-icon name="ellipse" class="grey dot"></ion-icon>
                <div class="like-count"> {{likes}} likes</div>
                <ion-icon name="ellipse" class="grey dot"></ion-icon>
                <div class="follower-count">{{followers.length}} followers</div>
            </div>
            <div class="userinfo">
                <div class="names">
                    <div class="dpname">{{user.displayname}}</div>
                    <div class="username grey">{{user.username}}</div>
                </div>
                <div class="bio">{{user.bio}}</div>
            </div>
            <div class="follow" v-if="route.params.id !== store.id">
                <button @click="Follow" ><ion-icon name="radio-button-off-outline" ref="followEl"></ion-icon>{{followText}}</button>
            </div>
            <div class="media">
                <div class="title">Media</div>
                <div class="pictures">
                    <img src="../assets/img/noimage.png" alt="image">
                    <img src="../assets/img/noimage.png" alt="image">
                    <img src="../assets/img/noimage.png" alt="image">
                    <img src="../assets/img/noimage.png" alt="image">
                    <img src="../assets/img/noimage.png" alt="image">
                    <img src="../assets/img/noimage.png" alt="image">
                    <img src="../assets/img/noimage.png" alt="image">
                    <img src="../assets/img/noimage.png" alt="image">
                    <img src="../assets/img/noimage.png" alt="image">
                    <img src="../assets/img/noimage.png" alt="image">
                    <img src="../assets/img/noimage.png" alt="image">
                    <img src="../assets/img/noimage.png" alt="image">
                    <img src="../assets/img/noimage.png" alt="image">
                    <img src="../assets/img/noimage.png" alt="image">
                    <img src="../assets/img/noimage.png" alt="image">
                    <img src="../assets/img/noimage.png" alt="image">
                    <img src="../assets/img/noimage.png" alt="image">
                    <img src="../assets/img/noimage.png" alt="image">
                    <img src="../assets/img/noimage.png" alt="image">
                    <img src="../assets/img/noimage.png" alt="image">
                    <img src="../assets/img/noimage.png" alt="image">
                </div>
            </div>

        </div>
        <div class="post-wrapper">
            <div class="posts">
                <div class="post-title">Posts</div>
                <div class="post-list">
                        <Post v-for="post in posts" :post="post" :showBorder="true"/>
                </div>
            </div>
        </div>

        <div class="liked-or-replied-wrapper">
            <div class="liked-or-replied">
                <div class="post-title">Posts {{ user.displayname }} liked or replied to</div>
                <div class="post-list">
                        <Post v-for="post in postsLikedOrReplied" :post="post" :showBorder="true"/>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.liked-or-replied{
    width: 80%;
    background-color: #fff;
    margin-bottom: 2rem;
}
.liked-or-replied-wrapper{
    display: flex;
    justify-content: center;
    background-color: #fff;
    
}
.post-title{
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 2rem;
}
.post-list{
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
.post-border{
    border: 2px solid #bcbcbc;
}
.post-wrapper{
    padding-top: 1rem;
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    background-color: #fff;
}
.posts{
    display: flex;
    flex-direction: column;
    width: 80%;
    margin-top: 1rem;
    margin-bottom: 3rem;
}
.pictures{
    display: flex;
    width: 100%;
    overflow-x: scroll;
    gap: .8rem;
}
.pictures > img{
    width: 8rem;
    background-color: red;
    border-radius: 20px;
}

.media{
    width: 80%;
    display: flex;
    margin-top: 3rem;
    flex-direction: column;
    gap: 1rem;
}
.follow{
    display: flex;
    width: 80%;
    justify-content: center;
    margin-top: 2rem;
}
.follow > button{   
    border : none;
    background-color: #121212;
    width: 95%;
    height: 3rem;
    color: #fff;    
    border-radius: 8px;
    display: flex;
    align-items: center;
    padding-left: 2rem;
    font-size: 1.3rem;
    font-weight: 600;
    letter-spacing: .06rem;
    gap: .5rem;
    transition: background-color .2s cubic-bezier(.17,.67,.28,.66);
    cursor: pointer;
}

.follow > button:hover{
    background-color: #00A4FF;
}
.title{
    font-weight: 600;
    font-size: 1.5rem;
    
}
.names{
    display: flex;
    flex-direction: column;
    gap: .1rem;
}
.username{
    font-size: 1.5rem;
    font-weight: 600;
}
.dpname{
    font-weight: 600;
    font-size: 2.5rem;
}
.userinfo{
    width: 80%;
    background-color: #fff;
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
    .profile-wrapper{
        display: flex;
        flex-direction: column;
    }
    .metrics{
        background-color: #fff;
        height: 3rem;
        display: flex;
        align-items: center;
        gap: .5rem;
        width: 75%;
        font-weight: 600;
        justify-content: flex-end;
    }
    .dot{
        font-size: .5rem
    }
    .border{
        background: rgb(255,255,255);
        background: radial-gradient(circle, rgba(255,255,255,1) 47%, rgba(0,164,255,1) 100%);
        border-radius: 50%;
        width: calc(5rem + .5rem);
        height: calc(5rem + .5rem);
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        align-self: flex-start;
        left: 15%;
        top: 26.5%;

    }
    .thumbnail{
        width: 80%;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        height: 300px;
        background-image: url('../assets/img/userplaceholder.jpg');
    }
    .userimg{
        background-image: url('../assets/img/userplaceholder.jpg');
        height: 5rem;
        width: 5rem;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        border-radius: 50%;
        border: 1px solid linear-gradient(90deg, rgba(255,255,255,1) 47%, rgba(0,164,255,1) 100%);

    }
    .thumbnail > img{        
    }
    .profile{
        background-color: #fff;
        width: 100%;
        display: flex;

        align-items: center;
        flex-direction: column;
        }
        .back{
            background-color: #fff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 3px;
            font-size: 2rem;
            position: absolute;
            left: 15%;
            top: 1rem;
            align-self: start;
            cursor : pointer;
        }

        .options{
            background-color: #fff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 3px;
            font-size: 2rem;
            position: absolute;
            right: 15%;
            top: 1rem;
            align-self: start;
            cursor : pointer;
        }
</style>