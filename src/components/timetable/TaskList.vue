<template>
  <div id="task-display">
    <div id="top-hud-tasks" v-if="hudOn">
      <div
        class="icon-new app-icon"
        @click="newTasksClicked"
        @mouseenter="showNew = true"
        @mouseleave="showNew = false"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 182 199">
          <path
            class="cls-2"
            d="M142.78,0H39.22A39.27,39.27,0,0,0,0,39.22V159.78A39.27,39.27,0,0,0,39.22,199H142.78A39.27,39.27,0,0,0,182,159.78V39.22A39.27,39.27,0,0,0,142.78,0ZM170,159.78A27.25,27.25,0,0,1,142.78,187H39.22A27.25,27.25,0,0,1,12,159.78V39.22A27.25,27.25,0,0,1,39.22,12H142.78A27.25,27.25,0,0,1,170,39.22Z"
          />
          <path
            class="cls-1"
            d="M142.78,12H39.22A27.25,27.25,0,0,0,12,39.22V159.78A27.25,27.25,0,0,0,39.22,187H142.78A27.25,27.25,0,0,0,170,159.78V39.22A27.25,27.25,0,0,0,142.78,12ZM158,111.16a7.78,7.78,0,0,1-7.77,7.77H120.54a10.64,10.64,0,0,0-10.61,10.61v29.69a7.77,7.77,0,0,1-7.77,7.77H78.84a7.78,7.78,0,0,1-7.77-7.77V129.54a10.64,10.64,0,0,0-10.61-10.61H30.77A7.77,7.77,0,0,1,23,111.16V87.84a7.78,7.78,0,0,1,7.77-7.77H60.46A10.64,10.64,0,0,0,71.07,69.46V39.77A7.77,7.77,0,0,1,78.84,32h23.32a7.78,7.78,0,0,1,7.77,7.77V69.46a10.64,10.64,0,0,0,10.61,10.61h29.69A7.77,7.77,0,0,1,158,87.84Z"
          />
          <path
            class="cls-2"
            d="M80.22,159a6.85,6.85,0,0,1-6.85-6.85V126A9.36,9.36,0,0,0,64,116.63H37.85A6.85,6.85,0,0,1,31,109.78V89.22a6.85,6.85,0,0,1,6.85-6.85H64A9.36,9.36,0,0,0,73.37,73V46.85A6.85,6.85,0,0,1,80.22,40h20.56a6.85,6.85,0,0,1,6.85,6.85V73A9.36,9.36,0,0,0,117,82.37h26.17A6.85,6.85,0,0,1,150,89.22v20.56a6.85,6.85,0,0,1-6.85,6.85H117a9.36,9.36,0,0,0-9.35,9.35v26.17a6.85,6.85,0,0,1-6.85,6.85Z"
          />
        </svg>
        <transition name="show-label" mode="out-in">
          <div class="label" v-show="showNew">New</div>
        </transition>
      </div>
      <div
        class="icon-edit app-icon"
        @click="editTasksClicked"
        @mouseenter="showEdit = true"
        @mouseleave="showEdit = false"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 182 199">
          <path
            class="cls-2"
            d="M142.78,0H39.22A39.27,39.27,0,0,0,0,39.22V159.78A39.27,39.27,0,0,0,39.22,199H142.78A39.27,39.27,0,0,0,182,159.78V39.22A39.27,39.27,0,0,0,142.78,0ZM170,159.78A27.25,27.25,0,0,1,142.78,187H39.22A27.25,27.25,0,0,1,12,159.78V39.22A27.25,27.25,0,0,1,39.22,12H142.78A27.25,27.25,0,0,1,170,39.22Z"
          />
          <circle class="cls-2" cx="43" cy="100" r="16" />
          <circle class="cls-2" cx="93" cy="100" r="12.8" />
          <circle class="cls-2" cx="139" cy="100" r="10.24" />
          <path
            class="cls-1"
            d="M141.56,14.06H40.44A26.61,26.61,0,0,0,13.86,40.64V158.36a26.61,26.61,0,0,0,26.58,26.58H141.56a26.61,26.61,0,0,0,26.58-26.58V40.64A26.61,26.61,0,0,0,141.56,14.06ZM43,119.2A19.2,19.2,0,1,1,62.2,100,19.19,19.19,0,0,1,43,119.2Zm50-3.84A15.36,15.36,0,1,1,108.36,100,15.36,15.36,0,0,1,93,115.36Zm46-3.07A12.29,12.29,0,1,1,151.29,100,12.29,12.29,0,0,1,139,112.29Z"
          />
        </svg>
        <transition name="show-label" mode="out-in">
          <div class="label" v-show="showEdit">Edit</div>
        </transition>
      </div>
    </div>
    <h2 v-if="h2On && hudOn && taskList.length === 0">No tasks available</h2>
    <ul
      id="task-list-app"
      class="form-block scrollable task-display"
      v-if="tasksShow"
    >
      <li class="main-task" v-for="(task, index) in taskList" :key="index">
        <template v-if="!task.sub">
          <h4 :class="{ inactive: task.main.completed }">
            {{ task.main.name }}
          </h4>
          <div class="x-icon-tasks">
            <h3 @click="deleteMainTask(index)">x</h3>
          </div>
        </template>

        <template v-else>
          <h4 :class="{ inactive: task.main.completed }">
            {{ task.main.name }}
          </h4>
          <div class="subs-icon" @click="expandTask(index)"></div>
          <div class="x-icon-tasks">
            <h3 @click="deleteMainTask(index)">x</h3>
          </div>
          <div class="side-task-container" v-if="task.expanded">
            <div
              class="side-task"
              v-for="(sTask, ind) in task.sub"
              :key="ind"
              :class="{ inactive: sTask.completed }"
            >
              {{ sTask.name }}
              <span class="x-icon-tasks"
                ><h3 @click="deleteSubTask(index, ind)">x</h3></span
              >
            </div>
          </div>
        </template>
      </li>
    </ul>
    <div
      class="icon-tasks app-icon"
      @click="hideTasks"
      @mouseleave="showTasks = false"
      @mouseenter="showTasks = true"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 182 213">
        <path
          class="cls-1"
          d="M78.74,132.3a4.29,4.29,0,0,1,0,6.07L56.88,160.23a4.29,4.29,0,0,1-6.07,0L39.26,148.67a4.29,4.29,0,0,1,6.07-6.07l7.91,7.91a.86.86,0,0,0,1.22,0L72.67,132.3A4.3,4.3,0,0,1,78.74,132.3Z"
        />
        <path
          class="cls-1"
          d="M78.74,73.3a4.29,4.29,0,0,1,0,6.07L56.88,101.23a4.29,4.29,0,0,1-6.07,0L39.26,89.67a4.29,4.29,0,0,1,6.07-6.07l7.91,7.91a.86.86,0,0,0,1.22,0L72.67,73.3A4.3,4.3,0,0,1,78.74,73.3Z"
        />
        <path
          class="cls-1"
          d="M144,151a4.62,4.62,0,0,1-1.76,3.54A6.63,6.63,0,0,1,138,156H102c-3.31,0-6-2.24-6-5a4.62,4.62,0,0,1,1.76-3.54A6.63,6.63,0,0,1,102,146h36C141.31,146,144,148.24,144,151Z"
        />
        <path
          class="cls-1"
          d="M144,92a4.62,4.62,0,0,1-1.76,3.54A6.63,6.63,0,0,1,138,97H102c-3.31,0-6-2.24-6-5a4.62,4.62,0,0,1,1.76-3.54A6.63,6.63,0,0,1,102,87h36C141.31,87,144,89.24,144,92Z"
        />
        <path
          class="cls-1"
          d="M144,20l-1.22,0H39.22L38,20A33.22,33.22,0,0,0,6,53.22V173.78A33.22,33.22,0,0,0,39.22,207H142.78A33.22,33.22,0,0,0,176,173.78V53.22A33.22,33.22,0,0,0,144,20Zm26,153.76A27.25,27.25,0,0,1,142.78,201H39.22A27.25,27.25,0,0,1,12,173.78V53.22A27.25,27.25,0,0,1,38,26V37.27C38,39.33,40.24,41,43,41s5-1.67,5-3.73V26H86V37.27C86,39.33,88.24,41,91,41s5-1.67,5-3.73V26h38V37.27c0,2.06,2.24,3.73,5,3.73s5-1.67,5-3.73V26a27.25,27.25,0,0,1,26,27.19Z"
        />
        <path
          class="cls-2"
          d="M144,14l-1.22,0H39.22L38,14A39.28,39.28,0,0,0,0,53.22V173.78A39.27,39.27,0,0,0,39.22,213H142.78A39.27,39.27,0,0,0,182,173.78V53.22A39.28,39.28,0,0,0,144,14Zm26,159.76A27.25,27.25,0,0,1,142.78,201H39.22A27.25,27.25,0,0,1,12,173.78V53.22A27.25,27.25,0,0,1,38,26c.41,0,.81,0,1.22,0H142.78c.41,0,.81,0,1.22,0a27.25,27.25,0,0,1,26,27.19Z"
        />
        <path
          class="cls-1"
          d="M144,26V37.27c0,2.06-2.24,3.73-5,3.73s-5-1.67-5-3.73V26H96V37.27C96,39.33,93.76,41,91,41s-5-1.67-5-3.73V26H48V37.27C48,39.33,45.76,41,43,41s-5-1.67-5-3.73V26A27.25,27.25,0,0,0,12,53.22V173.78A27.25,27.25,0,0,0,39.22,201H142.78A27.25,27.25,0,0,0,170,173.78V53.22A27.25,27.25,0,0,0,144,26ZM78.74,138.37,56.88,160.23a4.29,4.29,0,0,1-6.07,0L39.26,148.67a4.29,4.29,0,0,1,6.07-6.07l7.91,7.91a.86.86,0,0,0,1.22,0L72.67,132.3a4.3,4.3,0,0,1,7.33,3A4.25,4.25,0,0,1,78.74,138.37Zm0-59L56.88,101.23a4.29,4.29,0,0,1-6.07,0L39.26,89.67a4.29,4.29,0,0,1,6.07-6.07l7.91,7.91a.86.86,0,0,0,1.22,0L72.67,73.3a4.3,4.3,0,0,1,7.33,3A4.25,4.25,0,0,1,78.74,79.37Zm63.5,75.17A6.63,6.63,0,0,1,138,156H102c-3.31,0-6-2.24-6-5a4.62,4.62,0,0,1,1.76-3.54A6.63,6.63,0,0,1,102,146h36c3.31,0,6,2.24,6,5A4.62,4.62,0,0,1,142.24,154.54Zm0-59A6.63,6.63,0,0,1,138,97H102c-3.31,0-6-2.24-6-5a4.62,4.62,0,0,1,1.76-3.54A6.63,6.63,0,0,1,102,87h36c3.31,0,6,2.24,6,5A4.62,4.62,0,0,1,142.24,95.54Z"
        />
        <path
          class="cls-2"
          d="M48,3.73V37.27C48,39.33,45.76,41,43,41s-5-1.67-5-3.73V3.73C38,1.67,40.24,0,43,0a6,6,0,0,1,3.54,1.09A3.35,3.35,0,0,1,48,3.73Z"
        />
        <path
          class="cls-2"
          d="M96,3.73V37.27C96,39.33,93.76,41,91,41s-5-1.67-5-3.73V3.73C86,1.67,88.24,0,91,0a6,6,0,0,1,3.54,1.09A3.35,3.35,0,0,1,96,3.73Z"
        />
        <path
          class="cls-2"
          d="M144,3.73V37.27c0,2.06-2.24,3.73-5,3.73s-5-1.67-5-3.73V3.73C134,1.67,136.24,0,139,0a6,6,0,0,1,3.54,1.09A3.35,3.35,0,0,1,144,3.73Z"
        />
        <path
          class="cls-2"
          d="M80,76.34a4.25,4.25,0,0,1-1.26,3L56.88,101.23a4.29,4.29,0,0,1-6.07,0L39.26,89.67a4.29,4.29,0,0,1,6.07-6.07l7.91,7.91a.86.86,0,0,0,1.22,0L72.67,73.3a4.3,4.3,0,0,1,7.33,3Z"
        />
        <path
          class="cls-2"
          d="M144,92a4.62,4.62,0,0,1-1.76,3.54A6.63,6.63,0,0,1,138,97H102c-3.31,0-6-2.24-6-5a4.62,4.62,0,0,1,1.76-3.54A6.63,6.63,0,0,1,102,87h36C141.31,87,144,89.24,144,92Z"
        />
        <path
          class="cls-2"
          d="M80,135.34a4.25,4.25,0,0,1-1.26,3L56.88,160.23a4.29,4.29,0,0,1-6.07,0L39.26,148.67a4.29,4.29,0,0,1,6.07-6.07l7.91,7.91a.86.86,0,0,0,1.22,0L72.67,132.3a4.3,4.3,0,0,1,7.33,3Z"
        />
        <path
          class="cls-2"
          d="M144,151a4.62,4.62,0,0,1-1.76,3.54A6.63,6.63,0,0,1,138,156H102c-3.31,0-6-2.24-6-5a4.62,4.62,0,0,1,1.76-3.54A6.63,6.63,0,0,1,102,146h36C141.31,146,144,148.24,144,151Z"
        />
      </svg>
      <transition name="show-label" mode="out-in">
        <div class="label" v-show="showTasks">Tasks</div>
      </transition>
    </div>
  </div>
