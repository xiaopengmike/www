<template>
  <!--详情面板 -->
  <div class="detailCard">
    <transition name="el-zoom-in-bottom">
      <div v-if="detailCardShow.show" class="transition-box">
        <div
          class="title"
          v-if="(detailCardShow.content.type === 'answerCardItem' || detailCardShow.content.type === 'helpDesk')"
        >
          <span>{{detailCardShow.content.text.title}}</span>
          <i class="close el-icon-close" @click="backDetail"></i>
        </div>
        <div class="title askTitle" v-else>
          <img src="../../assets/img/dialogue/icon_guess2.svg">
          {{detailCardShow.content.title}}
        </div>
        <div
          class="detailContent"
          v-if="(detailCardShow.content.type === 'answerCardItem' || detailCardShow.content.type === 'helpDesk')"
        >
          <div class="answer" v-if="isHtml" v-html="detailCardShow.content.text.html"></div>
          <img v-else-if="isJpg" :src="url" @click="showMultiMedia(url)">
          <div
            class="answer"
            v-else-if="(isLontText && !isHtml && !isJpg)"
            v-html="detailCardShow.content.text.longText"
          ></div>
          <!-- <div class="answer" v-if="(isLontText || !isHtml) && !isJpg" v-html="detailCardShow.content.text.longText"></div>
          <div class="answer" v-else-if="isHtml && !isLontText" v-html="detailCardShow.content.text.html"></div>-->
          <!-- <div class="answer" v-else>{{detailCardShow.content.text}}</div> -->
          <!-- <img v-if="isJpg" :src="url" @click="showMultiMedia(url)"/>   -->
        </div>
        <div class="detailContent askContent" v-else>
          <div
            class="detailContentItem"
            v-for="(item, index) in detailCardShow.content.text"
            :key="index"
            @click="searchDetailQuestion(item)"
          >
            <div class="itemText">{{item}}</div>
            <!-- <div class="itemArrow"> -->
            <i class="el-icon-arrow-right"></i>
            <!-- </div> -->
          </div>
        </div>
        <div class="foot">
          <div v-if="hasMiText">
            <div class="showAllText" style="text-decoration: none">{{detailCardShow.content.text.miText}}</div>
          </div>
          <div v-else>
            <div
              v-if="(detailCardShow.content.type === 'answerCardItem' || detailCardShow.content.type === 'helpDesk')"
            >
              <div
                class="showAllText"
                v-if="isPdf"
                @click="showAllText(detailCardShow.content.text.pdf)"
              >{{allText}}</div>
            </div>
            <div v-else class="detailBack" @click="backDetail">{{back}}</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import CollapseTransition from "element-ui/lib/transitions/collapse-transition";
import dialogueCommonConstant from "../../constant/dialogueCommon.js";

