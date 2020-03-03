<template>
  <div>
    <h1>Hello Boss</h1>

    Admin mode: {{ adminMode }}
    <hr/>

    <input type="email" v-model="email" placeholder="email" /><br />
    <input type="password" v-model="password" placeholder="password" />
    <button @click="submit">Login</button>

    <hr />
  </div>
</template>

<script>
export default {
  data() {
    return {
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
    submit() {
      const formData = {
        email: this.email,
        password: this.password,
      };

      this.$store.dispatch('login', {email: formData.email, password: formData.password});
    },
  },
}
</script>