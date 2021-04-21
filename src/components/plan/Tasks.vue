<template>
  <div id="tasks" class="div-block">
    <div class="m-header header-block">
      <h2>Task List</h2>
      <svg viewBox="0 0 40 2" class="line-svg" preserveAspectRatio="none">
        <path d="M0 1 L40 1" />
      </svg>
    </div>
    <div id="task-inputs">
      <div class="form-block" id="main-task-input">
        <label for="work-duration">
          Task Name <span class="extra-txt">(Make it clear)</span>
        </label>
        <input
          class="input-field"
          type="text"
          id="task-main"
          v-model="mainTask"
          required
          minlength="0"
          maxlength="15"
          placeholder="Task Name"
        />
        <input-line></input-line>
      </div>
      <div class="form-block" id="sub-task-input">
        <label for="work-duration">
          Sub-Task <span class="extra-txt">(leave blank if none)</span>
        </label>
        <input
          class="input-field"
          type="text"
          id="task-sub"
          v-model="subTask"
          minlength="0"
          maxlength="35"
          placeholder="Sub-Task(if any)"
        />
        <input-line></input-line>
      </div>
      <button class="form-btn" id="add-task-btn" @click.prevent="addTask">
        Add
      </button>
    </div>
    <ul id="task-list" class="form-block scrollable">
      <li class="main-task" v-for="(task, index) in taskList" :key="index">
        <template v-if="!task.sub">
          <h4>{{ task.main.name }}</h4>
          <div class="x-icon-tasks">
            <h3 @click="deleteTask(index)">x</h3>
          </div>
        </template>

        <template v-else>
          <h4>{{ task.main.name }}</h4>
          <div class="subs-icon" @click="task.expanded = !task.expanded"></div>
          <div class="x-icon-tasks">
            <h3 @click="deleteTask(index)">x</h3>
          </div>
          <div class="side-task-container" v-if="task.expanded">
            <div class="side-task" v-for="(sTask, ind) in task.sub" :key="ind">
              {{ sTask.name }}
              <span class="x-icon-tasks"
                ><h3 @click="deleteSubTask(index, ind)">x</h3></span
              >
            </div>
          </div>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mainTask: "",
      subTask: "",
    };
  },
  computed: {
    taskList() {
      return this.$store.getters.tasks;
    },
    mainTasks() {
      let mainTs = [];
      this.taskList.forEach((task) => {
        mainTs.push(task.main.name.toLowerCase());
      });
      return mainTs;
    },
    subClicked() {
      return this.$store.getters.subBtnClick;
    },
  },
  watch: {
    subClicked() {
      if (this.subClicked === 4) {
        this.pushTasks();
      }
    },
  },
  methods: {
    deleteTask(index) {
      this.taskList.splice(index, 1);
    },
    deleteSubTask(index, subIndex) {
      this.taskList[index].sub.splice(subIndex, 1);
      if (this.taskList[index].sub.length < 1) {
        delete this.taskList[index].sub;
        delete this.taskList[index].expanded;
      }
    },
    addTask() {
      if (this.mainTask.length > 0) {
        if (this.mainTasks.indexOf(this.mainTask.toLowerCase()) < 0) {
          if (this.subTask.length > 0) {
            this.taskList.push({
              main: { name: this.mainTask, completed: false },
              sub: [{ name: this.subTask, completed: false }],
              expanded: false,
            });
            this.showErr("Main-task & sub-task successfully added!", 2);
            this.subTask = "";
          } else {
            this.taskList.push({
              main: { name: this.mainTask, completed: false },
            });
            this.showErr("Main-task successfully added!", 2);
            this.mainTask = "";
          }
        } else {
          this.taskList.forEach((task) => {
            if (task.main.name.toLowerCase() === this.mainTask.toLowerCase()) {
              if (this.subTask.length > 0) {
                if (task.sub) {
                  let subTasks = [];
                  task.sub.forEach((sTask) => {
                    subTasks.push(sTask.name.toLowerCase());
                  });
                  if (subTasks.indexOf(this.subTask.toLowerCase()) < 0) {
                    task.sub.push({ name: this.subTask, completed: false });
                    this.showErr("Sub-task successfully added!", 2);
                    this.subTask = "";
                  } else {
                    this.showErr(
                      "This sub-task already exists in this main task.",
                      1
                    );
                    // this.subTask = ''
                  }
                } else {
                  this.$set(task, "sub", [
                    { name: this.subTask, completed: false },
                  ]);
                  this.$set(task, "expanded", false);
                  this.showErr("Sub-task successfully added!", 2);
                  this.subTask = "";
                }
              } else {
                this.showErr(
                  "This main task already exists. You can add a sub-task to it if you want but you cannot add the same main task twice",
                  1
                );
              }
            }
          });
        }
      } else {
        this.showErr("Please enter a main task first", 1);
      }
    },
    pushTasks() {
      this.$store.dispatch("updateTasks", this.taskList);
      this.$store.dispatch("updateValid", 1);
      this.$store.dispatch("updateResponse");
      this.$store.dispatch("clickSub", 0);
    },
    showErr(msg, type) {
      this.$store.dispatch("updateValid", 0);
      const err = { msg: msg, type: type };
      this.$store.dispatch("showErr", err);
      this.$store.dispatch("updateResponse");
      this.$store.dispatch("clickSub", 0);
    },
  },
};
</script>

<style>
#tasks {
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
}
#task-inputs {
  display: flex;
  align-self: flex-end;
}
#task-inputs .form-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#task-inputs input {
  padding: 0.5rem;
  background: var(--col-0-t);
  display: block;
  text-align: center;
}
#main-task-input input + .line-svg {
  width: 50%;
}
#sub-task-input input {
  width: 100%;
}
#sub-task-input input ~ .line-svg {
  width: 100%;
}
#add-task-btn {
  justify-self: center;
  align-self: center;
  margin-left: 2rem;
  border-bottom: none;
}

#task-list {
  max-height: 53%;
  margin-top: 1rem;
}

#task-list .main-task {
  position: relative;
  list-style: none;
  padding: 1rem;
  width: 100%;
  border-bottom: var(--col-0-t) solid 1px;
  text-align: center;
  font-size: 1.2rem;
  color: var(--col-0);
}
#task-list .main-task h4 {
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
#task-list .main-task .side-task-container {
  padding: 1rem;
  margin-top: 0.5rem;
  border: var(--col-0) solid 1px;
  display: flex;
  flex-wrap: wrap;
}
#task-list .main-task .side-task {
  padding: 1rem;
  border: var(--col-0-t) solid 1px;
  margin: 0.2rem;
  text-align: center;
  font-size: 1rem;
  color: var(--col-0);
}
#task-list .main-task .side-task .x-icon-tasks {
  position: static;
  margin-left: 0.75rem;
  font-size: 0.75rem;
}

@media (max-width: 640px) {
  #tasks {
    height: 80%;
  }
  #task-inputs {
    flex-direction: column;
    align-self: center;
    justify-content: flex-start;
    align-items: flex-start;
  }
  #task-main + .line-svg {
    height: 2px !important;
  }
  #task-sub ~ .line-svg {
    height: 1px !important;
  }
  #add-task-btn {
    align-self: flex-end;
  }

  #task-list {
    height: auto;
    margin-top: 0.5rem;
  }
}
</style>
