<template>
  <div class="WP">
    <div v-if="firstLogin">
      <v-touch
        v-if="firstLogin"
        v-on:swipeleft="onSwipeLeft(page)"
      >
        <!-- <keep-alive> -->
          <router-view></router-view>
        <!-- </keep-alive> -->
      </v-touch>

      <div class="dots">
        <i v-for="(tab, index) in tabs" :key="index">
          <div v-if="page === index+1 && tabs[page-1].type==='slide' " class="dot activeDot"></div>
          <div v-else-if="tab.type==='slide' && tabs[page-1].type ==='slide' " class="dot"></div>
          <div v-else-if="tab.type==='enter' && page === index+1 &&tabs[page-1].type ==='enter'">
            <button round @click="toIndex">马上体验</button>
          </div>
        </i>
      </div>
    </div>

    <div v-else>
      <router-view></router-view>
      <div class="dots">
        <button round @click="toIndex">马上体验</button>
      </div>
    </div>
  </div>
</template>
 
 
<script>
export default {
  name: "WP",
  data() {
    return {
      page: 1,
      firstLogin: true,
      showButton: false,
      tabs: [
        {
          name: "welcome1",
          path: "/1",
          type: "slide"
        },
        {
          name: "welcome2",
          path: "/2",
          type: "slide"
        },
        {
          name: "welcome3",
          path: "/3",
          type: "enter"
        }
      ]
    };
  },
  updated() {
      let name = this.$router.history.current.name;
      console.log();
      if(name === "welcome3"){
        this.page = 3;
      }else if(name === "welcome2"){
         this.page =2;
      }else{
        this.page=1;
      }
  },
  mounted() {
      
    let num = localStorage.getItem(`jassen${this.GLOBAL.userData.wwid}login`);
    if (num === null) {
      this.firstLogin = true;
    } else {
      this.firstLogin = false;
    }
    this.$router.push({ path: `/welcomePage/${this.page}` });
  },
  methods: {
    onSwipeLeft: function() {
      if (this.page < this.tabs.length) {
        this.page++;
        this.$router.push({ path: `/welcomePage/${this.page}` });
      }
    },
    onSwipeRight: function() {
      if (this.page > 1) {
        this.page--;
        this.$router.push({ path: `/welcomePage/${this.page}` });
      }
    },
    toIndex() {
      this.$router.push({ path: `/index` });
    }
  }
};
</script>
 
 
<style lang="scss" scoped>
.dots {
  position: fixed;
  bottom: calc((116 / 300) * (300 / 750) * 100vw);
  width: 100vw;
  text-align: center;
}
.dots1 {
  position: fixed;
  bottom: 10vh;
  width: 100vw;
  text-align: center;
}
.dot {
  display: inline-block;
  background-color: #c3c2c1;
  width: 2vw;
  height: 2vw;
  border-radius: 50%;
  margin-right: 5vw;
}
.activeDot {
  background-color: orange;
}
.WP button {
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(35, 100, 253, 1);
  font-size: $font-size-18px;
  background: rgba(255, 255, 255, 1);
  height: calc((80 / 300) * (300 / 740) * 100vw);
  box-shadow: 0px 4px 5.5px 4px rgba(13, 115, 239, 1);
  border-radius: 40px;
  border: 3px solid rgba(255, 255, 255, 1);
  width: calc((300 / 740) * 100vw);
}
</style>