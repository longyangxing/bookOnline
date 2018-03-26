<template>
    <div id="record">
        <div class="person" v-for="person in persons">
            <div class="person-header">
                <span v-if="person.cidprison">CID人员</span>
                <span v-if="person.terrorist ">涉恐人员</span>
                <span v-if="person.importantRunning ">全国在逃人员</span>
                <span v-if="person.criminalPerson ">全国违法犯罪人员</span>
                <span v-if="person.importantCriminal ">重大刑事犯罪前科人员</span>
                <span v-if="person.runningPerson ">在逃人员</span>
                <span v-if="person.importantDrug ">涉毒人员</span>
            </div>
            <div class="person-content">
                <div class="img">
                    <img :src="'header/'+person.faceUrl" v-preview="'header/'+person.faceUrl">
                </div>
                <div class="person-info">
                    <p>{{person.personName}}</p>
                    <p>预约时间：{{person.appointmentTime}}</p>
                    <p>{{person.orgName}}</p>
                </div>
            </div>
            <div class="person-footer">
                <div class="first">{{ person.approvalStatus == 'R'? '未审核': (person.approvalStatus=="N" ? '不通过' : '通过')}}</div>
                <div>{{ person.enterStatus == 'Y' ? '已入区' : '未入区' }}</div>
            </div>
        </div>
         <div class="tips" v-if="persons.length == 0">
            暂无信息
        </div>
        <div class="spinner" v-if="loading">
            <mt-spinner type="snake" color="#26a2ff"></mt-spinner>
        </div>
    </div>
</template>
<script>
    import { Spinner, Toast } from 'mint-ui';
    export default {
        data(){
            return {
                persons:[],
                loading: true
            }
        },
        mounted(){
            let _this = this;
            _this.$store.commit('HEADER_CONF', {  showLeft:true, title: '申请记录', back:function(){
               _this.$router.go(-1);
            }})
            this.getRecord();
        }, 
        methods:{
            getRecord(){
                this.axios.post('list', {
                    data :{}
                }).then((response) => {
                    if(response.data.state.code == 200) {
                        if(response.data.data) {
                            this.persons = response.data.data;
                            this.loading = false;
                        }
                    }else{
                        Toast({
                            message:'系统错误'
                        });
                    }
                }).catch((error) => {
                    Toast({
                        message:'系统错误'
                    });
                })
            }
        }
    }   
</script>>
<style lang="scss">
  @import '../../assets/record';
</style>