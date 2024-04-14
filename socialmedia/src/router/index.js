import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Signup from '@/components/Signup.vue'
import Feed from '@/components/Feed.vue'
import Profile from '@/components/Profile.vue'
import MainView from '@/views/MainView.vue'
import Replies from '@/components/Replies.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/feed',
      name: 'feed',
      component: MainView,
      children: [
        {
          path: '/feed/profile/:id',
          name: 'profile',
          component: Profile
        },
        {
          path: '/feed',
          name: 'main',
          component: Feed
        },
        {
          path: '/feed/:id',
          name: 'post',
          component: Replies,
          props: true
        }
      ]
    }
  ]
})

export default router
