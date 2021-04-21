<template>
  <div id="ntime">
    <template v-if="tt.length">
      <app-header></app-header>
      <div id="ntime-app-content">
        <app-tasks></app-tasks>
        <app-timetable></app-timetable>
        <app-settings></app-settings>
      </div>
      <app-footer></app-footer>
    </template>
  </div>
</template>

<script>
import Timetable from "./Timetable";
import TaskDisplay from "./TaskList";
import Settings from "../home/Settings";
import Header from "../NewHeader";
import Footer from "../Footer";
export default {
  computed: {
    uid() {
      return this.$store.getters.uid;
    },
    tt() {
      return this.$store.getters.timetable;
    },
  },
  components: {
    AppTimetable: Timetable,
    AppTasks: TaskDisplay,
    AppSettings: Settings,
    AppHeader: Header,
    AppFooter: Footer,
  },
  created(){
    if(!this.tt.length) this.$router.replace('new')
  }
};
</script>

<style>
#ntime {
  width: 100%;
  height: 100%;
}
#ntime-app-content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 768px) {
  #ntime-app-content {
    position: relative;
  }
}
</style>
