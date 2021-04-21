<template>
  <div id="breaks" class="div-block">
    <div class="m-header header-block">
      <h2>Breaks</h2>
      <svg viewBox="0 0 40 2" class="line-svg" preserveAspectRatio="none">
        <path d="M0 1 L40 1" />
      </svg>
    </div>
    <div id="break-hours-table" class="scrollable" v-if="breaks.length > 0">
      <comp-break
        v-for="(br, index) in breaks"
        :key="br.id"
        v-model:startValue="br.start"
        v-model:endValue.sync="br.end"
        :breakID="index"
        @breakDeleted="deleteBreak"
      ></comp-break>
    </div>
    <button class="form-btn" id="add-break-btn" @click.prevent="addBreak">
      Add
    </button>
  </div>
</template>

<script>
import Break from "./Break";
export default {
  data() {
    return {
      breaks: [{ start: "08:00", end: "09:00" }],
      invalidEnteries: 0,
      errMsg: "",
    };
  },
  computed: {
    breakFloats() {
      let breakStamps = [];
      this.breaks.forEach((br) => {
        breakStamps.push({
          start: Number.parseFloat(br.start.split(":").join(".")),
          end: Number.parseFloat(br.end.split(":").join(".")),
        });
      });
      return breakStamps;
    },
    subClicked() {
      return this.$store.getters.subBtnClick;
    },
  },
  watch: {
    subClicked() {
      if (this.subClicked === 3) {
        this.validateBreaks();
      }
    },
  },
  components: {
    compBreak: Break,
  },
  methods: {
    deleteBreak(index) {
      this.breaks.splice(index, 1);
    },
    addBreak() {
      if (this.breaks.length <= 0) {
        this.breaks.push({ start: "00:00", end: "01:00" });
      } else {
        let prevBrEnd = this.breaks[this.breaks.length - 1].end;
        let prevBrEndArr = prevBrEnd.split(":");
        let origH = parseInt(prevBrEndArr[0]);
        prevBrEndArr[0] = parseInt(prevBrEndArr[0]);
        prevBrEndArr[0] += 1;
        if (prevBrEndArr[0] > 23) {
          prevBrEndArr[0] -= 24;
        }
        if (prevBrEndArr[0] < 10) {
          prevBrEndArr[0] = "0" + prevBrEndArr[0];
        }
        let prevBrEndModdedStart = prevBrEndArr.join(":");
        prevBrEndArr[1] = parseInt(prevBrEndArr[1]);
        prevBrEndArr[1] += 15;
        if (prevBrEndArr[1] > 59) {
          prevBrEndArr[1] -= 60;
          origH += 2;
          if (origH > 23) {
            origH -= 24;
          }
          if (origH < 10) {
            origH = "0" + origH;
          }
          prevBrEndArr[0] = origH;
        }
        if (prevBrEndArr[1] < 10) {
          prevBrEndArr[1] = "0" + prevBrEndArr[1];
        }
        let prevBrEndModdedEnd = prevBrEndArr.join(":");
        this.breaks.push({
          start: prevBrEndModdedStart,
          end: prevBrEndModdedEnd,
        });
      }
    },
    validateBreaks() {
      this.validateEnteries();
      if (this.invalidEnteries === 0) {
        this.breaks.sort(
          (a, b) => Number.parseFloat(a.start) - Number.parseFloat(b.start)
        );
        for (let i = 0; i < this.breakFloats.length - 1; i++) {
          let cur = {
            start: this.breakFloats[i].start,
            end: this.breakFloats[i].end,
          };
          let next = this.breakFloats[i + 1];
          if (next.start <= cur.end) {
            if (next.end <= cur.end) {
              this.breakFloats.splice(i + 1, 1);
              i -= 1;
            } else {
              let merg = { start: cur.start, end: next.end };
              this.breakFloats.splice(i, 2, merg);
              i -= 1;
            }
            let type = 2;
            let msg = `You had some overlapping breaks. Don't worry though we automatically merge them together for you`;
            const err = { msg: msg, type: type };
            this.$store.dispatch("showErr", err);
          }
        }
        this.$store.dispatch("updateBreaks", this.breakFloats);
        this.$store.dispatch("updateValid", 1);
      } else {
        this.$store.dispatch("updateValid", 0);
        let type = 1;
        let msg = `ERROR: Please fix break#${this.errMsg
          .split("")
          .join(
            " & "
          )} or delete it/them before clicking Next (you can't leave any empty fields or have the break end at/before it starts)`;
        const err = { msg: msg, type: type };
        this.$store.dispatch("showErr", err);
      }
      this.$store.dispatch("updateResponse");
      this.$store.dispatch("clickSub", 0);
    },
    timizeBreaks() {
      this.breakFloats.forEach((br) => {
        console.log(
          `Start${this.breakFloats.indexOf(br) + 1}: Hour:${Math.floor(
            br.start
          )} Mins:${Math.round((br.start - Math.floor(br.start)) * 100)}`
        );
        console.log(
          `End${this.breakFloats.indexOf(br) + 1}: Hour:${Math.floor(
            br.end
          )} Mins:${Math.round((br.end - Math.floor(br.end)) * 100)}`
        );
      });
    },
    validateEnteries() {
      this.invalidEnteries = 0;
      this.errMsg = "";
      this.breakFloats.forEach((br) => {
        if (isNaN(br.start) || isNaN(br.end)) {
          this.invalidEnteries += 1;
          this.errMsg += `${this.breakFloats.indexOf(br) + 1}`;
        } else {
          if (br.end <= br.start) {
            this.invalidEnteries += 1;
            this.errMsg += `${this.breakFloats.indexOf(br) + 1}`;
          }
        }
      });
    },
  },
};
</script>

<style>
#breaks {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
#breaks .break-hours {
  display: flex;
  align-self: flex-end;
}

#break-hours-table {
  height: 65%;
  display: flex;
  flex-direction: column;
}

#add-break-btn {
  position: absolute;
  right: 15%;
  bottom: 20%;
  display: block;
}

@media (max-width: 640px) {
  #break-hours-table {
    height: 60%;
  }

  #add-break-btn {
    position: absolute;
    right: 15%;
    bottom: 20%;
    display: block;
  }
}
</style>
