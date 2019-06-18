<template>
  <div id="app" :style="{ backgroundImage: 'url(' + require('@/assets/img/backStars.png') + ')' }">
    <!-- <div id="nav">
    Home</router-link>|
    </div>-->
    <div class="titleApp">
      <h1>
        <router-link to="/">Welcome to Star Wars Universe</router-link>
      </h1>
    </div>
    <div class="spinnerWrap" v-if="loading">
      <cube-shadow></cube-shadow>
    </div>
    <router-view/>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { CubeShadow } from "vue-loading-spinner";

export default {
  name: "home",
  components: {
    CubeShadow
  },

  computed: {
    ...mapGetters(["loading"])
  }
};
</script>
<style lang="scss">
@font-face {
  font-family: "Star Jedi";
  src: url("//db.onlinewebfonts.com/t/af7c07faaff0d16720c25db7990579e2.eot");
  src: url("//db.onlinewebfonts.com/t/af7c07faaff0d16720c25db7990579e2.eot?#iefix")
      format("embedded-opentype"),
    url("//db.onlinewebfonts.com/t/af7c07faaff0d16720c25db7990579e2.woff2")
      format("woff2"),
    url("//db.onlinewebfonts.com/t/af7c07faaff0d16720c25db7990579e2.woff")
      format("woff"),
    url("//db.onlinewebfonts.com/t/af7c07faaff0d16720c25db7990579e2.ttf")
      format("truetype"),
    url("//db.onlinewebfonts.com/t/af7c07faaff0d16720c25db7990579e2.svg#Star Jedi")
      format("svg");
}
body {
  background: black;
}

.titleApp {
  padding: 30px 0px;

  a {
    text-decoration: none !important;
  }
}

#app {
  // padding:30px;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #c6c6c6;
}

a {
  color: #c6c6c6;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: orange;
    &.router-link-exact-active {
      color: #2c3e50;
    }
  }
}

.spinnerWrap {
  position: absolute;
    top: 35px;
    right: 35px;
  .spinner {
    background-color: white !important;
  }
}
</style>
