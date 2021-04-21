<template>
  <div class="container">
    <router-view v-slot="slotProps">
      <transition name="zoom" mode="out-in">
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import { db } from "./firebase/db";
export default {
  data() {
    return {
      uid: null,
    };
  },
  computed: {
    darkMode() {
      return this.$store.getters.darkMode;
    },
  },
  watch: {
    darkMode() {
      this.computeVars();
      if (this.uid) {
        db.collection("users")
          .doc(this.uid)
          .update({ darkMode: this.darkMode });
      }
    },
  },
  methods: {
    computeVars() {
      if (this.darkMode) {
        document.documentElement.style.setProperty("--err-bg", "#2D142C90");
        document.documentElement.style.setProperty("--col-00", "#d3d3d3");
        document.documentElement.style.setProperty("--col-00-t", "#d3d3d303");
        document.documentElement.style.setProperty("--col-00-tt", "#d3d3d320");
        document.documentElement.style.setProperty("--col-00-ttt", "#d3d3d310");
        document.documentElement.style.setProperty("--col-00-ht", "#d3d3d390");
        document.documentElement.style.setProperty("--col-00-htt", "#d3d3d385");
        document.documentElement.style.setProperty("--col-0", "#e2e2e2");
        document.documentElement.style.setProperty("--col-0-t", "#e2e2e205");
        document.documentElement.style.setProperty("--col-0-ht", "#e2e2e277");
        document.documentElement.style.setProperty("--col-5", "#2D142C");
        document.documentElement.style.setProperty("--col-6", "#EE4540");
        document.documentElement.style.setProperty("--col-7", "#C72C41");
        document.documentElement.style.setProperty("--col-8", "#801336");
        document.documentElement.style.setProperty("--col-9", "#510A32");
        document.documentElement.style.setProperty("--col-10", "#2D142C");
        document.documentElement.style.setProperty("--col-v1", "#55B528");
        document.documentElement.style.setProperty(
          "--col-v1-cd-t",
          "#32361880"
        );
        document.documentElement.style.setProperty("--col-v2", "#6F40EE");
        document.documentElement.style.setProperty("--col-v2-d-t", "#141E2D80");
        document.documentElement.style.setProperty("--col-v3", "#EEA340");
        document.documentElement.style.setProperty("--col-v3-d-t", "#2D181480");
        document.documentElement.style.setProperty(
          "--gra-work",
          "linear-gradient(#6F40EE60, #141E2D)"
        );
        document.documentElement.style.setProperty(
          "--gra-break",
          "linear-gradient(#42F74860, #323618)"
        );
        document.documentElement.style.setProperty(
          "--gra-sleep",
          "linear-gradient(#EEA34060, #2D1814)"
        );
      } else {
        document.documentElement.style.setProperty("--err-bg", "#2D142C");
        document.documentElement.style.setProperty("--col-00", "#333333");
        document.documentElement.style.setProperty("--col-00-t", "#33333303");
        document.documentElement.style.setProperty("--col-00-tt", "#33333320");
        document.documentElement.style.setProperty("--col-00-ttt", "#33333310");
        document.documentElement.style.setProperty("--col-00-ht", "#33333390");
        document.documentElement.style.setProperty("--col-00-htt", "#33333385");
        document.documentElement.style.setProperty("--col-0", "#510A32");
        document.documentElement.style.setProperty("--col-0-t", "#13131312");
        document.documentElement.style.setProperty("--col-0-ht", "#e2e2e277");
        document.documentElement.style.setProperty("--col-5", "#e2e2e2");
        document.documentElement.style.setProperty("--col-6", "#EE4540");
        document.documentElement.style.setProperty("--col-7", "#C72C41");
        document.documentElement.style.setProperty("--col-8", "#801336");
        document.documentElement.style.setProperty("--col-9", "#510A32");
        document.documentElement.style.setProperty("--col-10", "#2D142C");
        document.documentElement.style.setProperty("--col-v1", "#093614");
        document.documentElement.style.setProperty("--col-v1-cd-t", "#daface");
        document.documentElement.style.setProperty("--col-v2", "#141E2D");
        document.documentElement.style.setProperty("--col-v2-d-t", "#d3c7f7");
        document.documentElement.style.setProperty("--col-v3", "#2D1814");
        document.documentElement.style.setProperty("--col-v3-d-t", "#f7e6d0");
        document.documentElement.style.setProperty(
          "--gra-work",
          "linear-gradient(#702bc0, #141E2D)"
        );
        document.documentElement.style.setProperty(
          "--gra-break",
          "linear-gradient(#16991b, #323618)"
        );
        document.documentElement.style.setProperty(
          "--gra-sleep",
          "linear-gradient(#EEA340, #2D1814)"
        );
      }
    },
  },
  created() {
    this.computeVars();
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.$store.dispatch("updateLoggedIn", false);
      } else {
        let userDoc = db.collection("users").doc(user.uid);
        userDoc.get().then((doc) => {
          let data = doc.data();
          this.$store.dispatch("updateName", user.displayName);
          this.$store.dispatch("updateTasks", data.tasks);
          this.$store.dispatch("updateDM", data.darkMode);
          let tt = data.timetable;
          if (tt.length) {
            this.$store.dispatch("updateTT", JSON.parse(tt));
          }
          this.uid = user.uid;
          this.$store.dispatch("updateUID", user.uid);
          localStorage.setItem("name", user.displayName);
            this.$store.dispatch("updateLoggedIn", true);
        });
      }
    });
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;
  font-family: "Barlow Semi Condensed", sans-serif;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  -webkit-text-fill-color: var(--col-0);
  transition: background-color 5000s ease-in-out 0s;
}

