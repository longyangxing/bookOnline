import Vue from 'vue';
import Vuex from 'vuex';
import com from './modules/com'
import register from './modules/register'

Vue.use(Vuex)

const stores = new Vuex.Store({
    modules: {
        com,
        register
    },
    strict: process.env.NODE_ENV !== 'production'
})

export default stores;