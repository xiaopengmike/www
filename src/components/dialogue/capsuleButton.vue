<template>
  <!-- 胶囊按钮组件 -->
  <div class="capsuleButton">
    <div
      class="capsuleButtonItem"
      v-for="(item, index) in capsules"
      :key="index"
      @click="searchCapsule(item)"
    >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "capsuleButton",
  props: ["capsules"],
  data() {
    return {};
  },
  mounted() {},
  methods: {
    searchCapsule(capsule) {
      this.$emit("searchCapsule", capsule);
    }
  }
};
</script>

<style scoped lang="scss">
/*capsuleButton*/
.capsuleButton {
  margin: 0.8em 0em;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
}

.capsuleButtonItem {
  min-width: calc((96/750)*100vw);
      line-height: 28px;
  color: rgba(48,49,51,1);
  font-size: $font-size-14px;
  white-space: normal;
  margin: 0 2%;
  // height: 30px;
  // border: 0.1em solid $item-border-color;
    text-align: center;
     border-radius: 31px;
  background: $answer-background-color;
      padding: .5rem 1.4rem;
  display: inline-block;
}

.capsuleButton::-webkit-scrollbar {
  display: none;
}
</style>
