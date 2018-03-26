// created by HenryLung on 2018/3/19

import * as type from '../type'

const state = {
    person: {
        imgUrl: '',
        magicId: '',
        identityNum: ''
    }
}
const getters = {
    person: state => state.person
}
const mutations = {
    [type.REGISTER](state, person) {
        state.person = Object.assign(state.person,person);
        // state.person.imgUrl = person.imgUrl;
        // state.person.magicId = person.magicId;
        // state.person.identityNum = person.identityNum;
    }
}

export default {
    state,
    getters,
    mutations
}