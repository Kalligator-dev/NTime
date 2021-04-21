<template>
  <div id="app-header-new">
    <div id="app-logo-new" @click="goToHome">
      <img
        src="../assets/logo_wt.png"
        alt="logo-white"
        class="logo-img-new"
        v-if="darkMode"
      />
      <img
        v-else
        src="../assets/logo_bk.png"
        alt="logo-black"
        class="logo-img-new"
      />
    </div>
    <div id="header-icon-bar">
      <transition name="show-label" mode="out-in">
        <div
          class="icon-user app-icon"
          @click="goToProfile"
          @mouseleave="showProfile = false"
          @mouseenter="showProfile = true"
          v-if="loggedIn && profileReady"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 194 194">
            <circle class="cls-2 cls-3" cx="96.74" cy="53.03" r="20.94" />
            <path
              class="cls-2 cls-3"
              d="M106.65,162.91H87.35a26.33,26.33,0,0,1-25.72-32L68.67,98.8A26.33,26.33,0,0,1,94.4,78.11H99.6A26.33,26.33,0,0,1,125.33,98.8l7.05,32.13A26.33,26.33,0,0,1,106.65,162.91Z"
            />
            <path
              class="cls-2 cls-3"
              d="M97,12A85,85,0,1,1,12,97,85,85,0,0,1,97,12M97,0a97,97,0,1,0,97,97A97.11,97.11,0,0,0,97,0Z"
            />
          </svg>
          <transition name="show-label" mode="out-in">
            <div class="label" v-show="showProfile">Profile</div>
          </transition>
        </div>
      </transition>
      <transition name="show-label" mode="out-in">
        <div
          class="icon-new app-icon"
          @click="newTTClicked"
          @mouseenter="showNew = true"
          @mouseleave="showNew = false"
          v-if="loggedIn && verified"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 182 199">
            <path
              class="cls-2"
              d="M142.78,0H39.22A39.27,39.27,0,0,0,0,39.22V159.78A39.27,39.27,0,0,0,39.22,199H142.78A39.27,39.27,0,0,0,182,159.78V39.22A39.27,39.27,0,0,0,142.78,0ZM170,159.78A27.25,27.25,0,0,1,142.78,187H39.22A27.25,27.25,0,0,1,12,159.78V39.22A27.25,27.25,0,0,1,39.22,12H142.78A27.25,27.25,0,0,1,170,39.22Z"
            />
            <path
              class="cls-1"
              d="M142.78,12H39.22A27.25,27.25,0,0,0,12,39.22V159.78A27.25,27.25,0,0,0,39.22,187H142.78A27.25,27.25,0,0,0,170,159.78V39.22A27.25,27.25,0,0,0,142.78,12ZM158,111.16a7.78,7.78,0,0,1-7.77,7.77H120.54a10.64,10.64,0,0,0-10.61,10.61v29.69a7.77,7.77,0,0,1-7.77,7.77H78.84a7.78,7.78,0,0,1-7.77-7.77V129.54a10.64,10.64,0,0,0-10.61-10.61H30.77A7.77,7.77,0,0,1,23,111.16V87.84a7.78,7.78,0,0,1,7.77-7.77H60.46A10.64,10.64,0,0,0,71.07,69.46V39.77A7.77,7.77,0,0,1,78.84,32h23.32a7.78,7.78,0,0,1,7.77,7.77V69.46a10.64,10.64,0,0,0,10.61,10.61h29.69A7.77,7.77,0,0,1,158,87.84Z"
            />
            <path
              class="cls-2"
              d="M80.22,159a6.85,6.85,0,0,1-6.85-6.85V126A9.36,9.36,0,0,0,64,116.63H37.85A6.85,6.85,0,0,1,31,109.78V89.22a6.85,6.85,0,0,1,6.85-6.85H64A9.36,9.36,0,0,0,73.37,73V46.85A6.85,6.85,0,0,1,80.22,40h20.56a6.85,6.85,0,0,1,6.85,6.85V73A9.36,9.36,0,0,0,117,82.37h26.17A6.85,6.85,0,0,1,150,89.22v20.56a6.85,6.85,0,0,1-6.85,6.85H117a9.36,9.36,0,0,0-9.35,9.35v26.17a6.85,6.85,0,0,1-6.85,6.85Z"
            />
          </svg>
          <transition name="show-label" mode="out-in">
            <div class="label" v-show="showNew">New</div>
          </transition>
        </div>
      </transition>
      <transition name="show-label" mode="out-in">
        <div
          class="icon-log app-icon"
          @click="logIn"
          @mouseleave="showLog = false"
          @mouseenter="showLog = true"
        >
          <template v-if="loggedIn && verified">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 194 194">
              <path
                class="cls-2 cls-3"
                d="M97,12A85,85,0,1,1,12,97,85,85,0,0,1,97,12M97,0a97,97,0,1,0,97,97A97.11,97.11,0,0,0,97,0Z"
              />
              <path
                class="cls-2 cls-3"
                d="M160,62.8v69.4a28.89,28.89,0,0,1-28.85,28.86H70.61a4.74,4.74,0,0,1,0-9.47h60.54a19.41,19.41,0,0,0,19.38-19.39V62.8a19.41,19.41,0,0,0-19.38-19.39H70.61a4.73,4.73,0,0,1,0-9.47h60.54A28.89,28.89,0,0,1,160,62.8Z"
              />
              <path
                class="cls-2 cls-3"
                d="M100,97.19a3.5,3.5,0,0,1-3.49,3.49H48.28l14.07,14.07a3.49,3.49,0,1,1-4.94,4.93L36.76,99a2.64,2.64,0,0,1,0-3.7L57.41,74.7a3.58,3.58,0,0,1,4.94,0,3.49,3.49,0,0,1,0,4.93L48.28,93.7H96.5A3.49,3.49,0,0,1,100,97.19Z"
              />
            </svg>
          </template>
          <template v-else>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 194 194">
              <path
                class="cls-2 cls-3"
                d="M97,12A85,85,0,1,1,12,97,85,85,0,0,1,97,12M97,0a97,97,0,1,0,97,97A97.11,97.11,0,0,0,97,0Z"
              />
              <path
                class="cls-2 cls-3"
                d="M160,61.8v69.4a28.89,28.89,0,0,1-28.85,28.86H70.61a4.74,4.74,0,0,1,0-9.47h60.54a19.41,19.41,0,0,0,19.38-19.39V61.8a19.41,19.41,0,0,0-19.38-19.39H70.61a4.73,4.73,0,0,1,0-9.47h60.54A28.89,28.89,0,0,1,160,61.8Z"
              />
              <path
                class="cls-2 cls-3"
                d="M99.22,98,78.58,118.68a3.49,3.49,0,1,1-4.94-4.93L87.71,99.68H39.49a3.49,3.49,0,0,1,0-7H87.71L73.64,78.63a3.49,3.49,0,0,1,4.94-4.94L99.22,94.34A2.61,2.61,0,0,1,99.22,98Z"
              />
            </svg>
          </template>
          <transition name="show-label" mode="out-in">
            <div class="label" v-show="showLog">
              {{ loggedIn && verified ? "Logout" : "Login" }}
            </div>
          </transition>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
