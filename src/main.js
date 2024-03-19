// Bootstrap
import 'bootstrap';
import './assets/scss/all.scss';

// Vue, Pinia, Router
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Axios
import axios from 'axios'
import VueAxios from 'vue-axios'

// Vee Validate
import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate';
import * as AllRules from '@vee-validate/rules';

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});

// Vee Validate-i18n
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

// 設定 vee validation 全域規則
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: false, // 輸入時，是否需同時執行驗證
});
setLocale('zh_TW'); // 設定預設語系

// Yup-locales
// import { zhtw } from 'yup-locales';
// import { setLocale } from 'yup';
// setLocale(zhtw);
// console.dir(setLocale)

// CKEditor
import CKEditor from '@ckeditor/ckeditor5-vue'

// Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(fas, fab, far);

// 註冊
const app = createApp(App)
app.use(createPinia())
  .use(router)
  .use(VueAxios, axios)
  .use(CKEditor)
  .component('VForm', Form)
  .component('VField', Field)
  .component('ErrorMessage', ErrorMessage)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount('#app')
