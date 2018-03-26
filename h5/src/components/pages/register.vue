<template>
    <div id="register">
        <div class="camera">
            <video id="video" autoplay v-show="showVideo"></video>
            <img src="" v-show="!showVideo" id="headerImg">
        </div>
        <div class="btn-group">
            <mt-button size="large" class="take-photo" id="capture" v-show="showVideo" @click="capture()">拍照</mt-button>
            <mt-button size="large" class="take-photo" @click="reCapture()" id="capture" v-show="!showVideo">重拍</mt-button>
            <mt-button size="large" type="primary" @click="comfirm()">确认</mt-button>
        </div>
        <canvas id="canvas" width="2500" height="2500" v-show="false"></canvas>
        <div class="spinner" v-if="loading">
            <mt-spinner type="snake" color="#26a2ff"></mt-spinner>
        </div>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex';
    import {
      Button,
      Toast
    } from 'mint-ui';

    export default {
      data() {
        return {
          btn: '拍照',
          showComfirm: false,
          showVideo: true,
          imgUrl: '',
          loading: false
        }
      },
      created() {
        let _this = this;
        _this.$store.commit('HEADER_CONF', {
          showLeft: true,
          title: '入区登记',
          back: function() {
            _this.$router.go(-1);
          }
        });
      },
      mounted() {
        this.init();
      },
      beforeDestroy() {
        if (window.track) {
          window.track.stop();
          window.track = null;
        }
      },
      methods: {
        // 初始化相机
        init() {
          var _this = this,
            video = document.getElementById("video");
          if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia) {
            //调用用户媒体设备，访问摄像头
            _this.getUserMedia({
              video: {
                width: '100%',
                height: '100%'
              }
            }, _this.success, _this.error, video);
          } else {
            alert("你的浏览器不支持访问用户媒体设备");
          }
        },
        // 拍照
        capture() {
          var _this = this;
          _this.showVideo = false;
          var canvas = document.getElementById("canvas");
          var context = canvas.getContext("2d");
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          document.getElementById('headerImg').setAttribute('src', canvas.toDataURL("image/jpeg"));
          _this.imgUrl = canvas.toDataURL("image/jpeg");
          window.track.stop();
          window.track = null;
        },
        // 确认注册
        comfirm: function () {
          var _this = this;
          if (!_this.imgUrl) {
            Toast({
              message: '请先拍照',
            });
            return;
          }

          // loading
          _this.loading = true;

          _this.axios.post('face/register',{
            imgStr: _this.imgUrl,
            orgCode: _this.user.orgCode
          }).then((response) => {
            if(response.data.state.code == 200) {
              if(!response.data.data) {
                Toast({
                  message: response.data.state.msg
                });
                _this.loading = false;
                return;
              }
              // 保存图片和用户magicId
              _this.$store.commit('REGISTER', {
                imgUrl: _this.imgUrl,
                magicId: response.data.data
              });

              // 本地储存 
              let person = {
                imgUrl: _this.imgUrl,
                magicId: response.data.data
              }
              window.localStorage.setItem("person", JSON.stringify(person));
              // loading
              _this.loading = false;

              // 跳转
              this.$router.replace({ path: '/compare' })
            }else{
              Toast({
                message: response.data.state.msg
              });
              _this.loading = false;
              return;
            }
          }).catch((error) => {
            _this.loading = false;
            Toast({
                message:'系统错误'
              });
          });
         

        },
        // 重拍
        reCapture: function () {
          var _this = this;
          _this.showVideo = true;
          _this.init();
        },
        // 调用媒体摄像头
        getUserMedia(constrains, success, error, video) {
          if (navigator.mediaDevices.getUserMedia) {
            //最新标准API
            navigator.mediaDevices.getUserMedia(constrains).then(success).catch(error);
          } else if (navigator.webkitGetUserMedia) {
            //webkit内核浏览器
            navigator.webkitGetUserMedia(constrains).then(success).catch(error);
          } else if (navigator.mozGetUserMedia) {
            //Firefox浏览器
            navagator.mozGetUserMedia(constrains).then(success).catch(error);
          } else if (navigator.getUserMedia) {
            //旧版API
            navigator.getUserMedia(constrains).then(success).catch(error);
          }
        },
        // 成功处理方法
        success(stream) {
          //兼容webkit内核浏览器
          var CompatibleURL = window.URL || window.webkitURL;
          //将视频流设置为video元素的源
          video.src = CompatibleURL.createObjectURL(stream);
          window.track = stream.getTracks()[0]
          //播放视频
          video.play();
        },
        // 失败回调
        error(error) {
          console.log("访问用户媒体设备失败：", error.name, error.message);
        }
      },
      computed:{
        ...mapGetters({
          user: 'user',
        })
      }
    }



</script>>
<style lang="scss">
  @import '../../assets/register';
</style>