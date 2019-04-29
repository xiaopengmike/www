<template>
  <!-- 答案卡片组件 -->
  <div class="answerCardDiv">
    <div class="answerCard">
      <div v-if="answer.type === 'answerCardItem'">
        <div class="titleAndContent" ref="answerCardRef">
          <div class="answerCardTitle">{{answer.property.title}}</div>
          <div class="answerCardContent" v-html="answerCard"></div>
        </div>
        <div
          class="answerCardShowMore"
          @click="showDetail"
          v-if="!isMp4 && needShowMore"
        >{{showMore}}  <img :src="downImg"/></div>
        <div class="answerCardShowMore" @click="showMultiMedia" v-else-if="isMp4">{{multiMedia}}  <img :src="downImg"/></div>
      </div>

      <div v-else>
        <div class="answerCardTitle helpDesk">HelpDesk</div>
        <div class="answerCardContent" ref="helpDeskRef" v-html="contents"></div>
        <div class="answerCardShowMore" v-if="needShowMore" @click="showDetail">{{showMore}} <img :src="downImg"/></div>
      </div>
    </div>

    <div class="clickThumbs" v-if="answer.type === 'answerCardItem'">
      <!--<span>{{answer.property.id}}</span>-->
      <i
        class="fa fa-thumbs-o-up fa-1x up"
        :class="{upClick:hasUpClicked}"
        aria-hidden="true"
        @click="clickThumb('up',answer.property.id)"
      ></i>
      <!-- <img class="good" :src="goodImg"/> -->

    <!-- <img class="bad" :src="badImg"/> -->
      <i
        class="fa fa-thumbs-o-down fa-1x down"
        :class="{downClick:hasDownClicked}"
        aria-hidden="true"
        @click="clickThumb('down',answer.property.id)"
      ></i>
    </div>
    <!--<detail-card :detailCardShow="detail" @showChange="changeCover"></detail-card>-->
  </div>
</template>

<script>
import detailCard from "./detailCard.vue";
import dialogueCommonConstant from "../../constant/dialogueCommon.js";