export default {
  data() {
    return {
      showProfile: false,
      showLog: false,
      iconBar: true,
      showNew: false,
      profileReady: false,
    };
  },
  computed: {
    headerState() {
      return this.$store.getters.headerState;
    },
    darkMode() {
      return this.$store.getters.darkMode;
    },
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
    verified() {
      return this.$store.getters.verified;
    },
  },
  watch: {
    headerState() {
      const winWidth = window.innerWidth;
      if (winWidth > 640) {
        this.realignItems();
      }
    },
  },
  methods: {
    goToProfile() {
      this.$router.replace("/new");
    },
    newTTClicked() {
      this.$router.replace("/new");
    },
    goToHome() {
      this.$router.replace("/");
    },
    logIn() {
      if (this.loggedIn && this.verified) {
        firebase
          .auth()
          .signOut()
          .then(() => {
            this.$store.dispatch("updateLoggedIn", false);
            this.$store.dispatch("updateUserComp", "login");
            if (this.$router.currentRoute.path !== "/")
              this.$router.replace("/");
          })
          .catch((e) => {
            console.log(e.code);
          });
      } else {
        this.$store.dispatch("updateUserComp", "login");
        if (this.$router.currentRoute.path !== "/user")
          this.$router.replace("/user");
      }
    },
    realignItems() {
      const icons = document.querySelector("#app-header-new");
      const logo = icons.children[0];
      const iconBar = icons.children[1];
      setTimeout(() => {
        if (this.headerState % 5 === 0) {
          logo.style.transform = "translateX(-10vw)";
          iconBar.style.transform = "translateX(-10vw)";
        } else {
          iconBar.style.transform = "translateX(0)";
          logo.style.transform = "translateX(0)";
        }
      }, 50);
    },
  },
  beforeUnmount() {
    this.$store.dispatch("updateHeaderState", [1, "r"]);
  },
};
</script>

<style>
#app-header-new {
  position: fixed;
  top: 0;
  left: 4%;
  width: 92%;
  height: 10%;
  z-index: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  transition: all 1s ease-in-out;
  color: var(--col-0);
  text-align: center;
}
#app-logo-new {
  padding: 0.5rem;
  padding-right: 1.25rem;
  border-right: 2px solid var(--col-0-t);
  transition: all 0.85s ease-in-out;
}
#app-logo-new:hover {
  filter: hue-rotate(180deg);
}
.logo-img-new {
  width: 10rem;
}

#header-icon-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.75s ease-in-out;
}

.app-icon:hover svg .cls-3 {
  fill: var(--col-2);
}

@media (max-width: 640px) {
  #app-header-new {
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 4rem;
    z-index: 20;
    display: flex;
    justify-content: space-between;
    background: var(--col-5);
  }
  #app-logo-new {
    padding: 0rem;
    padding-right: 0rem;
    margin-left: 0.75rem;
    border: none;
    transition: all 0.85s ease-in-out;
  }
  .logo-img-new {
    width: 9rem;
  }
}
</style>
