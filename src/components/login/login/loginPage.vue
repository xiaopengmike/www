<template>
  <!-- 登录 -->
  <div class="loginPage">
    <div class="loginPageContent">
      <div class="loginPageImg" :style="indexBannerImg"></div>
      <div class="loginPageIput">
        <el-input v-model="wwid" placeholder="请输入wwid" @blur="inputBlur"></el-input>
        <el-button @click="login(wwid)">登录</el-button>
      </div>
      <!-- <div class="selectFontSize">
      <span>选择字体大小</span>
      <el-select v-model="value" placeholder="请选择" @change="fontChange(value)">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "loginPage",
  data() {
    return {
      wwid: this.GLOBAL.userData.wwid,
      indexBannerImg: `background-image: url('${require("../../../assets/img/index/indexBanner01.png")}')`,
      options: [
        {
          value: "smaller",
          label: "小号字体"
        },
        {
          value: "normal",
          label: "正常"
        },
        {
          value: "larger",
          label: "大号字体"
        }
      ],
      value: "normal"
    };
  },
  mounted() {
    let html = document.getElementsByTagName("html")[0];
    html.style.fontSize = "62.5%";
  },
  methods: {
    login(wwid) {
      if (wwid.length === 0) {
        wwid = 1;
      } 
        this.GLOBAL.userData.wwid = wwid;
        this.$router.push({
          path: "/welcomePage"
        });
      
    },
    inputBlur() {
      let vm = this;
      setTimeout(() => {
        window.scroll(0, 0);
      }, 0);
    },
    fontChange(val) {
      console.log(val);
      let html = document.getElementsByTagName("html")[0];
      switch (val) {
        case "smaller":
          html.style.fontSize = "55.6%";
          break;
        case "normal":
          html.style.fontSize = "62.5%";
          break;
        case "larger":
          html.style.fontSize = "71.4%";
          break;
        default:
      }
    }
  }
};
</script>

<style lang="scss">
.loginPage button {
  border-radius: 0px 0px 4px 4px;
}

.loginPage .el-button span {
  font-size: $font-size-14px !important;
}

.loginPage .el-input__inner {
  border-style: none solid;
  border-radius: 0;
}
</style>

<style scoped lang="scss">
.loginPage {
  width: 100vw;
  height: 100vh;
  background: $cover-bakcground-color;
}

.loginPageContent {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80vw;
}
.loginPageImg {
  width: 100%;
  height: 20vh;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
}
button {
  width: 100%;
  background-color: #dedede;
  color: #1880fe;
}

.selectFontSize {
  float: right;
}

.selectFontSize span {
  color: $blue-color;
}
</style>
