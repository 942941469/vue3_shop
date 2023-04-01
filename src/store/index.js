import { createStore } from 'vuex'
import login from './modules/login'
import user from './modules/user'
import rights from './modules/right'
import roles from './modules/roles'
import goods from './modules/goods'
export default createStore({
  modules: { login, user, rights, roles, goods }
})
