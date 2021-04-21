<template>
  <div class="tasks-edit-list" id="plan-new">
    <template v-if="uid">
      <form class="form">
        <div id="header-new" class="main-header header-block">
          <h1>{{ compTxt }}</h1>
        </div>
        <tasks></tasks>
        <button class="form-btn" id="sub-btn" @click.prevent="subBtnClicked">
          {{ subButtonTxt }}
        </button>
        <button class="form-btn" id="back-btn" @click.prevent="backBtnClicked">
          Cancel
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
import Tasks from "../plan/Tasks";
import Footer from "../Footer";
import { db } from "../../firebase/db";
export default {
  data() {
    return {
      compTxt: "Edit Tasks",
      subButtonTxt: "Save",
      errShow: false,
      errErr: false,
    };
  },
  computed: {
    ...mapGetters(["uid", "tasks", "responseUpdate", "valid", "err"]),
  },
  watch: {
    responseUpdate() {
      this.subProceed();
    },
  },
  components: {
    Tasks,
    AppFooter: Footer,
  },
  methods: {
    subBtnClicked() {
      this.$store.dispatch("clickSub", 4);
    },
    backBtnClicked() {
      this.$router.push("/app");
    },
    subProceed() {
      if (this.valid) {
        setTimeout(() => {
          db.collection("users")
            .doc(this.uid)
            .update({
              tasks: this.tasks,
            })
            .then(() => {
              this.$router.push("/app");
            });
        }, 500);
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
  },
};
</script>

<style>
#tasks-edit-btn {
  position: absolute;
  left: 50%;
  bottom: 2%;
  transform: translateX(-50%);
}
</style>