</template>

<script>
import { db } from "../../firebase/db";
export default {
  data() {
    return {
      tasksShow: false,
      hudOn: false,
      h2On: false,
      showTasks: false,
      showNew: false,
      showEdit: false,
    };
  },
  computed: {
    taskList() {
      return this.$store.getters.tasks;
    },
  },
  methods: {
    hideTasks() {
      const taskDiv = document.querySelector("#task-display");
      const winWidth = window.innerWidth;
      if (winWidth <= 640) {
        if (this.tasksShow) {
          taskDiv.style.width = "0%";
          taskDiv.style.padding = "0";
          taskDiv.style.paddingRight = "0";
          this.h2On = false;
          setTimeout(() => {
            this.$store.dispatch("updateHeaderState", [3, "d"]);
          }, 150);
          setTimeout(() => {
            this.tasksShow = false;
            this.hudOn = false;
          }, 750);
        } else {
          this.$store.dispatch("updateHeaderState", [3, "m"]);
          taskDiv.style.width = "100%";
          taskDiv.style.padding = "1rem";
          taskDiv.style.paddingRight = "3rem";
          this.tasksShow = true;
          this.hudOn = true;
          setTimeout(() => {
            this.h2On = true;
          }, 750);
        }
      } else {
        if (this.tasksShow) {
          taskDiv.style.width = "0%";
          taskDiv.style.padding = "0";
          taskDiv.style.paddingRight = "0";
          this.h2On = false;
          setTimeout(() => {
            this.$store.dispatch("updateHeaderState", [3, "d"]);
          }, 150);
          setTimeout(() => {
            this.tasksShow = false;
            this.hudOn = false;
          }, 750);
        } else {
          this.$store.dispatch("updateHeaderState", [3, "m"]);
          taskDiv.style.width = "50%";
          taskDiv.style.padding = "1rem";
          taskDiv.style.paddingRight = "3rem";
          this.tasksShow = true;
          this.hudOn = true;
          setTimeout(() => {
            this.h2On = true;
          }, 750);
        }
      }
    },
    deleteMainTask(index) {
      this.$store.dispatch("delMTask", index);
      this.updateTasksInCloud();
    },
    deleteSubTask(index, ind) {
      this.$store.dispatch("delSTask", [index, ind]);
      this.updateTasksInCloud();
    },
    expandTask(index) {
      this.$store.dispatch("expandTask", index);
      this.updateTasksInCloud();
    },
    windowResized() {
      const winWidth = window.innerWidth;
      const winHeight = window.innerHeight;
      const taskDiv = document.querySelector("#task-display");
      const rem = parseFloat(
        getComputedStyle(document.documentElement).fontSize
      );
      const headerHeight = document.querySelector("#app-header-new").clientHeight;
      const footerHeight = document.querySelector("#app-footer").clientHeight;
      if (winWidth <= 640) {
        taskDiv.style.height = `${winHeight -
          headerHeight -
          footerHeight -
          1.5 * rem}px`;
      }
    },
    updateTasksInCloud() {
      let uid = this.$store.getters.uid;
      db.collection("users")
        .doc(uid)
        .update({
          tasks: this.taskList,
        });
    },
    newTasksClicked() {
      this.$store.dispatch("updateTaskEdit", true);
      this.$store.dispatch("updateTasks", []);
      this.$router.replace("/tasks");
    },
    editTasksClicked() {
      this.$store.dispatch("updateTaskEdit", true);
      this.$router.replace("/tasks");
    },
  },
  mounted() {
    window.addEventListener("resize", this.windowResized);
    this.windowResized();
  },
  unmounted() {
    window.removeEventListener("resize", this.windowResized);
  },
};
</script>

