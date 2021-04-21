<template>
  <div class="form-block break-hours" :id="breakIDStr">
    <div class="mini-block mini-header">
      <h3><span>Break</span> #{{ breakID + 1 }}</h3>
    </div>
    <div class="mini-block">
      <label for="break-start">From</label>
      <input class="input-field" type="time" v-model="startProp" required />
      <input-line></input-line>
    </div>
    <div class="mini-block">
      <label for="break-end">To</label>
      <input class="input-field" type="time" v-model="endProp" required />
      <input-line></input-line>
    </div>
    <div class="mini-block mini-header x-icon">
      <h3 @click="deleteBreak">x</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: ["breakID", "startValue", "endValue"],
  computed: {
    breakIDStr() {
      return `break${this.breakID}`;
    },
    startProp: {
      get() {
        return this.startValue;
      },
      set(val) {
        this.$emit("update:startValue", val);
      },
    },
    endProp: {
      get() {
        return this.endValue;
      },
      set(val) {
        this.$emit("update:endValue", val);
      },
    },
  },
  methods: {
    deleteBreak() {
      this.$emit("breakDeleted", this.breakID);
    },
  },
};
</script>

<style scoped>
.mini-header {
  display: flex;
  align-items: center;
  justify-content: center;
}
.mini-header h3 {
  color: var(--col-3);
  text-align: center;
}

.x-icon h3 {
  cursor: pointer;
  color: var(--col-1);
  transition: all 0.2s ease-out;
}
.x-icon h3:hover {
  color: var(--col-3);
}

@media (max-width: 640px) {
  .break-hours {
    width: 100%;
    padding: 0;
    transform: translate(-0.5rem, 0);
  }
  .mini-header {
    font-size: 0.9rem;
  }
  .mini-header span {
    display: none;
  }
  .mini-block {
    width: 5.5rem;
  }
  .x-icon {
    width: 0.2rem;
  }
}
</style>
