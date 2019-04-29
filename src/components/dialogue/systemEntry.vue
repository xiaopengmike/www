<template>
  <!--系统入口组件 -->
  <div class="systemEntry">
    <div class="systemEntryItem" @click="enterSystem(system.property.text)">
      <div>
        <img src="../../assets/img/dialogue/icon_xitong.svg">
      </div>
      <div class="articleTitle">{{system.name=='iDiscover'?'口袋报告':system.name}}</div>
    </div>
  </div>
</template>

<script>
  let Base64 = require("js-base64").Base64;
  export default {
    name: "systemEntry",
    props: ["system"],
    data() {
      return {};
    },
    mounted() {
    },

    methods: {
      enterSystem(url) {
        let vm = this;
        window.location.href = url.split(': ')[1];
      }
    }
  };
</script>

<style scoped lang="scss">
  /*articleRecommend*/
  .systemEntry {
    position: relative;
    font-size: 1.4rem;
    width: calc((298 / 750) * 100vw);
    height: calc((368 / 298) * ((298 / 750) * 100vw));
    white-space: normal;
    margin: 1.5rem 1rem;
    // border: 0.1em solid $item-border-color;
    -webkit-box-shadow: 0em 0.4em 0.8em 0em $box-shadow-color;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 4px 8px 0px rgba(210, 210, 210, 0.5);
    border-radius: 20px;
    padding: 1em;
    display: inline-block;
  }

  .systemEntryItem {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: table-cell;
    vertical-align: bottom;
    text-align: center;
  }

  .systemEntryItem img {
    width: calc((150 / 750) * 100vw);
  }

  .articleTitle {
    width: calc((204 / 750) * 100vw);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
    line-height: 2rem;
    height: 2rem;
    margin-top: 2.8rem;
    color: rgba(48, 49, 51, 1);
  }
</style>
