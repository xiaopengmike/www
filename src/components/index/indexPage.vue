<template>
  <div class="indexPage">
    <div
      :style="moveEffect"
      class="moveDiv"
      :class="{moveDiv2:showImgClick,moveDiv1:!showImgClick}"
      ref="move"
      @touchstart="touchStart"
      @touchmove.stop.prevent="moveThrottle"
      @touchend="touchEnd"
    >
      <img ref class="tip" :src="img_tip" v-show="showImgClick">

      <img class="popButton" :src="img_popButton" @click="qItemClick('你好')">
    </div>
    <!-- 跑马灯 -->
    <div class="indexSwiper">
      <swiper :options="swiperOption">
        <swiper-slide>
          <img :src="swiperUrls[0]" @click="bannerClick(swiperUrls[0])">
        </swiper-slide>
        <swiper-slide>
          <img :src="swiperUrls[1]" @click="bannerClick(swiperUrls[1])">
        </swiper-slide>
        <swiper-slide>
          <img :src="swiperUrls[2]" @click="bannerClick(swiperUrls[2])">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>

    <!-- Questions列表 -->

    <div class="questionTab">
      <div class="tabTitle">
        <button :class="{buttonActive:tabValue==='ask'}" @click="tabButton('ask')">猜你想问</button>
        <button :class="{buttonActive:tabValue==='hot'}" @click="tabButton('hot')">大家都在问</button>
      </div>
      <div class="qurstionContainer">
        <div class="askQuestion" v-show="tabValue==='ask'">
          <div
            class="askQuestionItem mayAsk"
            v-for="(item,index) in youMayAskArr"
            :key="index"
            @click="qItemClick(item.query)"
          >
            <span class="tag">{{item.sourceSection.toUpperCase()}}</span>
            <div class="hasBorder">
              <div class="itemText">
                <span>{{item.query}}</span>
                <img v-if="index < 3" :src="img_hot">
              </div>
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
        </div>

        <div class="askQuestion" v-show="tabValue==='hot'">
          <div
            class="askQuestionItem mayAsk"
            v-for="(item,index) in hotAskArr"
            :key="index"
            @click="qItemClick(item.query)"
          >
            <span class="tag">{{item.sourceSection.toUpperCase()}}</span>
            <div class="hasBorder">
              <div class="itemText">
                <span>{{item.query}}</span>
                <img v-if="index < 3" :src="img_hot">
              </div>
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CHANNELS -->
    <!-- <channel-scroll></channel-scroll> -->
    <div class="blocks">
      <p class="titleLabel">
        <span>频道</span>
      </p>

      <div class="channelContent" ref="channelWrap">
        <div ref="channelTab">
        <div

          class="channelsItem"
          v-for="(item, index) in channels"
          :key="index"
          @click="qItemClick(item)"
          :style="bgImgGroup"
        >
          <span>{{item}}</span>
        </div>
        </div>
      </div>
    </div>

    <!-- SYSTEM & PROCESS -->
    <!-- <system-scroll></system-scroll> -->
    <div class="blocks2">
      <p class="titleLabel">
        <span>系统流程</span>
      </p>

      <div class="blocksContent" ref="systemWrap">
        <div ref="systemTab">
        <div
          class="sysProcessItem"
          v-for="(item, index) in sysProcess"
          :key="index"
          @click="qItemClick(item.name)"
        >
          <div>{{item.name}}</div>
          <div>{{item.desc}}</div>
        </div>
      </div>
      </div>
    </div>

    <!-- RECOMMENDED -->
    <!-- <div class="blocks">
      <p class="titleLabel">
        <span>推荐</span>
      </p>

      <div class="recommendedContent">
        <div class="recommendedItem" v-for="(item, index) in recommended" :key="index">
          <div class="recommendedItemRight">
            <div>
              <img :src="item.img">
            </div>
            <div>{{item.title}}</div>
          </div>
          <div class="recommendedItemLeft">
            <div
              class="recommendedItemLeftItem"
              v-for="(content, index) in item.contents"
              :key="index"
            >
              <span>{{content}}</span>
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
        </div>
      </div>
    </div>-->
  </div>
