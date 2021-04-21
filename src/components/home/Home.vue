<template>
  <component :is="comp"></component>
</template>

<script>
import LogoAnim from "./LogoNew";
import HomeApp from "./HomeApp";
export default {
  data() {
    return {
      comp: "logo-anim",
    };
  },
  computed: {
    newApp() {
      return this.$store.getters.newApp;
    },
  },
  components: {
    LogoAnim,
    HomeApp,
  },
  mounted() {
    if (this.newApp) {
      this.comp = "logo-anim";
      setTimeout(() => {
        this.comp = "home-app";
        this.$store.dispatch("switchNewApp");
      }, 4200);
    } else {
      this.comp = "home-app";
    }
  },
};
</script>
