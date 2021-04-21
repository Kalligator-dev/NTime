<template>
  <ul id="timetable" class="scrollable-tt" @scroll="inactivityPeriod">
    <div class="time-period-block">
      <time-period
        v-for="(per, index) in preTable"
        :key="per[0] + 4444"
        :periodID="Math.abs(index - 60)"
        :periodType="per[1]"
        :periodSt="per[0]"
      ></time-period>
    </div>
    <div class="active-time-period-block" id="scroll-to-active">
      <active-period
        :periodID="curPeriod[1]"
        :periodType="curPeriod[0][2]"
        :periodSt="curPeriod[0][0]"
        :periodEnd="curPeriod[0][1]"
      ></active-period>
    </div>
    <div class="time-period-block">
      <time-period
        v-for="(per, index) in postTable"
        :key="per[0] + 616161"
        :periodID="index"
        :periodType="per[1]"
        :periodSt="per[0]"
      ></time-period>
    </div>
  </ul>
</template>

<script>
import Period from "./Period";
import ActivePeriod from "./ActivePeriod";
export default {
  data() {
    return {
      curHr: 0,
      curMin: 0,
      curSec: -1,
      timed: 0,
      curPeriod: {},
      preTable: [],
      postTable: [],
      inactTimer: 15000,
      inactPeriod: 0,
      setTimeInt: 0,
      audioSound: 0,
      timeSync: 0,
    };
  },
  watch: {
    curSec() {
      if (this.curSec === 0) {
        clearInterval(this.setTimeInt);
        this.setTimeInt = setInterval(() => {
          this.setCurTime();
        }, 60000);
        this.timeSync = true;
      }
    },
    timed() {
      setTimeout(() => {
        if (this.curPeriod[0][1] <= this.timed) {
          if (this.timed === 1439) {
            setTimeout(() => {
              this.transPeriods(this.curPeriod[0][2]);
            }, 60000);
          } else {
            this.transPeriods(this.curPeriod[0][2]);
          }
        }
      }, 500);
    },
    curPeriod() {
      this.setPreTable();
      this.setPostTable();
    },
  },
  computed: {
    timetable() {
      return this.$store.getters.timetable;
    },
    timedTT() {
      let timedTable = [];
      this.timetable.forEach((el) => {
        let st = el[0][0] * 60 + el[0][1];
        let end = el[1][0] * 60 + el[1][1];
        timedTable.push([st, end, el[2]]);
      });
      return timedTable;
    },
  },
  methods: {
    setCurTime() {
      let today = new Date();
      let hr = today.getHours();
      let min = today.getMinutes();
      let sec = today.getSeconds();
      let timedd = hr * 60 + min;
      this.curHr = hr;
      this.curMin = min;
      this.curSec = sec;
      this.timed = timedd;
    },
    scrollToActive() {
      let container = document.querySelector("#timetable");
      if (container) {
        let tabs = container.children;
        let preTab = tabs.item(0).clientHeight;
        let actTab = tabs.item(1).clientHeight;
        let margin = (container.clientHeight - actTab) / 2;
        container.scrollTo(0, preTab - margin);
      }
    },
    windowResized() {
      this.inactivityPeriod("", 1500);
    },
    inactivityPeriod(e, x = 5000) {
      clearTimeout(this.inactPeriod);
      this.inactPeriod = setTimeout(this.scrollToActive, x);
    },
    transPeriods(id) {
      let tableView = document.querySelector("#timetable");
      tableView.classList.add("flashing");
      if (id === 0) {
        this.audioSound = new Audio(require("../../assets/audio/lovingly.ogg"));
        this.audioSound.play();
      } else if (id === 1) {
        this.audioSound = new Audio(
          require("../../assets/audio/wake-up-will-you.ogg")
        );
        this.audioSound.play();
      } else if (id === 2) {
        this.audioSound = new Audio(
          require("../../assets/audio/good-morning.ogg")
        );
        this.audioSound.play();
      }
      setTimeout(() => {
        this.setCurPeriod();
        this.inactivityPeriod("", 1500);
      }, 500);

      setTimeout(() => {
        tableView.classList.remove("flashing");
      }, 1000);
    },
    setCurPeriod() {
      for (let i = 0; i < this.timedTT.length; i++) {
        if (
          this.timed >= this.timedTT[i][0] &&
          this.timed < this.timedTT[i][1]
        ) {
          this.curPeriod = [this.timedTT[i], i];
        }
      }
    },
    setPreTable() {
      let start = this.curPeriod[0][0] - 60;
      let table = [];
      if (start >= 0) {
        for (let i = this.curPeriod[1] - 1; i >= 0; i--) {
          if (start <= this.timedTT[i][0]) {
            for (let l = this.timedTT[i][1] - 1; l > this.timedTT[i][0]; l--) {
              table.unshift([l, this.timedTT[i][2]]);
            }
          } else {
            if (start < this.timedTT[i][1]) {
              for (let l = this.timedTT[i][1]; l >= start; l--) {
                table.unshift([l, this.timedTT[i][2]]);
              }
            }
          }
        }
      } else {
        start += 1439;
        for (let i = 0; i < this.timedTT.length; i++) {
          if (start === this.timedTT[i][0]) {
            for (let l = this.timedTT[i][0]; l < this.timedTT[i][1]; l++) {
              table.push([l, this.timedTT[i][2]]);
            }
          } else if (start > this.timedTT[i][0]) {
            for (let l = start; l < this.timedTT[i][1]; l++) {
              table.push([l, this.timedTT[i][2]]);
            }
          }
        }
        for (let i = 0; i < this.curPeriod[1]; i++) {
          for (let l = this.timedTT[i][0]; l < this.curPeriod[0][0] - 1; l++) {
            table.push([l, this.timedTT[i][2]]);
          }
        }
      }
      this.preTable = table;
    },
    setPostTable() {
      let table = [];
      if (this.curPeriod[0][1] === 1439) {
        for (let i = 0; i < this.timedTT.length; i++) {
          if (this.timedTT[i][1] <= 60) {
            for (let l = this.timedTT[i][0]; l < this.timedTT[i][1]; l++) {
              table.push([l, this.timedTT[i][2]]);
            }
          } else {
            if (this.timedTT[i][0] < 60) {
              for (let l = this.timedTT[i][0]; l < 60; l++) {
                table.push([l, this.timedTT[i][2]]);
              }
            }
          }
        }
      } else {
        let end = this.curPeriod[0][1] + 60;
        if (end <= 1439) {
          for (let i = this.curPeriod[1] + 1; i < this.timedTT.length; i++) {
            if (end > this.timedTT[i][1]) {
              for (let l = this.timedTT[i][0]; l < this.timedTT[i][1]; l++) {
                table.push([l, this.timedTT[i][2]]);
              }
            } else {
              if (end >= this.timedTT[i][0]) {
                for (let l = this.timedTT[i][0]; l < end; l++) {
                  table.push([l, this.timedTT[i][2]]);
                }
              }
            }
          }
        } else {
          let rem = end - 1439;
          end -= rem;
          for (let i = this.curPeriod[1] + 1; i < this.timedTT.length; i++) {
            for (let l = this.timedTT[i][0]; l < this.timedTT[i][1]; l++) {
              table.push([l, this.timedTT[i][2]]);
            }
          }
          for (let i = 0; i < this.timedTT.length; i++) {
            if (this.timedTT[i][1] <= rem) {
              for (let l = this.timedTT[i][0]; l < this.timedTT[i][1]; l++) {
                table.push([l, this.timedTT[i][2]]);
              }
            } else {
              if (this.timedTT[i][0] < rem) {
                for (let l = this.timedTT[i][0]; l < rem; l++) {
                  table.push([l, this.timedTT[i][2]]);
                }
              }
            }
          }
        }
      }
      this.postTable = table;
    },
  },
  components: {
    timePeriod: Period,
    ActivePeriod,
  },
  created() {
    this.setCurTime();
    this.setCurPeriod();
    window.addEventListener("resize", this.windowResized);
    this.setTimeInt = setInterval(() => {
      this.setCurTime();
    }, 1000);
  },
  unmounted() {
    window.removeEventListener("resize", this.windowResized);
    clearInterval(this.setTimeInt);
  },
  mounted() {
    setTimeout(() => {
      this.scrollToActive();
    }, 50);
  },
};
</script>

<style>
#timetable {
  transition: all 0.5s ease-in-out;
  height: 100vh;
  width: 100%;
  padding: 0 1rem;
  list-style: none;
  scroll-behavior: smooth;
}

.time-period-block {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
}

.active-time-period-block {
  box-shadow: 0 0 5px #000;
  position: relative;
  z-index: 2;
}

.scrollable-tt {
  overflow-x: hidden;
  overflow-y: auto;
  -ms-overflow-style: none;
}
.scrollable-tt::-webkit-scrollbar {
  display: none;
}

.flashing {
  opacity: 0;
}

@media (max-width: 640px) {
  #timetable {
    margin-top: 4rem;
    height: 90%;
    width: 93%;
    padding: 0 0rem;
  }
}

@media (max-width: 768px) {
}
</style>
