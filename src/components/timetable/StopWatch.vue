<template>
  <div class="stopwatch">
    <div class="stop-watch">
      <h2>
        {{ `0${Math.floor(startTime / 60)}` }}:{{
          startTime % 60 > 9 ? startTime % 60 : `0${startTime % 60}`
        }}
      </h2>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      startTime: 300,
      timerInt: 0,
      flashOn: false,
    };
  },
  props: ["stopTime"],
  watch: {
    startTime() {
      if (this.startTime === 0) {
        clearInterval(this.timerInt);
        this.returnToWork();
      }
    },
  },
  methods: {
    returnToWork() {
      const sw = document.querySelector(".stopwatch");
      let audio = new Audio(require("../../assets/audio/alarm1.mp3"));
      audio.play();
      let flash = setInterval(() => {
        if (!this.flashOn) {
          sw.style.opacity = "0.2";
        } else {
          sw.style.opacity = "0.9";
        }
        this.flashOn = !this.flashOn;
      }, 500);
      setTimeout(() => {
        clearInterval(flash);
        sw.style.opacity = "0";
        sw.style.transform = "scale(0)";
      }, 5000);
      setTimeout(() => {
        this.$emit("swFinished", true);
      }, 5300);
    },
  },
  created() {
    this.timerInt = setInterval(() => {
      this.startTime -= 1;
    }, 1000);
  },
  mounted() {
    const sw = document.querySelector(".stopwatch");
    setTimeout(() => {
      sw.style.opacity = "1";
      sw.style.transform = "scale(1)";
    }, 20);
  },
  unmounted() {
    clearInterval(this.timerInt);
  },
};
</script>

<style>
.stopwatch {
  width: 10rem;
  text-align: center;
  padding: 0.5rem;
  opacity: 0;
  transform: scale(0.2);
  transition: all 0.5s ease-in-out;
}

@media (max-width: 640px) {
  .stopwatch {
    width: auto;
    padding: 0rem;
    position: absolute;
    bottom: -1rem;
  }
}

@media (max-width: 768px) {
}
</style>