<style>
#task-display {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 0;
  height: 90%;
  border-right: solid var(--col-0-t) 1px;
  margin-right: 2rem;
  transition: all 1s ease-in-out;
  background: var(--col-0-t);
  text-align: center;
  color: var(--col-0);
  z-index: 2;
}
#task-display h2 {
  text-align: center;
}
.app-icon {
  padding: 0.2rem;
  margin: 1rem;
  width: 3rem;
  height: 3rem;
}
.app-icon svg {
  width: 80%;
  transition: all ease-in-out 0.3s;
}
.app-icon svg .cls-1 {
  fill: none;
  transition: all ease-in-out 0.3s;
}
.app-icon svg .cls-2 {
  fill: var(--col-0);
  transition: all ease-in-out 0.3s;
}
.app-icon:hover svg {
  transform: scale(1.1);
}
.app-icon:hover svg .cls-1 {
  fill: var(--col-2);
}
.app-icon:hover svg .cls-2 {
  fill: var(--col-4);
}
#top-hud-tasks {
  position: absolute;
  width: 80%;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: solid var(--col-0-t) 1px;
}
#top-hud-tasks .icon-new svg,
#top-hud-tasks .icon-edit svg {
  width: 80%;
  transition: all ease-in-out 0.3s;
}
.icon-tasks {
  position: absolute;
  width: 3rem;
  height: 3rem;
  right: -2.5rem;
}
.show-label-enter-active {
  animation: ease-in-out 0.2s show-label-in forwards;
}
.show-label-leave-active {
  animation: ease-in-out 0.2s show-label-out forwards;
}

