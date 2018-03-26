<template>
    <div id="compare">
        <div class="person" v-for="person in compareList">
            <div class="img">
                 <img :src="'data:image/png;base64,'+person.imgBase64" v-preview="'data:image/png;base64,'+person.imgBase64">
            </div>
            <div class="person-info">
                <div class="name">
                    <p>{{person.name}}</p>
                    <p>{{person.cardNo}}</p> 
                </div>
            </div>
            <div class="similarity">
                {{person.similarity.toFixed(2)*100}}%
            </div>
            <div class="button">
                <mt-button size="small" type="primary" @click="reUse(person)">复用</mt-button>
            </div>
        </div>
        <div class="tips" v-if="compareList.length == 0">
             暂无信息
        </div>
        <div class="btn-group">
            <mt-button size="large" type="primary" @click="register()">手工录入</mt-button>
        </div>
        <div class="spinner" v-if="loading" id="loading">
            <mt-spinner type="snake" color="#26a2ff"></mt-spinner>
        </div>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex';
    import { Button, Toast } from 'mint-ui';

    export default {
        data(){
            return {
                compareList:[],
                loading: true
            }
        },
        created() {
            var _this = this;
            _this.$store.commit('HEADER_CONF',{ showLeft:false, title: '比中信息', back: function(){
                _this.$router.replace({ path: '/register' })
            }});
            // 判断本地是否有存储嫌疑人信息
            if(window.localStorage.getItem('person')) {
                _this.$store.commit('REGISTER', JSON.parse(window.localStorage.getItem('person')));
            }
            
            // 递归调用请求比对信息
            let count = 0;
            _this.getCompareInfo(count)
          
        },
        methods: {
          register() {
            this.$router.replace({
              path: '/form'
            })
          },
          reUse(person) {
            this.$store.commit('REGISTER', {
              identityNum: person.cardNo
            });
            this.register();
          },
          // 获取比对信息
          getCompareInfo(count) {
            let _this = this;
            return new Promise((resovle, reject) => {
              setTimeout(() => {
                _this.axios.get('person/faces', {
                  params: {
                    personMagicId: _this.person.magicId
                  }
                }).then((response) => {
                  if (response.data.state.code == 200) {
                    count++;
                    resovle();
                    if (response.data.data) {
                      _this.compareList = response.data.data;
                       _this.loading = false;
                    }
                  } else {
                    Toast({
                      message: response.data.state.msg
                    });
                  }
                }).catch((error) => {
                  count++;
                  reject();
                  Toast({
                    message: '系统错误'
                  });
                })
              }, 2000)
            }).then(()=>{
                if(count < 4 && _this.compareList.length == 0) {
                    _this.getCompareInfo(count)
                }else{
                    _this.loading = false;
                }
            })
          }
        },

        computed: {
            ...mapGetters({
            person:'person'
            })
        }
    }    
</script>
<style lang="scss">
    @import '../../assets/compare';
</style>