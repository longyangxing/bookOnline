/**
 * 登陆状态guan
 * create by sun on 2018/3/14
 */

import * as type from '../type'

const state =  {
    user: { },
    token: null,
    title: ''
},

const mutations =  {
    [types.LOGIN]: (state, data) => {
        localStorage.token = data;
        state.token = data;
    },
    [types.LOGOUT]: (state) => {
        localStorage.removeItem('token');
        state.token = null
    },
    [types.TITLE]: (state, data) => {
        state.title = data;
    }
}

export default {
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
}