import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth'
import router from '../router'
import { db } from '@/db'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentComponent: 'loginForm', //default component
    idToken: null,
    userId: null,
  },
  getters : {
    currentComponent: state => {
      return state.currentComponent
    },
    adminMode: state => {
      return state.idToken !== null
    },
  },
  mutations: {
    'CHANGE_CURRENT_COMPONENT' (state, component) {
      state.currentComponent = component;
    },
    'AUTH_USER' (state, userData) {
      state.idToken = userData.token;
      state.userId = userData.userId;
    },
    'CLEAR_AUTH_DATA' (state) {
      state.idToken = null;
      state.userId = null;
    }
  },
  actions: {
    changeCurrentComponent: ({commit}, component) => {
      commit('CHANGE_CURRENT_COMPONENT', component)
    },
    login: ({commit}, payload) => {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(
        (response) => {
          // localStorage.setItem('token', response.user.ma);
          db.ref('options/').update({adminConnected: true});
          commit('AUTH_USER', {token: response.user.ma, userId: response.user.uid});
          router.replace('bossArea');
        },
        (err) => {
          alert(err);
        }
      );
    },
    logout: ({commit}) => {
      db.ref('options/').update({adminConnected: false});
      firebase.auth().signOut();
      commit('CLEAR_AUTH_DATA');
      router.replace('bossLogin');
    }
  },
})
