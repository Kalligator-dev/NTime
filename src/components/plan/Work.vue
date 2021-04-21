<template>
  <div id="work" class="div-block">
    <div class="m-header header-block">
      <h2>Work Hours <span>(calculated based on your sleep & breaks)</span></h2>
      <svg viewBox="0 0 40 2" class="line-svg" preserveAspectRatio="none">
        <path d="M0 1 L40 1" />
      </svg>
    </div>
    <div class="form-block">
      <label for="work-duration">
        Work Hours
        <span class="extra-txt">(number of hours ex: 8.5 not 8.30)</span>
      </label>
      <input
        disabled
        class="input-field"
        type="number"
        id="work-duration"
        required
        placeholder="8.5"
        v-model.number="workHours"
      />
      <input-line></input-line>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    subClicked() {
      return this.$store.getters.subBtnClick;
    },
    workHours() {
      return this.$store.getters.work.toFixed(2);
    },
  },
  watch: {
    subClicked() {
      if (this.subClicked === 2) {
        this.validateWork();
      }
    },
  },
  methods: {
    validateWork() {
      if (this.workHours.length < 1) {
        this.$store.dispatch("updateValid", 0);
        let type = 1;
        let msg = "invalid entry. Re-check work hours";
        const err = { msg: msg, type: type };
        this.$store.dispatch("showErr", err);
      } else {
        if (this.workHours < 0 || this.workHours > 20) {
          this.$store.dispatch("updateValid", 0);
          let type = 1;
          let msg = "Please enter a number between 0 & 20";
          const err = { msg: msg, type: type };
          this.$store.dispatch("showErr", err);
        } else {
          this.$store.dispatch("updateWork", this.workHours);
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
#work {
  display: flex;
  flex-direction: column;
}
#work h2 span {
  color: var(--col-3);
  font-size: 1.1rem;
}
#work .form-block {
  align-self: flex-end;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#work input {
  padding: 0.5rem;
  background: var(--col-0-t);
  display: block;
  text-align: center;
}
#work input + .line-svg {
  width: 15%;
}
</style>
