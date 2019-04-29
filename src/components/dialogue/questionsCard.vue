<template>
  <div class="questionsCard">
    <!-- 问题卡片 -->
    <div class="question">
      <div class="questionsTitle">
        <img src="../../assets/img/dialogue/icon_guess2.svg">
        {{question.property.title}}
      </div>
      <div class="questionsCotent">
        <div
          class="questionsItem"
          v-for="(item, index) in question.property.contents"
          :key="index"
          @click="detailQuestion(item)"
        >
          <div>{{item}}</div>
          <img :src="leftImg"/>
          <!-- <i class="el-icon-arrow-right"></i> -->
        </div>
      </div>
      <div class="questionsShowMore" v-if="needShowMore" @click="showDetail">{{moreQuestions}}  <img :src="downImg"/></div>
    </div>
    <!--<detail-card-->
      <!--:detailCardShow="detail"-->
      <!--@showChange="changeCover"-->
      <!--@detailQuestion="detailQuestion"-->
    <!--&gt;</detail-card>-->
  </div>
</template>

<script>
import detailCard from "./detailCard.vue";
import dialogueCommonConstant from "../../constant/dialogueCommon.js";

export default {
  name: "questionsCard",
  props: ["question"],
  components: {
    detailCard
  },
  data() {
    return {
       leftImg: require('../../assets/img/dialogue/icon_chevron-left.svg'),
       downImg: require('../../assets/img/dialogue/icon_chevron-down.svg'),
       needShowMore: true,
      moreQuestions: dialogueCommonConstant.moreQuestions,
      detail: {
        show: false,
        content: {},
        filenameExtension: ""
      }
    };
  },
  mounted() {
    if(this.question.property.contents.length > 4){
      this.needShowMore = true;
    }else {
      this.needShowMore = false;
    }
  },
  methods: {
    showDetail() {
      let vm = this;
      vm.detail.show = !vm.detail.show;
      vm.changeCover(vm.detail.show);
      vm.detail.content.type = "questions";
      vm.detail.content.title = this.question.property.title;
      vm.detail.content.text = vm.question.property.contents;
      console.log(vm.detail);

      vm.$emit('qCardDetail',vm.detail)
    },

    detailQuestion(question) {
      this.$emit("detailQuestion", question);
    },

    // 修改遮罩层
    changeCover(data) {
      this.$emit("changeCover", data);
    },

    hideCover() {
      this.detail.show = false;
    }
  }
};
</script>

<style scoped lang="scss">
/* 热门问题卡片*/
.questionsCard {
  display: inline-block;
  width: 100%;
  font-size: $font-size-14px;
}
.question {
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

.questionsTitle {
  font-size: $font-size-12px;
  border-bottom: 0.1rem solid rgba(220,223,230,1);
  padding: 0.5em 0em;
  font-weight: 500;
  font-family:PingFangSC-Medium;
    color:#303133;
}

.questionsTitle img {
  width: 1em;
      vertical-align: unset;
}

.questionsCotent {
 height: 12.5rem;
  overflow: hidden;
}

.questionsItem {
  height: 3rem;
  border-bottom: 0.1rem solid rgba(220,223,230,1);
  // padding: 0.5em 0em;
}

.questionsItem div {
  padding: 0.5rem 0em;
  display: inline-block;
  max-width: 85%;
  overflow: hidden;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.questionsItem img {
  float: right;
  height:calc((22/16)*((16/750)*100vw));
     width:calc((16/750)*100vw);
  padding-top: 0.5em;
}

.questionsShowMore {
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

.questionsShowMore img{
  width: 1.05rem;
  margin-left: 1rem;
}
</style>
