<template>
  <vue100vh id="app" :css="{minHeight: '100rvh'}">
    <div class="app-content">
      <div v-if="dev">
        <router-link to="/">Home</router-link> | 
        <router-link to="/bossLogin">Admin</router-link> |
        <router-link to="/bossArea">Admin area</router-link>
      </div>
      <router-view/>
    </div>
  </vue100vh>
</template>

<script>
import { db } from '@/db'
import firebase from 'firebase/app'
import 'firebase/auth'
import vue100vh from 'vue-100vh'

export default {
  data() {
    return {
      conversations: [],
      dev: false,
    }
  },
  components: {
    vue100vh
  },
  computed: {
    currentUser() {
      return firebase.auth().currentUser
    }
  },
  created() {
    window.addEventListener('beforeunload', this.leaving);
  },
  methods: {
    leaving() {
      //Delete anonymous account
      if (firebase.auth().currentUser.isAnonymous) {
        firebase.auth().currentUser.delete();

        //Delete user from DB
        db.ref('users/' + this.currentUser.uid).remove();

        //Delete user's messages from DB
        db.ref('conversations/' + this.currentUser.uid).remove();
      }
    },
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600|Tomorrow&display=swap');
$font-family-text: 'Open Sans', Arial, sans-serif;
$font-family-title: 'Tomorrow', Helvetica, Arial, sans-serif;

html {
  font-size: 62.5%;
}

body {
  margin: 0;
  font-size: 1.5rem;
  position: relative;
}

#app {
  font-family: $font-family-text;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #011627;
  color: #F0EDEE;
}

* {
  box-sizing: border-box;
}

textarea:focus,
input:focus,
button:focus {
  outline: none;
}

a {
  color: #F0EDEE;
}

p {
  margin: 0.5em 0;
}

h1 {
  margin: 0;
}

input[type=text],
button,
input[type=submit] {
  border: none;
}

input,
textarea,
select,
button {
  font-family: $font-family-text;
  font-size: 1.5rem;
}

.text-grey {
  color: #B5B5B5;
}

.text-big {
  font-size: 1.7rem;
}

.text-center {
  text-align: center;
}

.button {
  background-color: #F34213;
  border-radius: 9px;
  color: #F0EDEE;
  padding: 15px 30px;
}

</style>
