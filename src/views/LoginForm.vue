<template>
  <vue100vh class="main" :css="{height: '100rvh'}">
    <vue100vh class="overlay" :css="{minHeight: '30rvh'}"></vue100vh>
    <div class="content">
      <div class="techno">
        <img src="../assets/logo.png" alt="VueJS">
        Réalisé avec Vue.js
      </div>

      <img class="logo" alt="DevJulia Logo" src="../assets/logo.svg">

      <div class="text-center">
        <p class="text-grey">Vous avez été invité à rejoindre</p>
        <p class="text-big">Découvrez la développeuse Julia Nguyen</p>
      </div>

      <form 
        id="usernameForm"
        autocomplete="off"
        @submit.prevent="checkForm">
        <label for="username">Nom d'utilisateur</label>
        <input 
            type="text" 
            id="username"
            v-model="tempName"
            @keyup="enableForm"
             />
        <p class="error" v-if="error">
          {{ error }}
        </p>
        <input 
          :disabled="!formIsActive"
          class="button" 
          type="submit" 
          value="Accéder au chat">
      </form>
    </div>
  </vue100vh>
</template>

<script>
// @ is an alias to /src
import { db } from '@/db'
import firebase from 'firebase/app'
import 'firebase/auth'
import vue100vh from 'vue-100vh'

export default {
  data() {
    return {
      error: null,
      tempName: null,
      formIsActive: false,
    }
  },
  components: {
    vue100vh,
  },
  methods: {
    enableForm(e) {
      if (e.target.value != '')
        this.formIsActive = true;
      else
        this.formIsActive = false;
    },
    checkForm() {
      if (!this.tempName) {
        this.error = 'Oh non quel est votre nom?';
        return;
      }

      //Check special characters
      if (!this.tempName.match(/^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s-]{3,30}$/)) {
        this.error = "Veuillez saisir un nom d'utilisateur de 3 à 30 caractères sans caractères spéciaux.";
        return;
      }

      this.error = null;

      //Add user in database
      firebase.auth().signInAnonymously().then(
        (response) => {
          db.ref('users/' + response.user.uid).update({
            name: this.tempName,
          });

          //Change component and load chat
          this.$store.dispatch('changeCurrentComponent', 'chat');
        },
        (err) => {
          alert(err);
        }
      );
    }
  },
}
</script>

<style lang="scss" scoped>
img.logo {
  width: 70%;
  max-width: 300px;
  margin-top: 40px;
  margin-right: auto;
  margin-left: auto;
}

.techno {
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  padding: 5px;
  font-size: 1.3rem;
  opacity: 0.8;

  img {
    height: 20px;
    margin-right: 5px;
    opacity: 0.8;
  }
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 0 20px 40px 20px;
}

.overlay {
  background: #F34213;
  position: fixed;
  left: 0;
  width: 100%;
  opacity: 0.7;
  clip-path: polygon(0 80px, 0 0, 100% 0, 100% 100%);
}

label,
input[type=text] {
  text-align: left;
}

label {
  color: #D2D2D2;
  display: block;
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: 2.5px;
}

input[type=text] {
  background: transparent;
  color: #F0EDEE;
  display: block;
  height: 40px;
  border-bottom: 1px solid #F0EDEE;
  width: 100%;
  padding: 0 20px;
  transition: background 0.25s;

  &:focus {
    background: rgba(255,255,255,0.3);
  }
}

input[type=submit] {
  cursor: pointer;
  margin-top: 50px;
  width: 100%;
  transition: opacity 0.25s;

  &:disabled {
    opacity: 0.5; 
  }
}

form {
  position: relative;

  .error {
    color: #ce1010;
    text-align: left;
    font-size: 1.2rem;
    position: absolute;
  }
}

</style>