import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './plugins/router'

// 初始化样式
import './styles/reset.css'
// 引入tdesign少量样式
import 'tdesign-vue-next/es/style/index.css';


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
