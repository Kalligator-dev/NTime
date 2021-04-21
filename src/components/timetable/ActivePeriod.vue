<template>
  <li class="active-period" :class="classType">
    <template v-if="periodType === 0">
      <div class="div-period-start">
        {{
          Math.floor(periodSt / 60) >= 10
            ? Math.floor(periodSt / 60)
            : `0${Math.floor(periodSt / 60)}`
        }}:{{ periodSt % 60 >= 10 ? periodSt % 60 : `0${periodSt % 60}` }}
        <span>started at</span>
      </div>

      <div class="sleeping-txt">
        <span>Sleeping</span><span class="sleep-dot-1">.</span
        ><span class="sleep-dot-2">.</span><span class="sleep-dot-3">.</span>
      </div>

      <div class="sleepy-bubble-l"></div>
      <div class="sleepy-bubble-m"></div>
      <div class="sleepy-bubble-s"></div>

      <div class="div-period-end">
        {{
          Math.floor(periodEnd / 60) >= 10
            ? Math.floor(periodEnd / 60)
            : `0${Math.floor(periodEnd / 60)}`
        }}:{{ periodEnd % 60 >= 10 ? periodEnd % 60 : `0${periodEnd % 60}`
        }}<span>ends at</span>
      </div>
    </template>
    <template v-if="periodType === 1">
      <div id="break-hud">
        <div class="div-period-start">
          {{
            Math.floor(periodSt / 60) >= 10
              ? Math.floor(periodSt / 60)
              : `0${Math.floor(periodSt / 60)}`
          }}:{{ periodSt % 60 >= 10 ? periodSt % 60 : `0${periodSt % 60}` }}
          <span @click="calcStop">started at</span>
        </div>
        <div class="work-stuff break-stuff">
          <now-clock></now-clock>
          <div id="remaining" class="break-end">
            {{
              Math.floor(remainingTime / 3600) >= 10
                ? Math.floor(remainingTime / 3600)
                : `0${Math.floor(remainingTime / 3600)}`
            }}:{{
              Math.floor(remainingTime / 60) % 60 >= 10
                ? Math.floor(remainingTime / 60) % 60
                : `0${Math.floor(remainingTime / 60) % 60}`
            }}:{{
              remainingTime % 60 >= 10
                ? remainingTime % 60
                : `0${remainingTime % 60}`
            }}<span>remaining</span>
          </div>
        </div>
        <div class="div-period-end">
          {{
            Math.floor(periodEnd / 60) >= 10
              ? Math.floor(periodEnd / 60)
              : `0${Math.floor(periodEnd / 60)}`
          }}:{{ periodEnd % 60 >= 10 ? periodEnd % 60 : `0${periodEnd % 60}`
          }}<span>ends at</span>
        </div>
      </div>
      <div
        class="time-left tl-1"
        id="tl-1"
        :style="{ height: tlHeight + '%' }"
      ></div>
      <div class="time-left tl-2" :style="{ height: tlHeight + '%' }"></div>
      <div class="time-left tl-3" :style="{ height: tlHeight + '%' }"></div>
    </template>
    <template v-if="periodType === 2">
      <div class="div-period-start">
        {{
          Math.floor(periodSt / 60) >= 10
            ? Math.floor(periodSt / 60)
            : `0${Math.floor(periodSt / 60)}`
        }}:{{ periodSt % 60 >= 10 ? periodSt % 60 : `0${periodSt % 60}` }}
        <span @click="calcStop">started at</span>
      </div>
      <div class="work-stuff">
        <now-clock></now-clock>
      </div>
      <div class="div-period-end">
        {{
          Math.floor(periodEnd / 60) >= 10
            ? Math.floor(periodEnd / 60)
            : `0${Math.floor(periodEnd / 60)}`
        }}:{{ periodEnd % 60 >= 10 ? periodEnd % 60 : `0${periodEnd % 60}`
        }}<span>ends at</span>
      </div>
      <div class="div-work-header">
        <template v-if="pauseSession">
          <div class="pause-session-div">
            <stop-watch
              :stopTime="calcStop()"
              @swFinished="pauseSession = false"
            ></stop-watch>
            <div class="res-btn" @click="pauseSession = false">
              <div class="res-icon"></div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="pause-btn-div" @mouseleave="showMini = false">
            <div
              class="pause-btn"
              @mouseenter="showMini = true"
              @click="checkStop"
            >
              <div class="pause-cir"></div>
            </div>
            <transition name="show-mini" mode="out-in">
              <div class="mini-break-txt" v-show="showMini">mini Break</div>
            </transition>
          </div>
        </template>
        <template v-if="pauseFail">
          <div class="pause-session-div">
            <h4>
              Can't have a mini-break now. Your work session ends in
              {{ Math.floor(calcStop() / 60) }} minutes
            </h4>
          </div>
        </template>
      </div>
    </template>
  </li>
