<template>
  <div id="user-app">
    <app-header></app-header>
    <template v-if="showUser">
      <transition name="zoom" mode="out-in">
        <component :is="userComp"></component>
      </transition>
    </template>
    <app-footer></app-footer>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import Header from "../NewHeader";
import Footer from "../Footer";
import Contact from "./Contact";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";
export default {
  data() {
    return {
      showUser: false,
    };
  },
  computed: {
    userComp() {
      return this.$store.getters.userComp;
    },
  },
  components: {
    AppHeader: Header,
    AppFooter: Footer,
    Contact,
    Login,
    Register,
    Profile,
  },
  created() {
    if (this.$router.currentRoute.path === "/contact") {
      this.$store.dispatch("updateUserComp", "contact");
    }
  },
  mounted() {
    if (this.userComp !== "contact") {
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          this.$store.dispatch("updateLoggedIn", false);
          this.$store.dispatch("updateUserComp", "login");
          this.showUser = true;
        } else {
          if (user.emailVerified) {
            this.$store.dispatch("updateLoggedIn", true);
            this.$store.dispatch("updateVerified", true);
            this.$store.dispatch("updateUserComp", "profile");
            this.showUser = true;
          } else {
            this.$store.dispatch("updateLoggedIn", false);
            this.$store.dispatch("updateUserComp", "login");
            this.showUser = true;
          }
        }
      });
    } else {
      this.showUser = true;
    }
  },
};
</script>

<style>
#user-app {
  width: 100%;
  height: 80%;
  text-align: center;
}
</style>
