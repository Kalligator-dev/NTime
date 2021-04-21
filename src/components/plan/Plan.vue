<template>
  <div id="plan-new">
    <template v-if="uid">
      <form class="form">
        <div id="header-new" class="main-header header-block">
          <h1>Plan new</h1>
        </div>
        <transition :name="transitionName" mode="out-in">
          <keep-alive>
            <component :is="comp"></component>
          </keep-alive>
        </transition>
        <button class="form-btn" id="sub-btn" @click.prevent="subBtnClicked">
          {{ subButtonTxt }}
        </button>
        <button
          class="form-btn"
          id="back-btn"
          v-if="backBtnActivated"
          @click.prevent="backBtnClicked"
        >
          Back
        </button>
        <button
          class="form-btn"
          id="cancel-new-btn"
          v-if="timetable.length"
          @click.prevent="cancelBtnClicked"
        >
          Back To App
        </button>
        <transition name="show-err" mode="out-in">
          <div class="err" v-if="errShow">
            <p class="err-msg" v-if="errErr">
              {{ err.msg }}
            </p>
            <p class="success-msg" v-else>
              {{ err.msg }}
            </p>
          </div>
        </transition>
      </form>
      <app-footer></app-footer>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import Sleep from "./Sleep";
import Work from "./Work";
import Breaks from "./Breaks";
import Tasks from "./Tasks";
import Footer from "../Footer";
import firebase from "firebase/app";
import "firebase/auth";
import { db } from "../../firebase/db";
export default {
  data() {
    return {
      comp: "sleep",
      subButtonTxt: "Next",
      backBtnActivated: false,
      transitionName: "swap-lt",
      errShow: false,
      errErr: false,
      uid: null,
    };
  },
  computed: {
    ...mapGetters([
      "err",
      "valid",
      "total",
      "work",
      "subBtnClick",
      "responseUpdate",
      "stata",
      "timetable",
      "tasks",
    ]),
  },
  watch: {
    responseUpdate() {
      this.subProceed();
    },
  },
  methods: {
    ...mapActions([
      "updateTotal",
      "updateValid",
      "showErr",
      "clickSub",
      "createTT",
    ]),
    subBtnClicked() {
      if (this.comp === "sleep") {
        this.clickSub(1);
      } else if (this.comp === "work") {
        this.clickSub(2);
      } else if (this.comp === "breaks") {
        this.clickSub(3);
      } else if (this.comp === "tasks") {
        this.clickSub(4);
      }
    },
    subProceed() {
      if (this.valid !== 0) {
        this.transitionName = "swap-lt";
        this.updateTotal();
        if (this.comp === "sleep") {
          this.comp = "breaks";
          this.backBtnActivated = true;
        } else if (this.comp === "breaks") {
          if (this.err.type === 2) {
            this.errShow = true;
            this.errErr = false;
            setTimeout(() => {
              this.errShow = false;
              this.errErr = false;
            }, 2500);
          }
          this.comp = "work";
        } else if (this.comp === "work") {
          this.comp = "tasks";
          this.subButtonTxt = "Submit";
        } else if (this.comp === "tasks") {
          this.subButtonTxt = "HOLA";
          this.createTT();
          setTimeout(() => {
            let user = firebase.auth().currentUser;
            let uid;
            if (user !== null) {
              uid = user.uid;
            }
            db.collection("users")
              .doc(uid)
              .update({
                timetable: JSON.stringify(this.timetable),
                tasks: this.tasks,
              })
              .then(() => {
                this.$router.push("/app");
              });
          }, 500);
        }
      } else {
        if (this.err.type === 1) {
          this.errShow = true;
          this.errErr = true;
          setTimeout(() => {
            this.errShow = false;
            this.errErr = false;
          }, 2500);
        } else {
          if (this.err.type === 2) {
            this.errShow = true;
            this.errErr = false;
            setTimeout(() => {
              this.errShow = false;
              this.errErr = false;
              this.$store.dispatch("showErr", {});
              this.$store.dispatch("clickSub", 0);
            }, 2500);
          }
        }
      }
    },
    backBtnClicked() {
      this.transitionName = "swap-rt";
      if (this.comp === "tasks") {
        this.comp = "work";
        this.subButtonTxt = "Next";
      } else if (this.comp === "work") {
        this.comp = "breaks";
      } else if (this.comp === "breaks") {
        this.comp = "sleep";
        this.backBtnActivated = false;
      }
    },
    cancelBtnClicked() {
      this.$router.replace("/app");
    },
  },
  components: {
    Sleep,
    Work,
    Breaks,
    Tasks,
    AppFooter: Footer,
  },
  beforeCreate() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.$router.push("/");
      } else {
        this.uid = user.uid;
      }
    });
  },
};
</script>

