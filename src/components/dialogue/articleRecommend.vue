<template>
  <!--文章推荐组件 -->
  <div class="articleRecommend">
    <div class="articleRecommendItem" @click="showArticle(article.content)">
      <div>
        <img src="../../assets/img/dialogue/icon_pdf.svg">
      </div>
      <div class="articleTitle">{{articleTitle}}</div>
    </div>
  </div>
</template>

<script>
let Base64 = require("js-base64").Base64;
export default {
  name: "articleRecommend",
  props: ["article"],
  data() {
    return {};
  },
  mounted() {
    console.log(this.article);
  },
  computed: {
    // 文章标题字数显示10字以内
    articleTitle: function() {
      let title = this.article.title;
      // if (title.length > 10) {
      //   title = title.slice(0, 10) + "...";
      // }
      return title;
    }
  },
  // beforeRouteLeave(to, from, next) {
  //   from.meta.keepAlive = true;
  //  // to.meta.keepAlive = true;
  //   next();
  // },
  methods: {
    getFileName(o) {
      var pos = o.lastIndexOf("/");
      return o.substring(pos + 1);
    },
    showArticle(url) {
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
    }
  }
};
</script>

<style scoped lang="scss">
/*articleRecommend*/
.articleRecommend {
  position: relative;
  font-size: 1.4rem;
  width: calc((298/750)*100vw);
    /*height: calc((368/298)*((298/750)*100vw));*/
  height:215px;
  white-space: normal;
   margin: 1.5rem 1rem;
  // border: 0.1em solid $item-border-color;
  -webkit-box-shadow: 0em 0.4em 0.8em 0em $box-shadow-color;
  background:rgba(255,255,255,1);
box-shadow:0px 4px 8px 0px rgba(210,210,210,0.5);
border-radius:20px;
  padding: 1em;
  display: inline-block;
}
.articleRecommendItem {
  // height: 16em;
  // width: 40vw;
   position: absolute;
    top: 50%;
    left:50%;
    transform: translate(-50%,-50%);
  display: table-cell;
  vertical-align: bottom;
  text-align: center;
}

.articleRecommendItem img {
 width: calc((110/750)*100vw);
}

.articleTitle {
  width:  calc((204/750)*100vw);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-break: break-all;
  line-height: 2rem;
  height: 2rem;
  margin-top: 2.8rem;
  color:rgba(48,49,51,1);
}
</style>
