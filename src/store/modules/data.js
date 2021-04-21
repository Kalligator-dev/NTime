const state = {
  timetable: [],
  curHour: 0,
  curMin: 0,
  headerState: 1,
  darkMode: true,
  doneTasks: true,
  newApp: true,
  taskEdit: false,
  loggedIn: false,
  verified: false,
  name: "",
  uid: "",
  userComp: "login",
};

const mutations = {
  SET_TIMETABLE(state, newP) {
    const sleep = newP.sleep;
    const breaks = newP.breaks;
    const timize = function(n) {
      let hr = Math.floor(n);
      let mins = Math.round((n - hr) * 100);
      return [hr, mins];
    };
    const tablize = (st, end, type, table = []) => {
      table.push([st, end, type]);
      return table;
    };
    let fTable = [];
    // Sleep
    let sleepSt = timize(sleep.from);
    let sleepEnd = timize(sleep.to);
    const sleepR = tablize(sleepSt, sleepEnd, 0, fTable);
    // Breaks
    breaks.forEach((br) => {
      let brSt = timize(br.start);
      let brEnd = timize(br.end);
      tablize(brSt, brEnd, 1, sleepR);
    });
    // Work
    if (sleepR.length > 1) {
      for (let i = 0; i < sleepR.length - 1; i++) {
        let cur = sleepR[i];
        let next = sleepR[i + 1];
        if (cur[1][0] !== next[0][0]) {
          let workPeriod = [cur[1], next[0], 2];
          sleepR.splice(i + 1, 0, workPeriod);
          i -= 1;
        } else {
          if (cur[1][1] !== next[0][1]) {
            let workPeriod = [cur[1], next[0], 2];
            sleepR.splice(i + 1, 0, workPeriod);
            i -= 1;
          }
        }
      }
    }
    if (
      sleepR[sleepR.length - 1][1][0] < 24 &&
      sleepR[sleepR.length - 1][1][1] < 59
    ) {
      let workPeriod = [sleepR[sleepR.length - 1][1], [23, 59], 2];
      sleepR.push(workPeriod);
    }

    state.timetable = sleepR;
  },
  SET_TIME(state, today) {
    state.curHour = today.getHours();
    state.curMin = today.getMinutes();
  },
  SET_HEADER_STATE(state, x) {
    if (x[1] === "m") {
      state.headerState *= x[0];
    }
    if (x[1] === "d") {
      state.headerState /= x[0];
    }
    if (x[1] === "r") {
      state.headerState = 1;
    }
  },
  SET_DONE_TASKS(state) {
    state.doneTasks = !state.doneTasks;
  },
  SET_DARK_MODE(state) {
    state.darkMode = !state.darkMode;
  },
  SET_DARK_MODE_TO(state, toDM) {
    state.darkMode = toDM;
  },
  SET_NEW_APP(state) {
    state.newApp = !state.newApp;
  },
  SET_TASK_EDIT(state, edit) {
    state.taskEdit = edit;
  },
  SET_LOGGED_IN(state, logged) {
    state.loggedIn = logged;
  },
  SET_VERIFIED(state, ver) {
    state.verified = ver;
  },
  SET_NAME(state, name) {
    state.name = name;
  },
  SET_TT(state, tt) {
    state.timetable = tt;
  },
  SET_UID(state, uid) {
    state.uid = uid;
  },
  SET_USER_COMP(state, comp) {
    state.userComp = comp;
  },
};

const actions = {
  createTT({ commit, rootState }) {
    commit("SET_TIMETABLE", rootState.newPlan);
  },
  updateTime({ commit }) {
    const today = new Date();
    commit("SET_TIME", today);
  },
  updateHeaderState({ commit }, x) {
    commit("SET_HEADER_STATE", x);
  },
  switchDT({ commit }) {
    commit("SET_DONE_TASKS");
  },
  switchDM({ commit }) {
    commit("SET_DARK_MODE");
  },
  updateDM({ commit }, dm) {
    commit("SET_DARK_MODE_TO", dm);
  },
  switchNewApp({ commit }) {
    commit("SET_NEW_APP");
  },
  updateTaskEdit({ commit }, edit) {
    commit("SET_TASK_EDIT", edit);
  },
  updateLoggedIn({ commit }, logged) {
    commit("SET_LOGGED_IN", logged);
  },
  updateVerified({ commit }, ver) {
    commit("SET_VERIFIED", ver);
  },
  updateName({ commit }, name) {
    commit("SET_NAME", name);
    localStorage.setItem("name", name);
  },
  updateTT({ commit }, tt) {
    commit("SET_TT", tt);
  },
  updateUID({ commit }, uid) {
    commit("SET_UID", uid);
  },
  updateUserComp({ commit }, comp) {
    commit("SET_USER_COMP", comp);
  },
};

const getters = {
  timetable(state) {
    return state.timetable;
  },
  curHour(state) {
    return state.curHour;
  },
  curMin(state) {
    return state.curMin;
  },
  headerState(state) {
    return state.headerState;
  },
  doneTasks(state) {
    return state.doneTasks;
  },
  darkMode(state) {
    return state.darkMode;
  },
  newApp(state) {
    return state.newApp;
  },
  taskEdit(state) {
    return state.taskEdit;
  },
  loggedIn(state) {
    return state.loggedIn;
  },
  verified(state) {
    return state.verified;
  },
  name(state) {
    return state.name;
  },
  uid(state) {
    return state.uid;
  },
  userComp(state) {
    return state.userComp;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
