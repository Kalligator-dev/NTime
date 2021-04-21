<template>
  <div id="home-app">
    <div id="home-app-main">
      <div id="home-app-view">
        <div id="logo-banner">
          <img
            src="../../assets/logo_wt.png"
            alt="logo-white"
            class="logo-img"
            v-if="darkMode"
          />
          <img
            v-else
            src="../../assets/logo_bk.png"
            alt="logo-black"
            class="logo-img"
          />
        </div>

        <div class="container scrollable" id="home-text">
          <p>
            Welcome to N time app. We hope it helps you organize your day for
            efficiency and better time management. If you are new to using
            Ntime, please read
            <span class="emphasis" @click="instOpen = !instOpen"
              >the instructions</span
            >
          </p>
          <transition name="zoom" mode="out-in">
            <ul id="instructions" v-if="instOpen">
              <li>
                Click on New to create an account and plan your day. You will
                run through steps to plan your work/off days depending on your
                choice.
              </li>
              <li>
                Right Now, the app only allows sleeping hours from
                12am(mid-night). Make sure you pick start sleeping time at or
                after that.
              </li>
              <li>
                When entering your breaks, don't bother adding 5min
                rests/mini-breaks during work hours as those can be added by the
                app later by the mini-break button.
              </li>
              <li>
                12:00 am is mid-night. 12:00 pm is noon. Just for reference
              </li>
              <li>
                On the app page, click on the clock to show or hide seconds if
                that is distracting.
              </li>
              <li>
                During your mini-breaks, make sure to change your routine. If
                you have an office job, stand-up or have a light walk every
                break. If you feel stressed, clear up your mind.
              </li>
              <li>
                Remember, having a nice time is essential for working
                efficiently.
              </li>
              <li>
                If you have a question or something to report, please contact us
                by clicking the contact button on the bottom left of your
                screen.
              </li>
            </ul>
          </transition>
        </div>

        <div id="home-btns">
          <router-link
            to="/app"
            tag="button"
            id="app-btn-home"
            class="form-btn"
            v-if="loggedIn"
            >Back to App</router-link
          >
          <button
            class="form-btn"
            id="new-btn-home"
            v-if="!loggedIn"
            @click="regBtnClicked"
          >
            New
          </button>
          <button
            class="form-btn"
            id="login-btn-home"
            v-if="!loggedIn"
            @click="logBtnClicked"
          >
            Login
          </button>
        </div>
      </div>
      <app-settings></app-settings>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import Settings from "../home/Settings";
import Footer from "../Footer";
export default {
  data() {
    return {
      instOpen: false,
    };
  },
  computed: {
    darkMode() {
      return this.$store.getters.darkMode;
    },
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
  },
  components: {
    AppSettings: Settings,
    AppFooter: Footer,
  },
  methods: {
    regBtnClicked() {
      this.$store.dispatch("updateUserComp", "register");
      if (this.$router.currentRoute.path !== "/user")
        this.$router.replace("/user");
    },
    logBtnClicked() {
      this.$store.dispatch("updateUserComp", "login");
      if (this.$router.currentRoute.path !== "/user")
        this.$router.replace("/user");
    },
  },
  beforeCreate() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.$store.dispatch("updateLoggedIn", false);
      } else {
        this.$store.dispatch("updateLoggedIn", true);
      }
    });
  },
};
</script>

<style>
#home-app {
  height: 100%;
}
#home-app-main {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
#home-app-view {
  height: 100%;
}
#logo-banner {
  max-height: 40%;
  font-family: "Dosis", sans-serif;
  font-weight: 100;
  font-size: 3.5rem;
  color: var(--col-3);
  margin: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
#logo-banner .logo-img {
  width: 15rem;
  padding: 1rem;
  margin-top: 2rem;
}
#logo-banner #logo-block {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}
#logo-banner #logo {
  width: 5.5rem;
  display: block;
  margin-right: 1vw;
  margin-left: 1vw;
  transform: translate(0, 11.25%);
}
#logo-banner #logo-txt {
  display: inline-block;
  color: #e4e4e4;
}
#logo-banner #logo-txt #t {
  font-size: 4rem;
}
#logo-banner #logo-txt #n,
#logo-banner #logo-txt #ime {
  font-size: 3.5rem;
}
#logo-banner .line-svg {
  vertical-align: top;
  width: 50%;
  transform: translate(50%, 0);
}

#home-text {
  padding: 2rem;
  font-size: 1.3rem;
  color: var(--col-0);
  border: solid 1px var(--col-4);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50%;
  width: 75%;
}
#home-text p {
  text-align: center;
  padding: 1rem;
}
#home-text p .emphasis {
  color: var(--col-2);
  cursor: pointer;
}
#home-text #instructions {
  opacity: 0.8;
  padding: 1rem;
  margin-top: 0.5rem;
  margin-left: 2rem;
  width: 85%;
  font-size: 1.1rem;
  color: var(--col-0);
  line-height: 1.5rem;
  min-height: 0;
}

#home-btns {
  position: relative;
  padding: 1rem;
  margin-top: 2rem;
}
#app-btn-home {
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translate(-50%, 0);
}
#new-btn-home {
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translate(-50%, 0);
}
#login-btn-home {
  position: absolute;
  bottom: 10%;
  right: 10%;
}

@media (max-width: 640px) {
  #home-app {
    overflow: hidden;
  }
  #home-app-main {
    position: relative;
    width: 93%;
    height: 85%;
  }
  #home-app-view {
    width: 100%;
  }
  #home-text {
    padding: 0.5rem;
    height: 50%;
    justify-content: center;
  }
  #home-text p {
    padding: 0rem;
    font-size: 1.15rem;
  }
  #home-text #instructions {
    padding: 0.5rem;
    margin-top: 0.5rem;
    margin-left: 2rem;
    width: 100%;
    font-size: 1rem;
  }

  #home-btns {
    margin-top: 1rem;
  }
  #new-btn-home {
    left: 20%;
    transform: translate(0, 0);
  }
  #login-btn-home {
    right: 20%;
  }
  #app-btn-home {
    bottom: 0;
  }
}
</style>
