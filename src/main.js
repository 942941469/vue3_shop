import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import 'element-plus/dist/index.css'
import { directiveTime } from '@/utils/hook/time'
const app = createApp(App)
directiveTime(app)
app.use(store).use(router).mount('#app')