export default {
  name: "detailCard",
  props: ["detailCardShow"],
  components: {
    CollapseTransition
  },
  data() {
    return {
      url: require("../../assets/img/dialogue/Spinner-1s-72px.gif"),
      loadingFailed: require("../../assets/img/dialogue/loading_failed.jpg"),
      allText: dialogueCommonConstant.allText,
      back: dialogueCommonConstant.back,
      multiMedia: dialogueCommonConstant.multiMedia
    };
  },
  mounted() {},
  computed: {
    hasUrl: function() {
      return Boolean(
        this.detailCardShow.content.text.detailUrl ||
          this.detailCardShow.content.text.originalDocUrl
      );
    },

    isJpg: function() {
      console.log(this.detailCardShow.content);
      console.log(this.detailCardShow.content.text);
      return Boolean(
        this.detailCardShow.content.text && this.detailCardShow.content.text.jpg
      );
    },

    isMp4: function() {
      return Boolean(this.detailCardShow.content.text.mp4);
    },

    isLontText: function() {
      return Boolean(this.detailCardShow.content.text.longText);
    },

    isHtml: function() {
      return Boolean(this.detailCardShow.content.text.html);
    },

    isPdf: function() {
      return Boolean(this.detailCardShow.content.text.pdf);
    },

    hasMiText: function() {
      return Boolean(this.detailCardShow.content.text.miText);
    }
  },
  updated() {
    let vm = this;
    if (vm.isJpg) {
      let newImg = new Image();
      newImg.src = vm.detailCardShow.content.text.jpg;
      newImg.onerror = () => {
        // 图片加载失败
        vm.url = vm.loadingFailed;
      };
      newImg.onload = () => {
        // 图片加载成功后把地址给原来的img
        vm.url = vm.detailCardShow.content.text.jpg;
      };
    }
  },
  methods: {
    // 点击返回按钮隐藏细节面板
    backDetail() {
      let vm = this;
      vm.detailCardShow.show = !vm.detailCardShow.show;
      this.$emit("showChange", vm.detailCardShow.show);
    },

    // 点击细节面板中的问题进行提问
    searchDetailQuestion(question) {
      debugger
      this.$emit("detailQuestion", question);
      this.backDetail();
    },

    getFileName(o) {
      var pos = o.lastIndexOf("/");
      return o.substring(pos + 1);
    },

    showAllText(url) {
      let vm = this;
      if (process.env.NODE_ENV === "development") {
        url = "/media/" + vm.getFileName(url);
      }
      vm.$router.push({
        path: "/pdfView",
        query: {
          url: Base64.encode(url)
        }
      });
    },

    showMultiMedia(url) {
      window.location.href = url;
    }
  }
};
</script>

<style>
.detailContent img {
  max-width: 100%;
}
</style>

<style scoped lang="scss">
.title img {
  width: 1em;
}
.detailCard {
  z-index: 999;
  position: fixed;
  bottom: 0;
  left: 0;
  min-width: 100vw;
  max-width: 100vw;
}
.detailContent .answer {
  white-space: pre-wrap;
}
.detailContent {
  max-height: 21em;
  word-wrap: break-word;
  word-break: break-all;
  overflow-y: auto;
  overflow-x: hidden;
}

.askContent {
  max-height: 20em;
}

.detailContent .answer {
  padding: 0px 24px;
}

.transition-box {
  position: relative;
  border: 0.1em solid $item-border-color;
  box-shadow: 0em 0.4em 0.8em 0em $box-shadow-color;
  border-radius: 20px 20px 2px 2px;
  background: $answer-background-color;
  // padding: 1em;
  box-sizing: border-box;
  overflow: auto;
}

.showAllText,
.showMultiMedia {
  display: inline-block;
  line-height: 2.4em;
  padding-left: 10px;
  color: $item-color;
  text-decoration: underline;
}
.detailBack {
  padding-left: 10px;
  line-height: 2.4em;
  display: inline-block;
  color: $blue-color;
}

.foot {
  height: 2.4em;
  background-color: $tab-background-color;
}

.detailContent::-webkit-scrollbar {
  display: none;
}

.detailContentItem {
  border-bottom: 0.1em solid $item-border-color;
  position: relative;
  padding-right: 10px;
  // padding: 0.5em 0em;
}

.detailContentItem .itemText {
  line-height: 2.4em;
  display: inline-block;
  width: 90%;
  white-space: normal;
  word-break: break-all;
  word-wrap: break-word;
  vertical-align: top;
  padding: 0px 0px 0px 10px;
}

.close {
  float: right;
  color: $item-color;
  line-height: 2em;
}

.detailContentItem i {
  padding-left: 1em;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.title {
  // border-bottom: 0.1em solid #e0e3e9;
  line-height: 2em;
  font-weight: 600;
  white-space: normal;
  padding: 16px 24px 12px 24px;
}
.title span {
  display: inline-block;
  max-width: 90%;
}

.askTitle {
  padding: 16px 24px 4px 24px;
}

.detailContent div {
  line-height: 2em;
  white-space: normal;
}
</style>