export default {
  name: "answerCard",
  props: ["answer"],
  components: {
    detailCard
  },
  data() {
    return {
       downImg: require('../../assets/img/dialogue/icon_chevron-down.svg'),
       goodImg: require('../../assets/img/dialogue/icon_good.svg'),
        badImg: require('../../assets/img/dialogue/icon_bad.svg'),
      hasUpClicked: false,
      hasDownClicked: false,
      needShowMore: true,
      showMore: dialogueCommonConstant.showMore,
      multiMedia: dialogueCommonConstant.multiMedia,
      detail: {
        show: false,
        content: {},
        filenameExtension: ""
      }
    };
  },
  computed: {
    answerCard: function() {
      if (this.answer.type === "answerCardItem") {
        let str = "";
        // text
       if (this.answer.property.html) {
          // html
          str = this.regxReplace("html");
          this.answer.property.html = str;
        }else if (this.answer.property.longText) {
          str = this.regxReplace("longText");
          this.answer.property.longText = str;
        } else if (this.answer.property.mp4) {
          // mp4
          return `<video style="width:90%" ref="myVideo" src="${
            this.answer.property.mp4
          }" class="videoClass" controls="controls">您的浏览器不支持 video 标签。</video>`;
        }
        return str;
      }
    },
    contents: function() {
      let str = this.regxReplace("contents");
      this.answer.property.contents = str;
      return str;
    },

    isMp4: function() {
      return Boolean(this.answer.property.mp4);
    },

    hasJpg: function() {
      return Boolean(this.answer.property.jpg);
    },

    hasPdf: function() {
      return Boolean(this.answer.property.pdf);
    }
  },
  mounted() {
    this.refNeedShowMore("answerCardRef");
    this.refNeedShowMore("helpDeskRef");
  },
  methods: {
    // 正则换行
    regxReplace(name) {
      let str = this.answer.property[name].replace(/\\n/gm, "<br/>");
      // let count = 0;
      // str = str.replace(/---/gm, "-");
      // str = str.replace(/•||-/gm, function(match, b) {
      //   count++;
      //   if (count > 1 || (count === 1 && b > 0)) {
      //     return "<br/>" + match;
      //   }

      //   return match;
      // });
      return str;
    },

    // 判断内容是否溢出
    refNeedShowMore(refName) {
      if (this.$refs[refName]) {
        let scrollHeight = this.$refs[refName].scrollHeight;
        let clientHeight = this.$refs[refName].clientHeight;
        if (clientHeight < scrollHeight || this.hasJpg || this.hasPdf) {
          this.needShowMore = true;
        } else {
          this.needShowMore = false;
        }
      }
    },

    getFilenameExtension(filename) {
      let spl = filename.split(".");
      return spl[spl.length - 1];
    },
    showDetail() {
      let vm = this;
      vm.detail.show = !vm.detail.show;
      vm.changeCover(vm.detail.show);
      vm.detail.content.type = vm.answer.type;
      if (vm.answer.type === "answerCardItem") {
        vm.detail.content.text = vm.answer.property;
      } else {
        vm.detail.content.text = vm.contents;
      }

      vm.$emit('aCardDetail',vm.detail)
    },

    // 向父组件传播修改遮罩层
    changeCover(data) {
      this.$emit("changeCover", data);
    },

    // 隐藏遮罩层
    hideCover() {
      this.detail.show = false;
    },

    showMultiMedia() {
      window.location.href = this.answer.property.mp4;
    },

    // 点赞/踩
    clickThumb(val,id) {
      this.$emit('listenToChildMes',val,id)

      if (val === "up") {
        this.hasUpClicked = !this.hasUpClicked;
        if(this.hasDownClicked){
          this.hasDownClicked = !this.hasDownClicked;
        }
      }
      if (val === "down") {
        this.hasDownClicked = !this.hasDownClicked;
         if(this.hasUpClicked){
          this.hasUpClicked = !this.hasUpClicked;
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
.answerCard {
  display: inline-block;
  width: calc((616/750)*100vw);
  /*height: calc((368/616)*(616/750)*100vw);*/
  height:215px;
  white-space: normal;
  margin: 1.5rem 1rem;
  // border: 0.1em solid $item-border-color;
  background:rgba(255,255,255,1);
box-shadow:0px 4px 8px 0px rgba(210,210,210,0.5);
border-radius:20px;
     padding: 1em;
}
.titleAndContent {
  overflow: hidden;
  height: 15rem;
    //  height: 14rem;

}
.answerCardTitle {
  // height: 2rem;
  line-height: 2rem;
  font-size: $font-size-14px;
  // border-bottom: 0.1rem solid rgba(220,223,230,1);
 padding: 0.5rem 0em;
  font-weight: 500;
  font-family:PingFangSC-Medium;
  color:#303133;
}

.answerCardContent {
  // height: 12rem;
      white-space: pre-wrap;
  line-height: 2rem;
  //width:calc((540/750)*100vw);
   overflow: hidden;
  font-family:PingFangSC-Regular;
font-weight:400;
color:rgba(48,49,51,1);
}

.answerCardShowMore {
     height: 3rem;
    line-height: 20px;
    padding: 0.5rem 0em;
    text-align: center;
    font-family:PingFangSC-Regular;
font-weight:400;
color:rgba(96,98,102,1);
font-size: $font-size-12px;
    line-height: 3rem;
}

.helpDesk {
      padding: .5rem;
  height: 2rem;
  font-size:  $font-size-14px;
  color: $blue-color;
  background: $slide-background-color1;
  border-radius: 0.1em;
  padding-left: 0.3em;
  font-family:PingFangSC-Medium;
font-weight:500;
color:rgba(24,128,254,1);
}

.clickThumbs {
     text-align: right;
    margin-right: 1rem;
        // margin-bottom: 1rem;
}
.clickThumbs .down {
  margin-left: 1em;
}
.clickThumbs i {
  font-size: $font-size-18px;
  padding: 7px 8px;
  background-color: #fff;
  border-radius: 50%;
   box-shadow:0px 4px 8px 0px rgba(210,210,210,0.5);
}
.upClick {
  color: $blue-color;
}
.downClick {
  color: red;
}
.answerCardShowMore img{
  width: 1.05rem;
  margin-left: 1rem;
}
.good,.bad{
  height:calc((64/750)*100vw);
      background: rgba(255,255,255,1);
    border-radius: 50%;
      width: calc((64/750)*100vw);
      box-shadow:0px 4px 8px 0px rgba(210,210,210,0.5);
}
.bad{
      margin-left: calc((13/750)*100vw);
}
</style>
