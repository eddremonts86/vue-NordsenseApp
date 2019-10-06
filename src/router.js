import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Task Board",
      component: () => import("./components/task/tasksList.vue")
    },{
      path: "/auth",
      name: "Auth Docs",
      component: () => import("./components/docs/auth.vue")
    }
  ]
});