:root {
  --col-99-t: #13131310;
  --col-99: #131313;
  --col-0: #e2e2e2;
  --col-0-t: #e2e2e205;
  --col-0-tt: #e2e2e250;
  --col-0-ht: #e2e2e277;
  --col-00: #d3d3d3;
  --col-00-t: #d3d3d303;
  --col-00-tt: #d3d3d320;
  --col-00-ttt: #d3d3d310;
  --col-00-ht: #d3d3d390;
  --col-00-htt: #d3d3d350;
  --col-1: #ee4540;
  --col-2: #c72c41;
  --col-3: #801336;
  --col-4: #510a32;
  --col-5: #2d142c;
  --col-6: #ee4540;
  --col-7: #c72c41;
  --col-8: #801336;
  --col-9: #510a32;
  --col-10: #2d142c;
  --col-v1: #55b528;
  --col-v1-l: #42f748;
  --col-v1-ll: #76f741;
  --col-v1-d: #093614;
  --col-v1-c: #eea340;
  --col-v1-cc: #9b6524;
  --col-v1-cd: #323618;
  --col-v1-cd-t: #32361880;
  --col-v1-cdd: #2d1814;
  --col-v2: #6f40ee;
  --col-v2-d: #141e2d;
  --col-v2-d-t: #141e2d80;
  --col-v3: #eea340;
  --col-v3-d: #2d1814;
  --col-v3-d-t: #2d181480;
  --col-v4: #4244ee;
  --col-v4-l: #6f40ee;
  --col-v4-c: #ea8559;
  --col-v4-cc: #bf82ee;
  --col-v4-d: #08092d;
  --col-v4-dd: #142b2d;
  --col-v4-dd: #141e2d;
  --col-approved: green;
  --col-rejected: yellow;
  --err-bg: #2d142c90;
  --gra-work: linear-gradient(#6f40ee60, #141e2d);
  --gra-break: linear-gradient(#42f74860, #323618);
  --gra-sleep: linear-gradient(#eea34060, #2d1814);
  --gra-trial: linear-gradient(#16991b, #141e2d);
}

html {
  height: 100%;
}

body {
  height: 100%;
  background: var(--col-5);
  overflow: hidden;
}

#app {
  height: 100%;
  overflow: hidden;
  font-family: "Barlow Semi Condensed", sans-serif;
}

.container {
  max-width: 95%;
  height: 100%;
  padding: 1rem;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

a {
  text-decoration: none;
}

.scrollable {
  overflow-x: hidden;
  overflow-y: auto;
}
.scrollable::-webkit-scrollbar {
  width: 2px;
  background: var(--col-4);
}
.scrollable::-webkit-scrollbar-thumb {
  background-color: var(--col-2);
}

.err {
  width: 100%;
  background-color: var(--err-bg);
  padding: 0.5rem 1rem;
  position: absolute;
  z-index: 10;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
}
.err .err-msg,
.err .success-msg {
  padding: 0.5rem;
  border: solid 1px;
  border-radius: 5px;
  text-align: center;
}
.err .err-msg {
  border-color: var(--col-rejected);
  color: var(--col-rejected);
}
.err .success-msg {
  border-color: var(--col-approved);
  color: var(--col-approved);
}

.show-err-enter-active {
  animation: show-err-in 400ms ease-out forwards;
}
.show-err-leave-active {
  animation: show-err-out 400ms ease-out forwards;
}
@keyframes show-err-in {
  from {
    transform: translate(-50%, 100%);
    opacity: 0;
  }

  to {
    transform: translate(-50%, 0);
    opacity: 1;
  }
}
@keyframes show-err-out {
  from {
    transform: translate(-50%, 0);
    opacity: 1;
  }

  to {
    transform: translate(-50%, 100%);
    opacity: 0;
  }
}

.zoom-enter-active {
  animation: zoom-in 400ms ease-out forwards;
}
.zoom-leave-active {
  animation: zoom-out 400ms ease-out forwards;
}
@keyframes zoom-in {
  from {
    scale: 1.2;
    opacity: 0;
  }

  to {
    scale: 1;
    opacity: 1;
  }
}
@keyframes zoom-out {
  from {
    scale: 1;
    opacity: 1;
  }

  to {
    scale: 1.2;
    opacity: 0;
  }
}
</style>