</template>

<script>
import BScroll from "better-scroll";
// import channelScroll from "./channelScroll.vue";
// import systemScroll from "./systemScroll.vue";
export default {
  name: "indexPage",
  data() {
    return {
      moveEffect: "",
      clientHeight: 0,
      clientWidth: 0,
      initX: 0,
      initY: 0,
      x: 0,
      y: 0,
      showImgClick: true,
      tabValue: "ask",
      touchDiffX: 0,
      touchDiffY: 0,
      activeName: "first",
      youMayAskArr: [],
      hotAskArr: [],
      bgImgGroup: `background-image: url('${require("../../assets/img/index/group.svg")}')`,
      indexBannerImg: `background-image: url('${require("../../assets/img/index/indexBanner01.png")}')`,
      img_popButton: require("../../assets/img/index/icon_popbutton.svg"),
      img_tip: require("../../assets/img/index/tip.png"),
      img_hot: require("../../assets/img/dialogue/icon_hot2.svg"),
      channels: ["合规要求", "RST支持", "医学信息", "销售运营", "人力资源", "财务政策", "信息技术", "采购流程", "法务政策","业务质量",],
      bannerUrl01:
        "http://janssenprod.vinfol.com/Banner1-公司动态-用创新方式促进公司合规建设.pdf",
      bannerUrl02:
        "http://janssenprod.vinfol.com/Banner2-2018保险年度延长至5月31日的通知.pdf",
      bannerUrl03:
        "http://janssenprod.vinfol.com/Banner3-人事公告-张崇德 Announcement-CharltonZhang.pdf",
      swiperUrls: [
        require("../../assets/img/index/01.jpg"),
        require("../../assets/img/index/02.jpg"),
        require("../../assets/img/index/03.jpg")
      ],
      swiperOption: {
        pagination: ".swiper-pagination",
        paginationClickable: true,
        loop: true,
        autoplay: 3000
      },
      sysProcess: [
          {name:'E-Process',desc:'AMS/Travel/IO'},
           {name:'iCenter',desc:'销售核量/奖金/主数据'},
           {name:'iDiscover',desc:'BI报告、口袋报告'},
           {name:'Traffic and Meal',desc:'商宴通/神州专车'},
           {name:'Office 365',desc:'移动办公/OneDrive/Skype'},
           {name:'iConnect',desc:'客户拜访/活动/爱协作'},
           {name:'Concur',desc:'财务报销'},
           {name:'Vault',desc:'CRC Review'}
      ],
      recommended: [
        {
          title: "新人指路",
          img: require("../../assets/img/index/icon_dengpao.svg"),
          contents: [
            "新人报道指南",
            "你想知道的公司福利",
            "2019财务报销相关文档"
          ]
        },
        {
          title: "医学知识",
          img: require("../../assets/img/index/icon_shengwu.svg"),
          contents: ["医药科普冷知识a", "医药科普冷知识b", "医药科普冷知识c"]
        }
      ]
    };
  },
  beforeRouteLeave(to, from, next) {
    // 设置下一个路由的 meta
    to.meta.keepAlive = false;
    next();
  },
  created() {
    this.$nextTick(() => {
      this.channelScroll();
      this.systemScroll();
    });
  },
  components: {
    // channelScroll,
    // systemScroll
  },
  mounted() {
    let vm = this;
    this.clientHeight = document.documentElement.clientHeight;
    this.clientWidth = document.documentElement.clientWidth;

    // 判断是否为第一次登录
    let firstLogin = localStorage.getItem(
      `jassen${vm.GLOBAL.userData.wwid}login`
    );

    let hasShowMessage = localStorage.getItem(
      `jassen${this.GLOBAL.userData.wwid}message`
    );

    if (firstLogin == 1 && !hasShowMessage) {
      // vm.openToolTip();
    }

    let firstClick = localStorage.getItem(
      `jassen${vm.GLOBAL.userData.wwid}click`
    );
    if (firstClick === null) {
      vm.showImgClick = true;
    } else {
      vm.showImgClick = false;
    }

    vm.$http
      .get(vm.GLOBAL.API.recommendByUserLabel, {
        params: { userId: vm.GLOBAL.userData.wwid }
      })
      .then(
        response => {
          if (response.status === 200) {
            let arr = response.body;
            if (arr.length > 6) {
              arr = arr.slice(0, 6);
            }
            vm.youMayAskArr =arr;
          }
        },
        error => {
          console.log(error);
        }
      );

    vm.$http.get(vm.GLOBAL.API.hotQuestion).then(
      response => {
        if (response.status === 200) {
           let arr = response.body;
            if (arr.length > 6) {
              arr = arr.slice(0, 6);
            }
            vm.hotAskArr =arr;
        }
      },
      error => {
        console.log(error);
      }
    );

    if (window.history && window.history.pushState) {
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', this.goBack, false);
  }
  },
  destroyed(){
  window.removeEventListener('popstate', this.goBack, false);
},
  methods: {
     goBack(){
    //replace替换原路由，作用是避免回退死循环
    this.$router.replace({path: '/'});
  },
     channelScroll() {
      // 默认有六个就诊人
      let width = 12 * 25;
      this.$refs.channelTab.style.width = width + "vw";
      this.$nextTick(() => {
        if (!this.cscroll) {
          this.cscroll = new BScroll(this.$refs.channelWrap, {
            startX: 0,
            click: true,
            scrollX: true,
            scrollY: false,
            eventPassthrough: "vertical"
          });
        } else {
          this.cscroll.refresh();
        }
      });
    },
    systemScroll() {
      // 默认有六个就诊人
      let width = 9 * 40;
      console.log();
      this.$refs.systemTab.style.width = width + "vw";
      this.$nextTick(() => {
        if (!this.sscroll) {
          this.sscroll = new BScroll(this.$refs.systemWrap, {
            startX: 0,
            click: true,
            scrollX: true,
            scrollY: false,
            eventPassthrough: "vertical"
          });
        } else {
          this.sscroll.refresh();
        }
      });
    },
    qItemClick(text) {
      localStorage.setItem(`jassen${this.GLOBAL.userData.wwid}click`, 1);
      this.$router.push({
        path: "/dialogue",
        query: {
          text: text
        }
      });
    },
    handleClick(tab, event) {
      console.log(tab.name);
    },

    // 首次登录打开消息提示
    openToolTip() {
      let vm = this;
      const h = this.$createElement;
      this.$msgbox({
        showClose: false,
        message: h("p", null, [
          h(
            "img",
            {
              style: `${
                vm.indexBannerImg
              };height:20vh;width:100%;background-repeat:no-repeat; background-size:100% 100%;-moz-background-size:100% 100%;`
            },
            ""
          ),
          h(
            "p",
            { style: "color: #ff6c00; font-weight:400;margin:0 20px;" },
            "温馨提示 "
          ),
          h(
            "p",
            { style: "margin:0 20px;" },
            "如有任何于产品咨询、投诉 相关不良事件、产品质量投诉的问题，请直接联系客户关爱中心"
          ),
          h("p", { style: "margin:0 20px;" }, "电话：4008889988 "),
          h("p", { style: "margin:0 20px;" }, "邮箱：cccdesk@its.jnj.com ")
        ]),
        showCancelButton: false,
        confirmButtonText: "我知道了",
        callback: action => {
          localStorage.setItem(`jassen${vm.GLOBAL.userData.wwid}message`, true);
        }
      });
    },
       touchStart(e) {
      // 计算点击时的偏差值
      this.touchDiffX =
        e.touches[0].clientX - e.srcElement.parentNode.offsetLeft;
      this.touchDiffY =
        e.touches[0].clientY - e.srcElement.parentNode.offsetTop;
    },
    touchEnd(e) {
      this.initX += this.x;
      this.initY += this.y;
    },
    touchMove(e) {
      let move = this.$refs.move;
      if (e.touches.length > 0) {
        this.x = e.touches[0].clientX - this.touchDiffX;
        this.y = e.touches[0].clientY - this.touchDiffY;
        if (
          e.touches[0].clientX > 50 &&
          e.touches[0].clientX < this.clientWidth - 50 &&
          e.touches[0].clientY > 50 &&
          e.touches[0].clientY < this.clientHeight - 50
        ) {
          this.moveEffect = `top:${this.y}px;left:${this.x}px`;
        }
      }
    },
    moveThrottle(e) {
      var _this = this;
      this.throttle(_this.touchMove(e));
    },
    throttle(method) {
      var timer = null;
      return function() {
        var context = this,
          args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function() {
          method.apply(context, args);
        }, 100);
      };
    },
    getFileName(o) {
      var pos = o.lastIndexOf("/");
      return o.substring(pos + 1);
    },
    // 点击跑马灯
    bannerClick(str) {
      let imgNum = str.split("img/")[1];
      let url = "";
      if (imgNum.indexOf("01") === 0) {
        url = this.bannerUrl01;
      } else if (imgNum.indexOf("02") === 0) {
        url = this.bannerUrl02;
      } else {
        url = this.bannerUrl03;
      }

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
    tabButton(str) {
      this.tabValue = str;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.el-message-box__content {
  font-size: $font-size-14px !important;
  padding: 0 !important;
}
.el-message-box {
  width: 80% !important;
}
.el-message-box__btns button {
  width: 100%;
  background-color: #fff;
  color: $blue-color;
  border-color: $item-border-color;
  font-size: $font-size-14px;
}
</style>
<style lang="scss">
.swiper-pagination-bullet{
  background:rgba(255,255,255,0.5) !important;
}
.swiper-pagination-bullet-active{
  background:#fff  !important;
}
.tabTitle button {
  outline: none;
  border: none;
  font-size: $font-size-14px !important;
  font-weight: 500 !important;
  // padding: 0.8em;
  border-radius: 17px;
  background-color: $tab-background-color;
  width: calc((344/750)*100vw);
  height: calc((60/1334)*100vh);
}
.tabTitle {
  font-family:PingFangSC-Medium !important;
  margin: 0.8em calc((20/1334)*100vh) 0.4em calc((20/1334)*100vh);
  border-radius: 17px;
  // font-weight: $title-font-weight;
  text-align: center;
}
.buttonActive {
  color: $ask-font-color !important;
  background-color: $tab-button-background-color !important;
}

.el-tabs__nav {
  left: 50%;
  transform: translateX(-50%) !important;
}
.el-tabs__item {
  font-size: $font-size-16px;
}
</style>
<style scoped lang="scss" >

.indexPage {
  width: 100vw;
  height: 100vh;
}
.titleLabel {
  display: inline-block;
  border-left: 0.2em solid $blue-color;
  position: relative;
  top: 0.2em;
  margin-right: 0.4em;
  vertical-align: middle;
  font-weight: $title-font-weight;
  margin-bottom: 0.4em;
}

.titleLabel span {
  margin-left: 1em;
}

#tab-first {
  padding-left: 2em !important;
}

.indexSwiper img {
  width: 100vw;
  height: calc((160/750)*100vw);
}
.askQuestion {
  padding: 0em 0.8em 0em 0.8em;
  font-size: $font-size-16px;
}

.askQuestionItem .hasBorder {
  border-bottom: 0.1em solid $item-border-color;
  display: inline-block;
  width: 80%;
  position: relative;
  flex: 1;
}

.Item {
  border-bottom: 0.1em solid $item-border-color;
}

.askQuestionItem {
  // border-bottom: 0.1em solid $item-border-color;
  width: 90vw;
  line-height: 2em;
  position: relative;
}
.mayAsk {
  display: flex;
  align-items: center;
}
.askQuestionItem .itemText {
  display: inline-block;
  width: 90%;
}
.askQuestionItem .tag {
  background: #eef6ff;
  border-radius: 15px;
  padding: 0 0.5em;
  text-align: center;
  line-height: 1.8em;
  height: 1.8em;
  width: 10%;
  font-size: 1.2rem;
  display: inline-block;
}
.askQuestionItem i {
  // float: right;
  // padding-left: 1em;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  // line-height: $font-size-18px;
}
.itemText span {
  margin: 0em 0.4em;
  vertical-align: middle;
  display: inline-block;
  line-height: 2.5em;

  max-width: 80%;
  overflow: hidden; /*超出部分隐藏*/
  text-overflow: ellipsis; /* 超出部分显示省略号 */
  white-space: nowrap; /*规定段落中的文本不进行换行 */
}
.hasBorder i {
  color: $item-color;
}

.askQuestionItem img {
  width: 0.8em;
  vertical-align: middle;
}

.blocks {
  font-size: $font-size-16px;
  margin: 1em 0em 0em 1em;
}
.blocks2 {
  font-size: $font-size-16px;
  margin: 0em 0em 0em 1em;
}

.blocks2 .titleLabel span {
  margin-left: 0.5em;
}

.blocks2 .blocksContent {
  padding-left: 1em;
}

.blocksContent {
  padding-left: 1.6em;
  margin-left: -1em;
  margin-bottom: 1em;
  overflow-x: scroll;
  white-space: nowrap;
}
.channelContent {
  margin-left: -1em;
  padding-left: 1.8em;
  overflow-x: scroll;
  white-space: nowrap;
}

.blocksContent::-webkit-scrollbar {
  display: none;
}
/*CHANNELS*/
.channelsItem {
  display: inline-block;
  font-weight: $title-font-weight;
  width: 25vw;
  height: 25vw;
  margin: 0.5em;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  text-align: center;
}
.channelsItem span {
  line-height: 23vw;
  color: $blue-color;
}

// /*sysProcess*/
.sysProcessItem {
  display: inline-block;
  font-size: $font-size-18px;
  min-width: 40vw;
  min-height: 10vh;
  margin: 0.5em;
  border-radius: 0.4em;
  border: 0.1em solid $item-border-color;
  text-align: center;
}
.sysProcessItem div:first-child {
  margin-top: 2.2vh;
}
.sysProcessItem div:nth-child(2) {
  font-size: $font-size-12px;
  font-family: $font-family;
  font-weight: $content-font-weight;
  color: $item-color;
  line-height: 3.2em;
  position: relative;
  top: -0.5em;
}

/*recommended*/
.recommendedContent {
  margin-top: 1em;
}
.recommendedItem {
  display: flex;
  margin-left: -1em;
}
.recommendedItemRight {
  width: 30vw;
  padding: 1em 0;
  text-align: center;
  border: 1px solid $item-border-color;
}
.recommendedItemRight img {
  width: 3.4em;
}
.recommendedItemLeft {
  flex: 1;
  border: 1px solid $item-border-color;
}
.recommendedItemLeftItem {
  padding: 0.5em;
  line-height: 2em;
  border-bottom: 1px solid $item-border-color;
}
.recommendedItemLeftItem i {
  float: right;
  line-height: 2em;
}
.popButton {
  border-radius: 50%;
  width: 5em;
  // margin-left: 3em;
  // position: relative;
  /* right: 0em; */
}
.tip {
  width: 7em;
}

.moveDiv {
  text-align: right;
  position: fixed;
  // bottom: 14em;
  /* left: 70%; */
  z-index: 2;
  // right: 3em;
}

.moveDiv1 {
  bottom: 5em;
  right: 2em;
  width: 5.1em;
  height: 5.1em;
}

.moveDiv2 {
  bottom: 5em;
  right: 2em;
  width: 7em;
  height: 7em;
}
</style>
