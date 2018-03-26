<template>
    <div id="home">
        <div class="content" v-if="login">
            <router-link :to="{ name: 'register' }" class="item"  v-if="user.registerAuth == true">
               <div class="register"></div>
               <span class="title">入区登记</span>
            </router-link>
            <router-link :to="{ name: 'record' }" class="item" v-if="user.registerAuth == true">
               <div class="record"></div>
               <span class="title">预约记录</span>
            </router-link>
            <router-link :to="{ name: 'approval' }" class="item" v-if="user.approvalAuth == true">
               <div class="approval"></div>
               <span class="title">预约审批</span>
            </router-link>
            <div class="tips" v-if="user.approvalAuth == false && user.registerAuth == false">
              暂无权限
            </div>
        </div>
        <div class="tips" v-if="!login">
            请先点击右上角图标输入警号
        </div>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex';
    import { Button, Toast } from 'mint-ui';

    export default {
      data() {
        return {
          user: {
            account: ''
          },
          login: false
        }
      },
      created() {
        let _this = this,
          policeCode = window.localStorage.getItem('policeCode');
        _this.$store.commit('HEADER_CONF', {
          showLeft: false,
          title: '办案中心精细化'
        })
        _this.getUserInfo();
      },
      watch: {
        //获取用户数据
        policeCode: function () {
          this.getUserInfo();
        }
      },
      methods: {
        getUserInfo() {
          let _this = this;
          if (_this.policeCode) {
            _this.login = true;
            _this.axios.get('user/' + _this.policeCode).then((response) => {
              if(response.data.state.code == 200) {
                if(response.data.data) {
                  _this.user = response.data.data;
                  _this.loading = false;
                  _this.$store.commit('GETUSERINFO', _this.user);
                  window.localStorage.setItem("user", JSON.stringify(_this.user));
                }
              }else {
                Toast({
                  message: response.data.state.msg
                });
              }
            }).catch((error) => {
              Toast({
                  message:'系统错误'
                });
            })
          }
        }
      },
      computed: mapGetters({
        policeCode: 'policeCode'
      })
    }
</script>>

<style lang="scss">
    @import '../../assets/home';
</style>