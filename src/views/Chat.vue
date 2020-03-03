<template>
  <div>
    <chat-header/>

    <div class="chat" id="app-chat" ref="chat">
      
      <div class="message-ct -received" v-if="!options.adminConnected">
        <div class="message">Bonjour, je ne suis pas connectée pour le moment. Revenez plus tard ou contactez-moi avec les boutons ci-dessus 🙂</div>
      </div>

      <transition-group
          name="custom-classes-transition"
          tag="div"
          enter-active-class="animated fadeIn"
          :duration="300"
        >
        <div 
          class="message-ct" 
          :class="[((message.isAdmin && adminMode) || (!adminMode && !message.isAdmin))  ? '-send' : '-received']"
          v-for="(message,key) in conversations" :key="key + 0">
          <div class="message" v-if="key !== 'isWriting'">
            {{message.text}}
          </div>
        </div>
      </transition-group>
    </div>

    <chat-is-writing v-if="Object.keys(conversations).length && conversations.isWriting.admin && !adminMode">
      Julia est en train d'écrire
    </chat-is-writing>

    <chat-is-writing v-if="Object.keys(conversations).length && conversations.isWriting.user && adminMode">
      L'utilisateur est en train d'écrire
    </chat-is-writing>

    <chat-textarea :is-disabled="!options.adminConnected"/>
  </div>
</template>

<script>
import { db } from '@/db'
import firebase from 'firebase/app'
import 'firebase/auth'
import ChatHeader from '@/components/chat/ChatHeader'
import ChatTextarea from '@/components/chat/ChatTextarea'
import ChatIsWriting from '@/components/chat/ChatIsWriting'

const conversations = db.ref('conversations');
const users = db.ref('users');

export default {
  data() {
    return {
      conversations: {},
      isWriting: false,
      userName: {},
      mo: {},
      options: {},
    }
  },
  components: {
    ChatHeader,
    ChatTextarea,
    ChatIsWriting,
  },
  computed: {
    currentUser() {
      return firebase.auth().currentUser
    },
    adminMode() {
      return this.$store.getters.adminMode
    },
  },
  methods: {
    scrollToBottom() {
      this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight;
    }
  },
  created: function() {
    if (this.adminMode) {
      this.$rtdbBind('conversations', conversations.child(this.$route.params.user))
    } else {
      this.$rtdbBind('conversations', conversations.child(this.currentUser.uid));
      this.$rtdbBind('userName', users.child(this.currentUser.uid));
    }
  },
  mounted() {
    let vm = this;

    this.mo = new MutationObserver(() => {
      vm.scrollToBottom();
    });

    this.mo.observe(document.body, {
      childList: true,
      subtree: true
    });
  },
  firebase: {
    options: db.ref('options')
  }
}
</script>

<style lang="scss" scoped>
.chat {
  height: calc(100vh - 69px - 60px - 1.2rem);
  overflow-y: auto;
  padding: 20px 20px 0 20px;

  .message-ct {
    .message {
      border-radius: 1rem;
      padding: .5rem 1rem;
      margin-bottom: 1.5rem;
      display: inline-block;
      max-width: 85%;
      word-break: break-word;
      white-space: pre-line;
    }

    &.-received {
      .message {
        background: #2D67FF;
      }
    }

    &.-send {
      display: flex;
      justify-content: flex-end;

      .message {
        background: #F4F4F4;
        color: #555;
      }
    }
  }
}
</style>