<template>
  <div id="app">
      <com-header></com-header>
      <router-view>
      </router-view>
      <lg-preview></lg-preview>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import { Toast, Field, Button   } from 'mint-ui';
import Header from './components/common/Header';
import './config'

export default {
  name: 'App',
  created(){
     this.$store.commit('HEADER_CONF',{ showLeft:false, title: '办案中心精细化' })
  },
  computed: mapGetters({
    com : 'headerCon'
  }),
  components:{
    comHeader : Header
  },
}
</script>

<style lang="scss">
    @import './assets/common/reset.scss';
    @import './assets/common/common';
    body {
      padding-top: 1.4rem;
      box-sizing: border-box;
    }
    #app {
      height: 100%;
    }
</style>
