import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import router from './router/index'
import App from './App'
import axios from './api/http'
import store from './store/index'
import vuePicturePreview from 'vue-picture-preview'
import { Button, Toast } from 'mint-ui';

Vue.use(MintUI)
Vue.use(vuePicturePreview)
Vue.config.productionTip = false


Vue.prototype.axios = axios;
/* eslint-disable no-new */
//自定义指令
Vue.directive('lfcous', {
  bind(el,binding) {
    let oInput = el.querySelector('input');
    oInput.onclick = function () {
      binding.value();
      document.activeElement.blur();
    };
  }
});

Vue.directive('lfblur', {
  bind(el, binding) {
    let oInput = el.querySelector('input');
    oInput.onblur = function () {
      let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (reg.test(oInput.value) == true) {
        binding.value(oInput.value);
      }else{
        Toast({
          message: '请输入正确身份证号码'
        });
      }
    };
  }
});

const app = new Vue({
  el: '#app',
  router,
  axios,
  store,
  render: h => h(App)
}).$mount('#app')