</template>

<script>
import stopWatch from "./StopWatch";
import nowClock from "./NowClock";
export default {
  data() {
    return {
      pauseSession: false,
      showMini: false,
      pauseFail: false,
      tlHeight: 100,
      remainingTime: 0,
      stopWtchRes: false,
      showStartEnd: true,
    };
  },
  props: ["periodID", "periodType", "periodSt", "periodEnd"],
  computed: {
    classType() {
      let type = "";
      if (this.periodType === 0) {
        type = "sleep-cls-cur";
      } else if (this.periodType === 1) {
        type = "break-cls-cur";
      } else if (this.periodType === 2) {
        type = "work-cls-cur";
      }
      return type;
    },
    headerState() {
      return this.$store.getters.headerState;
    },
  },
  watch: {
    periodID() {
      this.tlHeight = 100;
      if (this.periodType === 1) {
        this.breakDown();
        setTimeout(() => {
          this.startBubbles();
        }, 1000);
      }
    },
    headerState() {
      if (this.periodType === 1 || this.periodType === 2) {
        if (this.headerState % 3 === 0) {
          const divStart = document.querySelector(".div-period-start");
          const divEnd = document.querySelector(".div-period-end");
          divStart.style.opacity = "0";
          divEnd.style.opacity = "0";
        } else {
          const divStart = document.querySelector(".div-period-start");
          const divEnd = document.querySelector(".div-period-end");
          setTimeout(() => {
            divStart.style.opacity = "1";
            divEnd.style.opacity = "1";
          }, 750);
        }
      }
    },
  },
  methods: {
    checkStop() {
      let stopTimer = this.calcStop();
      if (stopTimer < 310) {
        this.pauseFail = true;
        setTimeout(() => {
          this.pauseFail = false;
        }, 2000);
      } else {
        this.pauseSession = true;
        this.showMini = false;
      }
    },
    calcStop() {
      let curHr = new Date().getHours();
      let curMin = new Date().getMinutes();
      let curSec = new Date().getSeconds();
      let curTime = (curHr * 60 + curMin) * 60 + curSec;
      let rem = this.periodEnd * 60 - curTime;
      return rem;
    },
    startBubbles(interval = 1000) {
      setTimeout(() => {
        let container = document.querySelector(".active-period");
        if (container) {
          let bubbleIns = document.createElement("div");
          bubbleIns.classList.add("bubble-instance");
          let wdthBub = ((Math.random() + 0.1) * window.innerWidth * 3) / 1085;
          bubbleIns.style.height = wdthBub + "rem";
          bubbleIns.style.width = wdthBub + "rem";
          let lt = Math.min(Math.random() * 90, 90);
          let step = this.tlHeight * 0.95 * 0.2;
          let bot = -20;
          if (this.tlHeight <= 65) {
            bot = -35;
          }
          if (this.tlHeight <= 35) {
            bot = -40;
          }
          bubbleIns.style.left = lt + "%";
          container.appendChild(bubbleIns);
          lt += Math.random() + 5;
          bubbleIns.style.left = lt + "%";
          bubbleIns.style.bottom = bot + "%";
          let changeDirection = 1;
          let curY = 0;
          let elHeight = container.clientHeight;
          setInterval(() => {
            let ltCh = Math.random() + 5;
            curY -= (1 * step * elHeight) / 100;
            bubbleIns.style.transform = `translate(${(ltCh * changeDirection) /
              3}rem, ${curY}px)`;
            changeDirection *= -1;
          }, 2000);
          setTimeout(() => {
            bubbleIns.style.opacity = 0;
          }, 8000);
          setTimeout(() => {
            container.removeChild(bubbleIns);
          }, 10000);
          let curHr = new Date().getHours();
          let curMin = new Date().getMinutes();
          let curSec = new Date().getSeconds();
          let curTime = (curHr * 60 + curMin) * 60 + curSec;
          let rem = this.periodEnd * 60 - curTime;
          setTimeout(() => {
            if (this.periodType === 1 && rem >= 11) {
              let rn = Math.random() * 1000 + 300;
              this.startBubbles(rn);
            }
          }, 2000);
        }
      }, interval);
    },
    breakDown() {
      let curHr = new Date().getHours();
      let curMin = new Date().getMinutes();
      let curSec = new Date().getSeconds();
      let curTime = (curHr * 60 + curMin) * 60 + curSec;
      let rem = this.periodEnd * 60 - curTime;
      this.remainingTime = rem;
      let step = 85 / (rem * 20);
      let decay = setInterval(() => {
        this.tlHeight -= step;
        if (this.tlHeight <= 15) {
          clearInterval(decay);
          return;
        }
      }, 50);
      let timeRemSW = setInterval(() => {
        this.remainingTime--;
        if (this.remainingTime <= 0) {
          clearInterval(timeRemSW);
          return;
        }
      }, 1000);
    },
  },
  components: {
    stopWatch,
    nowClock,
  },
  created() {
    this.tlHeight = 100;
    if (this.periodType === 1) {
      this.breakDown();
      setTimeout(() => {
        this.startBubbles();
      }, 1000);
    }
  },
};
</script>

