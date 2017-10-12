export default {
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
}
