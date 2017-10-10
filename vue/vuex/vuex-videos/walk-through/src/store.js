import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    registrations: [],
    users: [
      {id: 1, name: 'Max', registered: false},
      {id: 2, name: 'Anna', registered: false},
      {id: 3, name: 'Chris', registered: false},
      {id: 4, name: 'Sven', registered: false}
    ]
  },
  // 2nd Video.
  getters: {
    unregisteredUsers(state) {
      return state.users.filter(user => !user.registered)
    },
    total(state) {
      return state.registrations.length;
    },
    registrations(state) {
      return state.registrations
    },
    totalRegistrations(state) {
      return state.registrations.length;
    }
  },
  mutations: {
    register(state, userId) {
      const user = state.users.find(user => user.id === userId)
      user.registered = true

      const date = new Date;
      const registration = {userId: user.id, name: user.name, date: date.getMonth() + '/' + date.getDay()};
      state.registrations.push(registration)
    },
    unregister(state, payload) {
      const user = state.users.find(user => user.id === payload.userId)
      user.registered = false
      const registration = state.registrations.find(r => r.userId === payload.userId)
      state.registrations.splice(state.registrations.indexOf(registration), 1);
    }
  }
});
