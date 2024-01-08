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
// import { localize,setLocale } from '@vee-validate/i18n';
// import { localize } from '@vee-validate/i18n';
// import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

configure({
  // generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true,
});
// setLocale('zh_TW')

// Yup-locales
import { zhtw } from 'yup-locales';
import { setLocale } from 'yup';
setLocale(zhtw);
// console.dir(setLocale)

// CKEditor
import CKEditor from '@ckeditor/ckeditor5-vue'



// 註冊
const app = createApp(App)
app.use(createPinia())
  .use(router)
  .use(VueAxios, axios)
  .use(CKEditor)
  .component('VForm', Form)
  .component('VField', Field)
  .component('ErrorMessage', ErrorMessage)
  .mount('#app')
