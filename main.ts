/*
 * @Descripttion: 
 * @version: 
 * @Author: lcx
 * @LastEditors: lcx
 */
import { createApp } from "@vue/runtime-dom";
import Vant from 'vant';
import 'vant/lib/index.css';
import App from './src/App'
import { router } from "./src/router";

const app = createApp(App)
app.use(Vant);
app.use(router);
app.mount('#app');