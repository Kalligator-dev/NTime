<template>
  <div class="now-clock" @click="secsShow = !secsShow">
    <span class="time-now-txt">Time Now</span
    ><span class="clock"
      >{{ hrDis }}:{{ minsDis
      }}<span class="secs-span" v-if="secsShow">:{{ secsDis }}</span>
      <span class="am-pm">{{ amPm }}</span></span
    >
    <svg viewBox="0 0 40 2" class="clock-line-svg" preserveAspectRatio="none">
      <path d="M0 1 L40 1" />
    </svg>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hr: 0,
      mins: 0,
      secs: 0,
      secsShow: true,
    };
  },
  computed: {
    hrDis() {
      let hrs = this.hr;
      if (hrs > 12) {
        hrs -= 12;
      }
      if (hrs < 10) {
        return "0" + hrs;
      } else {
        return hrs;
      }
    },
    minsDis() {
      if (this.mins < 10) {
        return "0" + this.mins;
      } else {
        return this.mins;
      }
    },
    secsDis() {
      if (this.secs < 10) {
        return "0" + this.secs;
      } else {
        return this.secs;
      }
    },
    amPm() {
      if (this.hr > 12) {
        return "PM";
      } else {
        return "AM";
      }
    },
  },
  created() {
    setInterval(() => {
      this.hr = new Date().getHours();
      this.mins = new Date().getMinutes();
      this.secs = new Date().getSeconds();
    }, 1000);
  },
};
</script>

<style>
.now-clock {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.now-clock .time-now-txt {
  font-size: 0.8rem;
  color: #ffffff50;
}
.now-clock .clock {
  font-size: 5rem;
  color: #fff;
}
.now-clock .am-pm {
  font-size: 3rem;
  color: #ffffff90;
}
.clock-line-svg {
  margin-top: 1rem;
  vertical-align: bottom;
  stroke: #ffffff20;
  stroke-width: 0.1px;
  width: 40%;
}

@media (max-width: 640px) {
  .now-clock .time-now-txt {
    font-size: 0.8rem;
    color: #ffffff50;
  }
  .now-clock .clock {
    font-size: 2rem;
  }
  .now-clock .am-pm {
    font-size: 1rem;
    float: right;
  }
  .clock-line-svg {
    display: none;
  }
}

@media (max-width: 768px) {
  .now-clock .clock {
    font-size: 4rem;
  }
  .now-clock .am-pm {
    font-size: 2rem;
  }
}
</style>
