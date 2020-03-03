<template>
  <div class="home">
    <component :is="currentComponent"></component>
  </div>
</template>

<script>
// @ is an alias to /src
import loginForm from './LoginForm.vue'
// import chat from './Chat.vue' 

export default {
  name: 'Home',
  data() {
    return {
      error: null,
      tempName: null,
      users: {},
    }
  },
  computed: {
    currentComponent() {
      return this.$store.getters.currentComponent
    }
  },
  components: {
    loginForm,
    chat: () => import('./Chat.vue') //async component
  },
}
</script>
