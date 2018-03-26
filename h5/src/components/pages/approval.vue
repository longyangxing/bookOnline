<template>
    <div id="approval">
        <mt-navbar v-model="tag" class="navbar">
            <mt-tab-item id="waitToApproval" class="tab-item">待审批</mt-tab-item>
            <mt-tab-item id="alreadyApproval" class="tab-item">已审批</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="tag">
            <mt-tab-container-item id="waitToApproval">
                <div class="wait-to-approval-person" v-for="person in persons" v-if="person.approvalStatus == 'R'">
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
                            <p>进区原因：{{ person.approvalReason | enterReson }}</p>
                            <p>预约时间：{{ person.appointmentTime }}</p>
                        </div>
                    </div>
                    <div class="person-footer">
                        <mt-button type="danger" size="small" @click="reject(person)">不通过</mt-button>
                        <mt-button type="primary" size="small" @click="pass(person)">通过</mt-button>
                    </div>
                </div>
                <div class="tips" v-if="!showAwait">
                    暂无信息
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="alreadyApproval">
                <div class="already-approval-person"  v-for="person in persons" v-if="person.approvalStatus !== 'R'">
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
                            <p >{{person.personName}}</p>
                            <p>进区原因：{{ person.approvalReason | enterReson }}</p>
                            <p>预约时间：{{ person.appointmentTime }}</p>
                        </div>
                    </div>
                    <div class="person-footer">
                        <div>{{ person.approvalStatus =="N" ? '不通过' : '通过' }}</div>
                    </div>
                </div>
                <div class="tips" v-if="!showAlready">
                    暂无信息
                </div>
            </mt-tab-container-item>
        </mt-tab-container>
        <div class="spinner" v-if="loading">
            <mt-spinner type="snake" color="#26a2ff"></mt-spinner>
        </div>
    </div>
</template>
<script>
  import { Navbar, TabItem, TabContainer, TabContainerItem, Button, Spinner, Toast } from 'mint-ui';
    export default {
        data(){
            return {
                fixed: true,
                tag: 'waitToApproval',
                persons: [],
                loading: true,
                showAlready: false,
                showAwait: false
            }
        },
        mounted(){
            let _this = this;
            _this.$store.commit('HEADER_CONF',{ showLeft:true, title: '审批记录', back:function(){
                _this.$router.go(-1);
            }});
            _this.getRecord().then( () => {
                   // 判断待审批,已审批是否为空
                for(let i = 0; i < _this.persons.length; i++) {
                    if(_this.persons[i].approvalStatus == 'R') {
                        _this.showAwait = true;
                    }
                    if(_this.persons[i].approvalStatus == 'N' || _this.persons[i].approvalStatus == 'Y'){
                        _this.showAlready = true;
                     }
                }
            });
        },
        methods:{
            getRecord(){
                var _this = this;
                return new Promise((resolve, reject) => {
                     _this.axios.post('list', {
                        data :{}
                    }).then((response) => {
                        if(response.data.state.code == 200) {
                            if(response.data.data) {
                                _this.persons = response.data.data;
                                _this.loading = false;
                                resolve();
                            }
                          
                        }else{
                            Toast({
                                message: response.data.state.msg
                            });
                        }
                       
                    }).catch((error) => {
                        Toast({
                            message:'系统错误'
                        });
                        reject();
                    })
                })
               
               
            },
            pass(person) {
                var _this = this;
                person.approvalStatus = 'Y';
                _this.axios.post('save',person).then((response)=>{
                    if(response.data.state.code == 200) {
                        Toast({
                            message: response.data.state.msg
                        });
                        _this.getRecord();  
                    }else {
                        Toast({
                            message: response.data.state.msg
                        });
                    }
                }).catch((error)=>{
                    Toast({
                        message: '系统出错'
                     });
                })
            },
            reject(person) {
                var _this = this;
                person.approvalStatus = 'N';
                _this.axios.post('save',person).then((response)=>{
                    if(response.data.state.code == 200) {
                        Toast({
                            message: response.data.state.msg
                        });
                        _this.getRecord();  
                    }else{
                        Toast({
                            message: response.data.state.msg
                        });
                    }
                }).catch((error)=>{
                    Toast({
                        message: '系统出错'
                    });
                })
            }
        } 
    }   
</script>>
<style lang="scss">
  @import '../../assets/approval';
</style>