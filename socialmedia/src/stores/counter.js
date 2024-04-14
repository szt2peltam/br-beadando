import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('User',  {
  state: () => ({
    id: 0,
    username: '',
    password: '',
    displayname: '',
    email : ''
  })
  ,persist: {
    storage: localStorage
  }

})
