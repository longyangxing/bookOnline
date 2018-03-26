<template>
  <div id="success">
    <div class="tips">
      <img src="../../images/success.png" alt="">
      <p>预约成功,请等待领导审批！</p>
      <p>您可以在预约记录中查看领导审批情况。</p>
    </div>
  </div>
</template>
<script>
    export default {
      created() {
        let _this = this;
        this.$store.commit('HEADER_CONF', {
          showLeft: true,
          title: '办案中心精细化',
          back: function() {
            _this.$router.replace({ path: '/' })
          }
        })
      }
    }   
</script>>
<style lang="scss">
  @import '../../assets/success';
</style>