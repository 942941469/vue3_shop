import { createStore } from 'vuex'
import login from './modules/login'
import user from './modules/user'
import rights from './modules/right'
export default createStore({
  modules: { login, user, rights }
})
