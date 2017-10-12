import Vue from "vue"
import Vuex from "vuex"

import actions from "./actions"       // . is relative to current file.
import getters from "./getters"
import mutations from "./mutations"

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
  getters,
  mutations,
  actions

  // In 5th he split the store up into separate files.
});
