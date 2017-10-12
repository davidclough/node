import Vue from "vue"
import Vuex from "vuex"

import state from "./state"       // . is relative to current file.
import actions from "./actions"
import getters from "./getters"
import mutations from "./mutations"

Vue.use(Vuex)

export const store = new Vuex.Store({
  state,
  
  // 2nd Video.
  getters,
  mutations,
  actions

  // In 5th he split the store up into separate files.
});
