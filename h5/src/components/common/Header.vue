<template>
    <div id="header">
       <mt-header class="com-header" :title="com.title" :fixed="fixed">
            <mt-button slot="left" icon="back" class="back" @click="com.back()" v-if="com.showLeft"></mt-button>
        </mt-header>
        <img class="logo" src="../../images/icon.png" v-if="!com.showLeft">
        <img class="icon" src="../../images/user.png" @click="login"></img>
    </div>
</template>
<script>
    import { Header, MessageBox, Toast } from 'mint-ui';
    import { mapGetters } from 'vuex';
    import  '../../assets/icon/iconfont.css';

    export default {
        data(){
            return {
                fixed: true
            }
        },
        methods:{
            login() {
                let _this = this;
                // 非首页不能点击
                if(_this.com.showLeft) {
                    Toast({
                        message: '请先返回首页'
                    });
                    return
                }
                MessageBox.prompt('请输入警号').then(({ value, action }) => {
                    _this.$store.commit('GETPOLICECODE', value);
                    window.localStorage.setItem("policeCode", value);
                });
            }
        },
        computed: mapGetters({
           com: 'headerCon'
        })
    }

</script>

<style lang="scss">
    @import '../../assets/header.scss';
</style>