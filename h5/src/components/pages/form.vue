<template>
    <div id="apply">
        <div class="title">
            <span v-if="person.cidprison">CID人员</span>
            <span v-if="person.terrorist ">涉恐人员</span>
            <span v-if="person.importantRunning ">全国在逃人员</span>
            <span v-if="person.criminalPerson ">全国违法犯罪人员</span>
            <span v-if="person.importantCriminal ">重大刑事犯罪前科人员</span>
            <span v-if="person.runningPerson ">在逃人员</span>
            <span v-if="person.importantDrug ">涉毒人员</span>
        </div>
        <mt-cell title="照片">
            <img v-for="img in imgs" :src="img.url" width="54" height="54"  v-preview="img.url" >
        </mt-cell>
        <mt-field label="姓名" placeholder="请输入姓名" v-model="params.name"></mt-field>
        <mt-field label="性别" placeholder="请输入性别" v-model="genderText" v-lfcous="choseGender"></mt-field>
        <mt-field label="身份证号" placeholder="请输入身份证号" v-model="params.identityNum" v-lfblur="getInfo"></mt-field>
        <mt-field label="出生日期" type="date" placeholder="请输入出生日期" v-model="params.birthDate"></mt-field>
        <mt-field label="户籍地址" placeholder="请输入户籍地址" v-model="params.regAddress"></mt-field>
        <mt-field label="进区原因" placeholder="请输入进区原因" v-lfcous="choseReason" v-model="reasonText"></mt-field>
        <mt-field label="办案民警" placeholder="办案民警" v-model="police" :readonly="true"></mt-field>
        <mt-field label="所属办案区" placeholder="请选择办案区"  v-model="unit" :readonly="true"></mt-field>
        <div class="btn-gruop">
            <mt-button size="large" type="primary" @click="commit">提交</mt-button>
        </div>
        <mt-popup v-model="popupVisible" position="bottom" class="popClass">
            <mt-picker :slots="enterReason" value-key="fieldValue" @change="onReasonChange" v-if="showEnterReason"></mt-picker>
            <mt-picker :slots="gender" value-key="text" @change="onGenderChange" v-if="showGender"></mt-picker>
            <!--<mt-picker :slots="policeArray" value-key="name" @change="onPoliceChange" v-if="showPolice"></mt-picker>
            <mt-picker :slots="unitArray" value-key="name" @change="onUnitChange" v-if="showUnit"></mt-picker>-->
        </mt-popup>
        <div class="spinner" v-if="loading">
          <mt-spinner type="snake" color="#26a2ff"></mt-spinner>
        </div>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex';
    import { Cell, Field, DatetimePicker, Popup, Picker, Toast } from 'mint-ui';

    export default {
      data() {
        return {
          params: {
            name: '',
            gender: 'male',
            magicId: '',
            policeMagicId: '',
            orgMagicId: '',
            identityNum: ''
          },
          reasonText: '',
          police: '',
          unit: '',
          genderText: '男',
          popupVisible: false,
          showEnterReason: false,
          showPolice: false,
          showUnit: false,
          showGender: false,
          gender: [{
            values: [{
              text: '男',
              value: 'male'
            }, {
              text: '女',
              value: 'female'
            }],
            flex: 1
          }],
          enterReason: [{
            values: [],
            flex: 1
          }],
          policeArray: [{
            values: [],
            flex: 1
          }],
          unitArray: [{
            values: [],
            flex: 1
          }],
          imgs: [],
          loading: false
        }
      },
      created() {
        var _this = this;

        // 判断本地是否有存储嫌疑人信息
        if(window.localStorage.getItem('person')) {
            _this.$store.commit('REGISTER', JSON.parse(window.localStorage.getItem('person')));
        }

        _this.imgs.push({
          url: _this.person.imgUrl
        })
        
        _this.params.magicId = _this.person.magicId;
        _this.params.policeMagicId = _this.user.magicId;
        _this.params.orgMagicId = _this.user.organizeMagicId;
        _this.police = _this.user.userName;
        _this.unit = _this.user.orgName;
        _this.$store.commit('HEADER_CONF', {
          showLeft: true,
          title: '预约申请',
          back: function(){
            _this.$router.replace({ path: '/compare' })
          }
        })

        _this.getInfo(_this.person.identityNum)

        //  // 获取标签
        // _this.axios.get('criminal/type',{
        //     params: {
        //       idcard: '44092319910805733X'
        //     }
        //   }).then((response) => {
        //   console.log(response.data)
        // })

        // 获取进区原因
        _this.axios.get('enter/reason').then((response) => {
          if(response.data.data) {
            _this.enterReason[0].values = response.data.data;
          }
        })
      },
      methods: {
        choseGender() {
          var _this = this;
          _this.showGender = true;
          _this.showEnterReason = false;
          // _this.showPolice = false;
          // _this.showUnit = false;
          _this.popupVisible = true;
          return false;
        },
        choseReason() {
          var _this = this;
          _this.showEnterReason = true;
          _this.showGender = false;
          // _this.showPolice = false;
          // _this.showUnit = false;
          _this.popupVisible = true;
          return false;

        },
        // chosePolice(){
        //   var _this = this;
        //   _this.showEnterReason = false;
        //   _this.showGender = false;
        //   _this.showPolice = true;
        //   _this.showUnit = false;
        //   _this.popupVisible = true;
        //   return false;
        // },
        // choseUnit(){
        //   var _this = this;
        //   _this.showGender = false;
        //   _this.showEnterReason = false;
        //   _this.showPolice = false;
        //   _this.showUnit = true;
        //   _this.popupVisible = true;
        //   return false;
        // },
        onGenderChange(picker, values) {
          var _this = this;
          _this.genderText = values[0].text;
          _this.params.gender = values[0].value;
        },
        onReasonChange(picker, values) {
          var _this = this;
          _this.reasonText = values[0].fieldValue;
          _this.params.enterType = values[0].fieldCode;
        },
        // onPoliceChange(picker, values) {
        //     this.police = values[0].name;
        //     this.popupVisible = false;
        // },
        // onUnitChange(picker, values) {
        //     this.unit = values[0].name;
        //     this.popupVisible = false;
        // },
        commit() {
          var _this = this;
          _this.loading = true;
          _this.axios.post('commit', this.params).then((response) => {
            if (response.data.state.code == 200) {
              _this.success();
            }else{
              Toast({
                message: response.data.state.msg
              });
            }
          }).catch((error) => {
            _this.loading = false;
            Toast({
              message: '系统错误'
            });
          })

        },
        success() {
          var _this = this;
          _this.loading = false;
          _this.$router.replace({
            path: '/success'
          })
        },
        birthFormat(params) {
          var year = params.substring(0, 4);
          var month = params.substring(4, 6);
          var day = params.substring(6, 8);

          return year + '-' + month + '-' + day;
        },
        getInfo(idCard) {
          let _this = this;
          // 获取人员信息
          _this.axios.get('population', {
            params: {
              idcard: idCard
            }
          }).then((response) => {
            if (response.status == 200) {
              if(response.data.data) {
                  _this.params.identityNum = response.data.data.sfzh;
                _this.params.name = response.data.data.xm;
                _this.params.gender = response.data.data.xb == '男' ? 'male' : 'female';
                _this.genderText = response.data.data.xb;
                _this.params.regAddress = response.data.data.zzxz;
                _this.params.birthDate = _this.birthFormat(response.data.data.csrq);
              }
            }else {
              Toast({
                  message: response.data.state.msg
              });
            }
          }).catch(error => {
             Toast({
                  message: '系统错误'
              });
          });
        }
      },

      computed: {
        ...mapGetters({
          person: 'person',
          user: 'user',
        })
      }
    }

</script>
<style lang="scss">
    @import '../../assets/form';
</style>