@keyframes show-label-in {
  0% {
    opacity: 0;
    transform: scale(0.5, 0.5);
  }
  100% {
    opacity: 0.75;
    transform: scale(1, 1);
  }
}
@keyframes show-label-out {
  0% {
    opacity: 0.75;
    transform: scale(1, 1);
  }
  100% {
    opacity: 0;
    transform: scale(0.1, 0.1);
  }
}

/* TaskList */
.inactive {
  text-decoration: line-through;
  color: var(--col-0-ht) !important;
}
#task-list-app {
  width: 100%;
  height: 80%;
}

#task-list-app .main-task {
  position: relative;
  list-style: none;
  padding: 1rem;
  width: 100%;
  border-bottom: var(--col-0-t) solid 1px;
  text-align: center;
  font-size: 1.2rem;
  color: var(--col-0);
}
#task-list-app .main-task h4 {
  display: inline;
}
.subs-icon {
  display: inline-block;
  margin-left: 1rem;
  width: 0.6rem;
  height: 0.6rem;
  transform: rotate(-45deg) translate(0, -50%);
  border-bottom: var(--col-3) solid 2px;
  border-left: var(--col-3) solid 2px;
}
.subs-icon:hover {
  cursor: pointer;
  border-bottom: var(--col-1) solid 2px;
  border-left: var(--col-1) solid 2px;
}
.x-icon-tasks {
  position: absolute;
  display: inline-block;
  right: 5%;
}
.x-icon-tasks h3 {
  cursor: pointer;
  color: var(--col-1);
  transition: all 0.2s ease-out;
}
.x-icon-tasks h3:hover {
  color: var(--col-3);
}
#task-list-app .main-task .side-task-container {
  padding: 1rem;
  margin-top: 0.5rem;
  border: var(--col-0) solid 1px;
  display: flex;
  flex-wrap: wrap;
}
#task-list-app .main-task .side-task {
  padding: 1rem;
  border: var(--col-0-t) solid 1px;
  margin: 0.2rem;
  text-align: center;
  font-size: 1rem;
  color: var(--col-0);
}
#task-list-app .main-task .side-task .x-icon-tasks {
  position: static;
  margin-left: 0.75rem;
  font-size: 0.75rem;
}

@media (max-width: 640px) {
  #task-display {
    position: absolute;
    left: 0;
    top: 5rem;
    z-index: 15;
    border-right: solid var(--col-0-t) 2px;
    margin-right: 0rem;
    background: var(--col-5);
  }
}

@media (max-width: 768px) {
}
</style>
