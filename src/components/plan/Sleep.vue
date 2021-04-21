<template>
  <div id="sleep" class="div-block">
    <div class="m-header header-block">
      <h2>Sleeping Hours</h2>
      <svg viewBox="0 0 40 2" class="line-svg" preserveAspectRatio="none">
        <path d="M0 1 L40 1" />
      </svg>
    </div>
    <div class="form-block" id="sleeping-hours">
      <div class="mini-block" id="sleep-on">
        <label for="sleep-start">From</label>
        <input
          class="input-field"
          type="time"
          v-model="sleepTime"
          id="sleep-start"
          required
        />
        <input-line></input-line>
      </div>
      <div class="mini-block" id="sleep-off">
        <label for="sleep-end">To</label>
        <input
          class="input-field"
          type="time"
          v-model="wakeupTime"
          id="sleep-end"
          required
        />
        <input-line></input-line>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sleepTime: "00:00",
      wakeupTime: "08:00",
    };
  },
  computed: {
    subClicked() {
      return this.$store.getters.subBtnClick;
    },
  },
  watch: {
    subClicked() {
      if (this.subClicked === 1) {
        this.validateData();
      }
    },
  },
  methods: {
    validateData() {
      let sleep = Number.parseFloat(this.sleepTime.split(":").join("."));
      let wakeup = Number.parseFloat(this.wakeupTime.split(":").join("."));
      if (isNaN(sleep) || isNaN(wakeup)) {
        this.$store.dispatch("updateValid", 0);
        let type = 1;
        let msg = "Please fill-up sleeping hours";
        const err = { msg: msg, type: type };
        this.$store.dispatch("showErr", err);
      } else {
        if (sleep >= wakeup) {
          this.$store.dispatch("updateValid", 0);
          let type = 1;
          let msg = "Cannot start sleep at or after waking up";
          const err = { msg: msg, type: type };
          this.$store.dispatch("showErr", err);
        } else {
          this.$store.dispatch("updateSleep", { from: sleep, to: wakeup });
          this.$store.dispatch("updateValid", 1);
        }
      }
      this.$store.dispatch("updateResponse");
      this.$store.dispatch("clickSub", 0);
    },
  },
};
</script>

<style>
#sleep {
  display: flex;
  flex-direction: column;
}
#sleep #sleeping-hours {
  display: flex;
  align-self: flex-end;
}
</style>
