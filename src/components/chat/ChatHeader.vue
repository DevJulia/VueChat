<template>
  <div>
    <div v-if="adminMode" class="adminMenu">
      <router-link to="/bossArea">Liste des chats</router-link>
    </div>
    <div class="header" :class="{online: options.adminConnected}">
      <div class="user-avatar">
        <img src="../../assets/julia.jpg" alt="Julia profile">
      </div>
      <div class="user-info">
        Julia
        <div class="status">
          <span v-if="options.adminConnected">En ligne</span><span v-else>Hors ligne</span>
        </div>
      </div>
      <div class="user-actions">
        <font-awesome-icon class="action" icon="phone" @click="showModal('phone')"/>
        <font-awesome-icon class="action" icon="envelope" @click="showModal('email')"/>
      </div>
    </div>

    <modal name="phone" :adaptive="true" width="80%" height="auto">
      <button class="close" @click="$modal.hide('phone')">
        ❌
      </button>
      <div class="content">
        0751245610
      </div>
      <div class="footer">
        <button class="element" @click="copy('phone')">Copier</button>
        <a class="element" href="tel:+33751245610" target="_blank">Appeler</a>
      </div>
    </modal>

    <modal name="email" :adaptive="true" width="80%" height="auto">
      <button class="close" @click="$modal.hide('email')">
        ❌
      </button>
      <div class="content">
        hello[at]dev-julia.com
      </div>
      <div class="footer">
        <button class="element" @click="copy('email')">Copier</button>
        <a class="element" target="_blank" href="mailto:hello@dev-julia.com">Ecrire</a>
      </div>
    </modal>
  </div>
</template>

<script>
import { db } from '@/db'

export default {
  data() {
    return {
      options: {},
    }
  },
  methods: {
    showModal(name) {
      this.$modal.show(name);
    },
    copy(name) {
      if (name == 'phone') {
        navigator.clipboard.writeText("0751245610");
        this.$modal.hide('phone');
      } else {
        navigator.clipboard.writeText("hello@dev-julia.com");
        this.$modal.hide('email');
      }
    }
  },
  computed: {
    adminMode() {
      return this.$store.getters.adminMode
    },
  },
  firebase: {
    options: db.ref('options')
  }
}
</script>

<style lang="scss" scoped>
.adminMenu {
  position: fixed;
  top: 0;
  left: 200px;
}

.header {
  background: #0A090C;
  padding: 10px;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 20px 3px rgba(243,66,19,0.3);

  .user-avatar {
    margin-right: 20px;
    position: relative;
    border-radius: 50%;
    border: 2px solid #A51313;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      border-radius: 50%;
      height: 45px;
      width: 45px;
      border: 3px solid #011627;
      object-fit: cover;
    }
  }

  .user-info {
    font-weight: bold;

    .status {
      font-weight: 300;
      font-size: 1.2rem;
      margin-top: 2px;

      &::before {
        content: '';
        display: inline-block;
        height: 7px;
        width: 7px;
        border-radius: 50%;
        background: #A51313;
        margin-right: 6px;
      }
    }
  }

  &.online {
    .user-avatar {
      border: 2px solid #43B581;
    }

    .user-info .status:before {
      background: #43B581;
    }
  }

  .user-actions {
    position: absolute;
    right: 10px;

    .action {
      cursor: pointer;
    }

    .svg-inline--fa {
      color: #F0EDEE;
      width: 20px;
      height: 20px;

      &:first-child {
        margin-right: 20px;
      }
    }
  }
}
</style>

<style lang="scss">
.v--modal {
  color: #011627;
  background-color: rgba(255,255,255,0.9);
  text-align: center;

  a {
    color: #011627;
    text-decoration: none;
  }

  .content {
    padding: 20px;
    font-weight: bold;
    font-size: 1.8rem;
  }

  button.close {
    position: absolute;
    top: 3px;
    right: 0;
    cursor: pointer;
    opacity: 0.7;
    mix-blend-mode: luminosity;
  }

  .footer {
    display: flex;

    .element {
      flex-basis: 100%;
      background-color: rgba(211,211,211,0.9);
      cursor: pointer;
      padding: 7px;

      &:first-child {
        border-right: 1px solid gray;
      }
    }
  }
}

button {
  background: none;
}
</style>