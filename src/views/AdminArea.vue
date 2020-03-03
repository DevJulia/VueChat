<template>
  <div>
    <h1>Hello Boss</h1>

    <h2>Choisis une conversation</h2>
    
    <ul>
      <li v-for="(user, key) in users" :key="key">
        <router-link :to="{name: 'AdminChat', params: {user: user['.key']}}">
          {{user.name}}
        </router-link>
      </li>
    </ul>

    <button @click="onLogout">Logout</button>
  </div>
</template>

<script>
import { db } from '@/db'

export default {
  data() {
    return {
      users: [],
      email: '',
      password: '',
    }
  },
  computed: {
    adminMode() {
      return this.$store.getters.adminMode
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch('logout');
    }
  },
  firebase: {
    users: db.ref('users')
  }
}
</script>