<style>
.active-period {
  position: relative;
  width: 100%;
  height: 66vh;
  max-height: 640px;
  overflow: hidden;
  transition: all 1s ease-in-out;
}

.sleep-cls-cur {
  background-image: var(--gra-sleep);
  color: var(--col-4);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.break-cls-cur {
  background-image: var(--gra-break);
  color: var(--col-3);
}
.work-cls-cur {
  background-image: var(--gra-work);
  color: var(--col-2);
  display: flex;
  justify-content: space-between;
}

.div-period-start,
.div-period-end {
  color: #fff;
  font-size: 3rem;
  padding: 1rem;
  margin: 1rem;
  border: solid 2px #ffffff20;
  border-radius: 50%;
  text-align: center;
  width: 10rem;
  height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
  transition: opacity 0.5s ease-in-out;
}
.div-period-start span,
.div-period-end span {
  font-size: 0.9rem;
  color: #caacac95;
}

.work-stuff {
  padding: 1rem;
  margin: 1rem;
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.div-work-header {
  position: absolute;
  bottom: 10%;
  width: 90%;
  left: 50%;
  padding: 0.5rem;
  transform: translateX(-50%);
}
.pause-btn-div {
  display: flex;
  color: #ffffff40;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all ease-in-out 0.5s;
}
.pause-btn-div .pause-btn {
  border: solid 1px #fff;
  width: 1.5rem;
  height: 1.5rem;
  padding: 0.05rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-bottom: 0.5rem;
  transition: all 0.2s ease-in-out;
}
.pause-btn-div .pause-btn .pause-cir {
  background-color: #fff;
  width: 30%;
  height: 30%;
  border-radius: 50%;
  transition: all 0.3s ease-in-out;
}
.pause-btn-div .pause-btn:hover {
  border: solid 1px var(--col-2);
}
.pause-btn-div .pause-btn:hover .pause-cir {
  background-color: var(--col-1);
  width: 80%;
  height: 80%;
}
.pause-btn-div .mini-break-txt {
  position: absolute;
  transform: translateY(-140%);
}
.show-mini-enter-active {
  animation: ease-in-out 0.2s show-mini-in forwards;
}
.show-mini-leave-active {
  animation: ease-in-out 0.2s show-mini-out forwards;
}

@keyframes show-mini-in {
  0% {
    opacity: 0;
    transform: translateY(-140%) scale(0.5, 0.5);
  }
  100% {
    opacity: 0.75;
    transform: translateY(-140%) scale(1, 1);
  }
}
@keyframes show-mini-out {
  0% {
    opacity: 0.75;
    transform: translateY(-140%) scale(1, 1);
  }
  100% {
    opacity: 0;
    transform: translateY(-140%) scale(0.1, 0.1);
  }
}
.pause-session-div {
  display: flex;
  color: var(--col-0-tt);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all ease-in-out 0.5s;
}
.res-btn {
  border: solid 1px var(--col-0-ht);
  width: 1.5rem;
  height: 1.5rem;
  padding: 0.05rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-bottom: 0.5rem;
  transition: all 0.2s ease-in-out;
}
.res-btn:hover {
  border: solid 1px var(--col-2);
}
.res-btn .res-icon {
  border-left: solid 4px #fff;
  border-top: solid 4px transparent;
  border-bottom: solid 4px transparent;
  transition: all 0.2s ease-in-out;
}
.res-btn:hover .res-icon {
  border-left: solid 8px var(--col-1);
  border-top: solid 6px transparent;
  border-bottom: solid 6px transparent;
}

/* Sleep */
.sleeping-txt {
  font-size: 6rem;
  z-index: 2;
  color: var(--col-0-ht);
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -52.5%);
}
.sleep-dot-1 {
  animation: dot-animate ease-in-out 1s infinite;
}
.sleep-dot-2 {
  animation: dot-animate ease-in-out 1s infinite;
  animation-delay: 0.2s;
}
.sleep-dot-3 {
  animation: dot-animate ease-in-out 1s infinite;
  animation-delay: 0.4s;
}

@keyframes dot-animate {
  0% {
    opacity: 0.75;
    transform: translate(0, 0);
  }
  50% {
    opacity: 0.25;
    transform: translate(110%, 110%);
  }
  100% {
    opacity: 0.75;
    transform: translate(0, 0);
  }
}
.sleepy-bubble-l,
.sleepy-bubble-m,
.sleepy-bubble-s {
  border-radius: 50%;
  animation: sleep-bubble-anim infinite ease-in-out 3s;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
@keyframes sleep-bubble-anim {
  0% {
    width: 0rem;
    height: 0rem;
    opacity: 0;
    border: solid 1px var(--col-0-ht);
  }
  50% {
    opacity: 0.6;
    border: solid 5px var(--col-0-ht);
  }
  100% {
    width: 40rem;
    height: 40rem;
    opacity: 0;
    border: solid 2px var(--col-0-ht);
  }
}
.sleepy-bubble-m {
  animation-delay: 1s;
}
.sleepy-bubble-s {
  animation-delay: 1.75s;
}

/* Break */
#break-hud {
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.break-stuff {
  display: flex;
  flex-direction: column;
}
.break-end {
  color: var(--col-0-ht);
  font-size: 3rem;
  padding: 1rem;
  margin: 0.5rem;
  text-align: center;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
}
.break-end span {
  font-size: 0.9rem;
  color: var(--col-0-ht);
}
.time-left {
  width: 17152px;
  height: 60%;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  animation: wave7 25s infinite linear;
}
.tl-1 {
  background: url("../../assets/anim/waves/Asset 13.png") repeat-x;
  mix-blend-mode: difference;
}
.tl-2 {
  background: url("../../assets/anim/waves/Asset 11.png") repeat-x;
  mix-blend-mode: color;
}
.tl-3 {
  background: url("../../assets/anim/waves/Asset 20.png") repeat-x;
  mix-blend-mode: multiply;
  opacity: 0.7;
}
@keyframes wave7 {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(-50%, 0, 0);
  }
}

.bubble-instance {
  border: solid 2px #ffffff3b;
  border-radius: 50%;
  opacity: 1;
  position: absolute;
  bottom: 0;
  box-shadow: #ffffff3b 2px 2px, #ffffff3b 2px 0px;
  background: #ffffff1a;
  animation: ascending 10s linear;
  transition: all linear 2s;
}
.bubble-instance::before {
  content: "";
  border: solid 1px #ffffffab;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.527);
  width: 8%;
  height: 8%;
  position: absolute;
  box-shadow: #ffffff3b 1.5px 1.5px, #ffffff3b -1.5px -1.5px,
    #ffffff3b -1.5px 1.5px;
  left: 25%;
  top: 15%;
}

@media (max-width: 640px) {
  .sleep-cls-cur {
    justify-content: center;
    align-items: center;
  }
  #break-hud {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .work-cls-cur {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .div-period-start {
    display: none;
  }
  .div-period-end {
    font-size: 1.5rem;
    padding: 0.2rem;
    margin: 0.2rem;
    border: none;
    border-radius: 50%;
    text-align: center;
    width: 5rem;
    height: 3rem;
  }
  .div-period-start span,
  .div-period-end span {
    font-size: 0.8rem;
    order: -1;
  }

  .sleeping-txt {
    font-size: 5rem;
    opacity: 0.2;
    z-index: 2;
    transform: translate(-50%, -52.5%) rotate(90deg);
  }
}

@media (max-width: 1000px) {
  .sleep-cls-cur {
    background-image: var(--gra-sleep);
    color: var(--col-4);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .break-cls-cur {
    background-image: var(--gra-break);
    color: var(--col-3);
  }
  .work-cls-cur {
    background-image: var(--gra-work);
    color: var(--col-2);
    display: flex;
    justify-content: center;
  }

  .div-period-start,
  .div-period-end {
    font-size: 2rem;
    padding: 0rem;
    margin: 0.5rem;
    width: 6rem;
    height: 6rem;
  }
  .div-period-start span,
  .div-period-end span {
    font-size: 0.8rem;
  }

  .work-stuff {
    padding: 0.5rem;
    margin: 0.5rem;
  }
}
</style>
