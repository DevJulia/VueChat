<template>
  <div class="input-text">
    <textarea 
      v-if="!isMobile"
      class="textarea"
      :disabled="isDisabled"
      name="" id="" cols="30" placeholder="Votre message..." 
      @keyup="checkEmpty"
      @keydown.enter.exact.prevent="sendMessage"
      @input="adaptHeight"
      v-model="message"></textarea>

    <textarea 
      v-else
      class="textarea"
      name="" id="" cols="30" placeholder="Votre message..." 
      :disabled="isDisabled"
      @keyup="checkEmpty"
      @input="adaptHeight"
      v-model="message"></textarea>
    <font-awesome-icon icon="paper-plane" @click="sendMessage" />
  </div>
</template>

<script>
import { db } from '@/db'
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  data() {
    return {
      message: null,
      isWriting: false,
    }
  },
  props: ['isDisabled'],
  computed: {
    currentUser() {
      return firebase.auth().currentUser
    },
    elChat() {
      return this.$parent.$refs.chat
    },
    adminMode() {
      return this.$store.getters.adminMode
    },
    isMobile() {
      return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    }
  },
  methods: {
    sendMessage() {
      if (this.isWriting == false)
        return;
      if (this.adminMode) {
        db.ref('conversations/' + this.$route.params.user + '/isWriting').update({
          admin: false,
        });
        db.ref('conversations/' + this.$route.params.user).push({
          text: this.message,
          isAdmin: true,
        });
      } else {
        db.ref('conversations/' + this.currentUser.uid + '/isWriting').update({
          user: false,
        });
        db.ref('conversations/' + this.currentUser.uid)
          .push({
            text: this.message,
          })
          .then(() => {
            //SCROLL TO BOTTOM OF CHAT
            this.elChat.scrollTop = this.elChat.scrollHeight;
          });
      }
      this.message = '';
      this.elChat.style.height = "calc(100vh - 69px - 60px - 1.2rem)";
      this.isWriting = false;
      this.$el.querySelector('.textarea').style.height = '60px';
    },
    checkEmpty(e) {
      if (e.target.value == '') {
        this.isWriting = false;
      } else {
        this.isWriting = true;
      }
    },
    adaptHeight(e) {
      e.target.style.height = "";
      e.target.style.height = e.target.scrollHeight + "px";

      this.elChat.style.height = "calc(100vh - ("+ e.target.style.height + " + 69px + 1.2rem))";
      this.elChat.scrollTop = this.elChat.scrollHeight;
    },
  },
  watch : {
    isWriting: function() {
      if (this.adminMode) {
        if (this.isWriting) {
          db.ref('conversations/' + this.$route.params.user + '/isWriting').update({
            admin : true,
          });
        } else {
          db.ref('conversations/' + this.$route.params.user + '/isWriting').update({
            admin : false,
          });
        }
      } else {
        if (this.isWriting) {
          db.ref('conversations/' + this.currentUser.uid + '/isWriting').update({
            user : true,
          });
        } else {
          db.ref('conversations/' + this.currentUser.uid + '/isWriting').update({
            user : false,
          });
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.input-text {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;

  textarea {
    background: rgba(88,88,88,0.5);
    color: #F0EDEE;
    width: 100%;
    position: relative;
    padding: 10px;
    height: 60px;
    border: 0;
    resize: none;
  }

  .fa-paper-plane {
    position: absolute;
    z-index: 10;
    height: 20px;
    width: 20px;
    top: calc(50% - 10px);
    right: 10px;
  }
}
</style>