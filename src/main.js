import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import store from './store/index.js'    
import * as Vue from 'vue' // in Vue 3
import axios from 'axios'
import VueAxios from 'vue-axios'
import LitepieDatepicker from 'litepie-datepicker';


const app = createApp(App)

app.use(LitepieDatepicker);
app.use(store)
app.use(router)
app.use(VueAxios, axios)
app.mount('#app')
