<template>
  <!--欢迎页1 -->
  <div class="welcome2" >
    <div class="blankPage">
    </div>
    <div class="welcomePage" :style="bgImg">
    </div>
  </div>
</template>

<script>
export default {
  name: "welcome2",
  data() {
    return {
      bgImg: `background-image: url('${require("../../../assets/img/index/guide1.png")}')`
    };
  },
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="scss">
.blankPage{
  width: 100vw;
  height: calc(100vh - 1334px)
}
.welcomePage {
  height: 100vh;
  width: 100vw;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
}

</style>
