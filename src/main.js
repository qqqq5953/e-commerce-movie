import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';
import Loading from 'vue3-loading-overlay';
import { currency, date, toUnixTimeStamp, formatDate } from '@/methods/filters';

// css
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// bootstrap js載入
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// vee-validate
import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate';
import { required, email, length, alpha, numeric } from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

defineRule('required', required);
defineRule('email', email);
defineRule('length', length);
defineRule('alpha', alpha);
defineRule('numeric', numeric);
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true
});
setLocale('zh_TW');

const app = createApp(App);
app.config.globalProperties.$filters = { currency, date, toUnixTimeStamp, formatDate };
app.component('Loading', Loading);
app.component('Form', Form);
app.component('Field', Field);
app.component('ErrorMessage', ErrorMessage);
app.use(VueAxios, axios);
app.use(router);
app.mount('#app');
