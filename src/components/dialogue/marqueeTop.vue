<template>
  <!-- 文字跑马灯组件 -->
  <div class="marqueeTop">
    <div class="speaker" >
      <img :src="labaImg"/>
    </div>
    <div class="marquee">
      <div>
        <span
          class="first-marquee"
        >
          本森提供的问答仅供内部学习，若有AE/PQC事件请致电400-888-9988或发邮件至cccdesk@its.jnj.com。
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "marqueeTop",
  data() {
    return {
     labaImg: require("../../assets/img/dialogue/icon_laba.svg")

    };
  },
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="scss">
.marqueeTop {
  background: #FFF5D5;
  color: #E6A23C;
  display: flex;
  margin: 0 -0.8em;
}
.speaker {
  position: relative;
  left: 2.5vw;
  //  background-repeat: no-repeat;
  // background-size: 100% 100%;
  // -moz-background-size: 100% 100%;
  background: #FFF5D5;
  color: #E6A23C;
  text-align: center;
  height: 5vh;
  width: 5vh;
  z-index: 20;
}
.speaker img{
 width: 1em;
 position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.marquee {
  flex: 1;
  height: 5vh;

  line-height: 5vh;

  padding: 0 0.7em;
  font-size: $font-size-14px;
  overflow: hidden;
  position: relative;
  div {
    display: block;
    width: 300%;
    height: 5vh;
    position: absolute;
    -webkit-animation: 15s marquee linear infinite normal;
    animation: 15s marquee linear infinite normal;
    span {
      left: 30%;
      position: absolute;
      width: 100%;
    }
    @keyframes marquee {
      0% {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
      }
      100% {
        -webkit-transform: translate3d(-100%, 0, 0);
        transform: translate3d(-100%, 0, 0);
        display: none;
      }
    }
  }
}
</style>
