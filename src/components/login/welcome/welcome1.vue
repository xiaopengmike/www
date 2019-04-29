<template>
  <!--欢迎页1 -->
  <div class="welcome1">
    <!-- <div class="userName">
      {{userName}}
    </div>-->
    <div class="blankBg"></div>
    <div class="welcomeBg" :style="bgImg">
      <div class="timeHello">{{time}}好</div>
      <div class="introduce">
        <p>我是您的专属智能助理-杨小森</p>
        <p>
          这是咱们第
          <i>{{num}}</i>次见面
        </p>
        <!-- <p>今天是您在杨森工作的</p>
        <p>第<i>{{dayNum}}</i>天</p>-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "welcome1",
  data() {
    return {
      // changeNum:true,
      userName: "王丽",
      num: 1,
      dayNum: 225,
      bgImg: `background-image: url('${require("../../../assets/img/index/welcome.png")}')`
    };
  },
  computed: {
    time: function() {
      let now = new Date();
      let hour = now.getHours();
      if (hour < 6) return "凌晨";
      else if (hour < 9) return "早上";
      else if (hour < 12) return "上午";
      else if (hour < 14) return "中午";
      else if (hour < 17) return "下午";
      else return "晚上";
    }
  },
  created() {
    // console.log('~~~~~~~~~~~~~~~~');
    let num =
      localStorage.getItem(`jassen${this.GLOBAL.userData.wwid}login`) || 0;
    //console.log(this.changeNum);
    //  if(this.changeNum){
    num++;
    localStorage.setItem(`jassen${this.GLOBAL.userData.wwid}login`, num);
    //  }
    // num ++;
    // localStorage.setItem(`jassen${this.GLOBAL.userData.wwid}login`, num);
    this.num = num;
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", this.goBack, false);
    }
  },
  destroyed() {
    window.removeEventListener("popstate", this.goBack, false);
  },
  // beforeRouteEnter(to, from, next) {
  //    next(vm=>{          //  这里的vm指的就是vue实例，可以用来当做this使用
  //       console.log(to)
  //       console.log(from)
  //       if (from.name==='welcome2'){
  //         vm.changeNum=false;
  //       }else{
  //         vm.changeNum=true;
  //       }
  //     })
  //   },
  methods: {
    goBack() {
      //replace替换原路由，作用是避免回退死循环
      this.$router.replace({ path: "/" });
    },
    onSwipeLeft() {
      this.$router.push({ path: "/welcome2" });
    }
  }
};
</script>

<style scoped lang="scss">
.blankBg {
  width: 100vw;
  height: calc(100vh - 1334px);
}
.welcomeBg {
  height: 100vh;
  width: 100vw;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
}
.userName {
  color: $blue-color;
  font-size: $font-size-24px;
  font-weight: $title-font-weight;
  text-align: center;
  padding-top: 1.2em;
}
.timeHello {
  color: $item-color;
  font-size: $font-size-16px;
  text-align: center;
  padding-top: 6rem;
}
.introduce {
  font-size: $font-size-20px;
  text-align: center;
  padding-top: 2.7rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
}
.introduce p {
  padding-top: 0.8em;
}
.introduce i {
  padding: 0 0.4rem;
  line-height: 2.4rem;
  letter-spacing: 3px;
  font-family: Helvetica;
  font-size: 3.2rem;
  color: $blue-color;
  font-style: normal;
}
</style>
