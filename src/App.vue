<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
  }
}
};
</script>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
}
html {
  font-size: 62.5%;
}

body{
  font-size: 1.4rem;
  font-family: $font-family;
}

</style>
