import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/pages/home.vue';
import Register from '../components/pages/register.vue';
import Record from '../components/pages/record.vue';
import Approval from '../components/pages/approval';
import Compare from '../components/pages/compare';
import Form from '../components/pages/form';
import Success from '../components/pages/success';
import App from '../App';
import store from '../store/index';
import axios from '../api/http';

Vue.use(Router)

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('user') || window.localStorage.getItem('policeCode')) {
  let user = localStorage.getItem('user');
  store.commit('GETUSERINFO', JSON.parse(user));
  store.commit('GETPOLICECODE', window.localStorage.getItem('policeCode'))
}
// 进区原由字段
var entryReasonArr = [];
axios.get('enter/reason').then((response) => {
  entryReasonArr = response.data.data;
  Vue.filter('enterReson', function (value) {
    let text = '';
    for (let i = 0; i < entryReasonArr.length; i++) {
      if (value == entryReasonArr[i].fieldCode) {
        text = entryReasonArr[i].fieldValue;
      }
    }
    return text;
  })
})

const router = new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: Home
  }, {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/record',
    name: 'record',
    component: Record
  },
  {
    path: '/approval',
    name: 'approval',
    component: Approval
  }, {
    path: '/compare',
    name: 'compare',
    component: Compare
  },
  {
    path: '/form',
    name: 'form',
    component: Form
  }, {
    path: '/success',
    name: 'success',
    component: Success
  }
  ]
})
export default router;