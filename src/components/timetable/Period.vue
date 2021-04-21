<template>
  <li
    class="period"
    :class="classType"
    :style="{ opacity: Math.abs(periodID - 60) / 60 }"
  >
    <template v-if="showCont">
      <span class="span-block"
        >{{
          Math.floor(periodSt / 60) >= 10
            ? Math.floor(periodSt / 60)
            : `0${Math.floor(periodSt / 60)}`
        }}:{{ periodSt % 60 >= 10 ? periodSt % 60 : `0${periodSt % 60}` }}</span
      >
      <svg viewBox="0 0 40 2" class="line-svg" preserveAspectRatio="none">
        <path d="M0 1 L40 1" />
      </svg>
    </template>
    <template v-else>
      <svg
        viewBox="0 0 40 2"
        class="line-svg faded-period"
        preserveAspectRatio="none"
      >
        <path d="M0 1 L40 1" />
      </svg>
    </template>
  </li>
</template>

<script>
export default {
  props: ["periodID", "periodType", "periodSt"],
  computed: {
    classType() {
      let type = "";
      if (this.periodType === 0) {
        type = "sleep-cls";
      } else if (this.periodType === 1) {
        type = "break-cls";
      } else if (this.periodType === 2) {
        type = "work-cls";
      }
      return type;
    },
    showCont() {
      if (this.periodSt % 30 !== 0) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>

<style>
.faded-period {
  opacity: 0.75;
  width: 50%;
}
.period {
  width: 97%;
  padding: 0.35rem 1rem;
  display: flex;
  display: flex;
  align-items: center;
  justify-content: center;
}
.span-block {
  margin: 0 0.5rem;
  width: 2rem;
  text-align: center;
  display: inline-block;
}
.sleep-cls {
  background-color: var(--col-v3-d-t);
  color: var(--col-v3);
}
.sleep-cls .line-svg {
  stroke: var(--col-v3);
}
.break-cls {
  background-color: var(--col-v1-cd-t);
  color: var(--col-v1);
}
.break-cls .line-svg {
  stroke: var(--col-v1);
}
.work-cls {
  background-color: var(--col-v2-d-t);
  color: var(--col-v2);
}
.work-cls .line-svg {
  stroke: var(--col-v2);
}
</style>