<style>
#plan-new {
  width: 100%;
  height: 100%;
  padding: 1rem;
  margin: auto;
}

.header-block {
  margin-top: 0.5rem;
}
.header-block h1 {
  color: var(--col-3);
  text-align: center;
}
.header-block h2,
.header-block h3,
.header-block h4,
.header-block h5,
.header-block h6 {
  color: var(--col-0);
  margin-left: 1rem;
}

.m-header .line-svg {
  width: 60%;
}

/* .block-div {
        padding: 1rem;
        margin: 0.5rem;
        border-radius: 0.2rem;
        border: solid 0.1rem var(--col-3);
    } */

.div-block {
  margin-top: 1rem;
  padding: 1rem;
}

.line-svg {
  width: 100%;
  height: 0.2rem;
  stroke: var(--col-3);
}

.form {
  position: relative;
  height: 90%;
}

.form-block {
  padding: 0.5rem;
}

.form-btn {
  padding: 0.5rem 1.5rem;
  margin-top: 1rem;
  background-color: transparent;
  font-size: 1rem;
  color: var(--col-3);
  border: none;
  border-bottom: var(--col-3) solid 2px;
  transition: all 0.2s ease-in-out;
}
.form-btn:hover {
  color: var(--col-0);
  font-size: 1.2rem;
  border-top: var(--col-2) solid 2px;
  border-bottom-color: var(--col-2);
}

#sub-btn {
  position: absolute;
  right: 3rem;
  bottom: 1rem;
}
#back-btn {
  position: absolute;
  left: 3rem;
  bottom: 1rem;
}
#cancel-new-btn {
  position: absolute;
  right: 3rem;
  top: 0;
}

.mini-block {
  padding: 0.25rem;
  margin: 0 0.25rem;
  display: flex;
  flex-direction: column;
  width: 7rem;
}

.mini-block .line-svg {
  width: 50%;
}

label {
  color: var(--col-3);
  font-size: 1.2rem;
  display: block;
  margin-top: 0.25rem;
}

.extra-txt {
  font-size: 0.75rem;
  color: var(--col-2);
}

.input-field {
  background: none;
  border: none;
  padding: 0.5rem 0;
  margin-top: 0.2rem;
  color: var(--col-0);
  caret-color: var(--col-3);
}
.input-field:focus {
  color: var(--col-1);
}
.input-field:focus::selection {
  background: var(--col-3);
}
.input-field:focus:-moz-selection {
  background: var(--col-3);
}
.input-field::-webkit-outer-spin-button,
.input-field::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

.input-field ~ .line-svg {
  vertical-align: top;
}

.input-block {
  display: block;
  width: 100%;
}

.input-inline {
  display: inline-block;
}

.swap-rt-enter-active {
  animation: swap-rt-in 300ms ease-out forwards;
}
.swap-rt-leave-active {
  animation: swap-rt-out 300ms ease-out forwards;
}

@keyframes swap-rt-in {
  from {
    transform: translateX(-50%);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes swap-rt-out {
  from {
    transform: translateX(0);
    opacity: 1;
  }

  to {
    transform: translateX(50%);
    opacity: 0;
  }
}

.swap-lt-enter-active {
  animation: swap-lt-in 300ms ease-out forwards;
}
.swap-lt-leave-active {
  animation: swap-lt-out 300ms ease-out forwards;
}

@keyframes swap-lt-in {
  from {
    transform: translateX(50%);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes swap-lt-out {
  from {
    transform: translateX(0);
    opacity: 1;
  }

  to {
    transform: translateX(-50%);
    opacity: 0;
  }
}

@media (max-width: 640px) {
  #plan-new {
    padding: 0rem;
  }
  .header-block h2,
  .header-block h3,
  .header-block h4,
  .header-block h5,
  .header-block h6 {
    margin-left: 0rem;
  }

  .form-btn {
    padding: 0.5rem 1rem;
    margin-top: 0.2rem;
  }
  .form-btn:hover {
    color: var(--col-0);
    font-size: 1.2rem;
    border-top: var(--col-2) solid 2px;
    border-bottom-color: var(--col-2);
  }

  #sub-btn {
    position: absolute;
    right: 0rem;
    bottom: 0rem;
  }
  #back-btn {
    left: 0rem;
    bottom: 0rem;
  }
  #cancel-new-btn {
    right: 0rem;
    top: 2rem;
  }

  label {
    font-size: 1.1rem;
  }
}
</style>
