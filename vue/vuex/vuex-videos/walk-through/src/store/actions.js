export default {
    // We can put asynchronous code inside actions.
    // register(context, userId) {
    //   setTimeout(() => {
    //     context.commit("register", userId)
    //   }, 1000)
    // }

    // We can put asynchronous code inside actions.
    // OBSERVATION: With the delay in register, clicking the "Register" button multiple times results in
    //              the same user being added to the registerd users multiple times.

    //              This is probably not a problem with vuex but rather a fault of the implementation, i.e. it should
    //              include a check for a user having already been registered.

    // We don't actually need the whole context object.
    register({ commit }, userId) {
      setTimeout(() => {
        commit("register", userId)
      }, 1000)
    },
    unregister({ commit }, payload) {
      commit("unregister", payload)
    }
}