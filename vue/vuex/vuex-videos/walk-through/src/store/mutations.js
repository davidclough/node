export default {
    // Video 4: We should not mutate state using asynchronous code. Therefore introduced actions.

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
