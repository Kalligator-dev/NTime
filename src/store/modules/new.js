const state = {
  dayName: "",
  dayType: "",
  sleep: {},
  work: 0,
  breaks: [],
  tasks: [],
  total: 0,
  valid: 0,
  err: {},
  subBtnClick: 0,
  responseUpdate: 0,
};

const mutations = {
  SET_DAY(state, name, type) {
    (state.dayName = name), (state.dayType = type);
  },
  SET_SLEEP(state, sleep) {
    state.sleep = sleep;
  },
  SET_WORK(state, work) {
    state.work = work;
  },
  SET_BREAKS(state, breaks) {
    const sleepSt = state.sleep.from;
    const sleepEnd = state.sleep.to;
    for (let i = 0; i < breaks.length - 1; i++) {
      if (breaks[i].start < sleepEnd && breaks[i].start >= sleepSt) {
        if (breaks[i].end <= sleepEnd) {
          breaks.splice(i, 1);
          i -= 1;
        } else {
          let merg = { start: sleepEnd, end: breaks[i].end };
          breaks.splice(i, 1, merg);
          i -= 1;
        }
      }
    }
    state.breaks = breaks;
  },
  SET_TASKS(state, tasks) {
    state.tasks = tasks;
  },
  EXPAND_MAIN_TASK(state, index) {
    state.tasks[index].expanded = !state.tasks[index].expanded;
  },
  DELETE_MAINTASK(state, index) {
    state.tasks[index].main.completed = !state.tasks[index].main.completed;
  },
  DELETE_SUBTASK(state, inds) {
    state.tasks[inds[0]].sub[inds[1]].completed = !state.tasks[inds[0]].sub[
      inds[1]
    ].completed;
  },
  SET_VALID(state, valid) {
    state.valid = valid;
  },
  SET_ERROR(state, err) {
    state.err = err;
  },
  SET_SUB(state, sub) {
    state.subBtnClick = sub;
  },
  SET_RESPONSE(state) {
    state.responseUpdate += 1;
  },
  SET_TOTAL(state) {
    let sleepHrs = 0;
    let breakHrs = 0;
    let sleepStart = state.sleep.from;
    let sleepEnd = state.sleep.to;
    if (state.sleep !== {}) {
      if (sleepEnd < sleepStart) {
        sleepEnd += 12;
        let stHr = Math.floor(sleepStart);
        let stMins = Math.round((sleepStart - Math.floor(sleepStart)) * 100);
        let endHr = Math.floor(sleepEnd);
        let endMins = Math.round((sleepEnd - Math.floor(sleepEnd)) * 100);
        sleepHrs = endHr + endMins / 60 - (stHr + stMins / 60);
      } else {
        let stHr = Math.floor(sleepStart);
        let stMins = Math.round((sleepStart - Math.floor(sleepStart)) * 100);
        let endHr = Math.floor(sleepEnd);
        let endMins = Math.round((sleepEnd - Math.floor(sleepEnd)) * 100);
        sleepHrs = endHr + endMins / 60 - (stHr + stMins / 60);
      }
    }
    if (state.breaks !== []) {
      let brLength = state.breaks.length;
      for (let i = 0; i < brLength; i++) {
        if (state.breaks[i].end > state.breaks[i].start) {
          let stHr = Math.floor(state.breaks[i].start);
          let stMins = Math.round(
            (state.breaks[i].start - Math.floor(state.breaks[i].start)) * 100
          );
          let endHr = Math.floor(state.breaks[i].end);
          let endMins = Math.round(
            (state.breaks[i].end - Math.floor(state.breaks[i].end)) * 100
          );
          breakHrs += endHr + endMins / 60 - (stHr + stMins / 60);
        } else {
          let brEnd = state.breaks[i].end + 12;
          let stHr = Math.floor(state.breaks[i].start);
          let stMins = Math.round(
            (state.breaks[i].start - Math.floor(state.breaks[i].start)) * 100
          );
          let endHr = Math.floor(brEnd);
          let endMins = Math.round((brEnd - Math.floor(brEnd)) * 100);
          breakHrs += endHr + endMins / 60 - (stHr + stMins / 60);
        }
      }
    }
    if (state.work + sleepHrs + breakHrs !== 24) {
      state.work = 24 - (sleepHrs + breakHrs);
    }
    state.total = sleepHrs + state.work + breakHrs;
  },
};

const actions = {
  updateDay: ({ commit }, dayName, dayType) => {
    commit("SET_DAY", dayName, dayType);
  },
  updateSleep: ({ commit }, sleep, sleep2 = 0) => {
    commit("SET_SLEEP", sleep, sleep2);
  },
  updateWork: ({ commit }, work) => {
    commit("SET_WORK", work);
  },
  updateBreaks: ({ commit }, breaks) => {
    commit("SET_BREAKS", breaks);
  },
  updateTasks: ({ commit }, tasks) => {
    commit("SET_TASKS", tasks);
  },
  updateTotal: ({ commit }) => {
    commit("SET_TOTAL");
  },
  updateValid: ({ commit }, valid) => {
    commit("SET_VALID", valid);
  },
  updateResponse: ({ commit }) => {
    commit("SET_RESPONSE");
  },
  showErr({ commit }, err) {
    commit("SET_ERROR", err);
  },
  clickSub({ commit }, sub) {
    commit("SET_SUB", sub);
  },
  expandTask({ commit }, index) {
    commit("EXPAND_MAIN_TASK", index);
  },
  delMTask({ commit }, index) {
    commit("DELETE_MAINTASK", index);
  },
  delSTask({ commit }, inds) {
    commit("DELETE_SUBTASK", inds);
  },
};

const getters = {
  work: (state) => {
    return state.work;
  },
  total: (state) => {
    return state.total;
  },
  valid: (state) => {
    return state.valid;
  },
  err: (state) => {
    return state.err;
  },
  stata: (state) => {
    return state;
  },
  subBtnClick: (state) => {
    return state.subBtnClick;
  },
  responseUpdate: (state) => {
    return state.responseUpdate;
  },
  tasks: (state) => {
    return state.tasks;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
