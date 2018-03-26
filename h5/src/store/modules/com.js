// created by henryLung on 2018/3/15

import * as type from '../type'
import router from '../../router/index'

const state = {
    headerCon: {
        showLeft: false,
        title: '',
        back: function() {
           
        }
    },
    user:{},
    policeCode: ''
}
const getters = {
    headerCon: state => state.headerCon,
    user: state => state.user,
    policeCode: state => state.policeCode
}
const mutations = {
    [type.HEADER_CONF](state, config) {
        state.headerCon.showLeft = config.showLeft;
        state.headerCon.title = config.title;
        state.headerCon.back = config.back;
    },
    [type.GETUSERINFO](state, user) {
        state.user = user;
    },
    [type.GETPOLICECODE](state, code) {
        state.policeCode = code;
    }
}

export default {
    state,
    getters,
    mutations
}