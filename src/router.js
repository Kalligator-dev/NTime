import { createRouter, createWebHistory } from "vue-router";
import firebase from "firebase/app";
import "firebase/auth";
import Home from "./components/home/Home";
import NewPlan from "./components/plan/Plan";
import Ntime from "./components/timetable/Ntime";
import Tasks from "./components/timetable/TasksEdit";
import User from "./components/misc/User";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home, name: "main" },
    { path: "/new", component: NewPlan },
    { path: "/app", component: Ntime },
    { path: "/tasks", component: Tasks },
    { path: "/user", component: User },
    { path: "/contact", component: User },
    { path: "/:notFound(.*)", redirect: { name: "main" } },
  ],
});

router.beforeEach((to, from, next) => {
  const forbidden = {
    "/new": true,
    "/app": true,
    "/tasks": true,
  };
  if (forbidden[to.path]) {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        if (forbidden[from.path]) {
          next("/user");
        } else {
          next(from.to);
        }
      } else {
        if (user.emailVerified) {
          next();
        } else {
          next("/user");
        }
      }
    });
  } else {
    next()
  }
});
export default router;
