import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Moment from 'moment'

import App from './App.vue'
import router from './router'
import Axios from 'axios'

const pinia = createPinia()
const app = createApp(App)

app.config.globalProperties.$http = Axios
app.config.globalProperties.$changeTime = time=>Moment(time).startOf('minute').fromNow().replace(/hours?/, '小时').replace('ago', '前').replace(/days?/, '天').replace(/minutes?/, '分钟').replace(/\ban?/, '1').replace(/months?/, '个月').replace(/\byears?/, '年').replace(/\s/g, '').replace('fewseconds','分钟');

app.use(pinia)
app.use(router)

app.mount('#app')
