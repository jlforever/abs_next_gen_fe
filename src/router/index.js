import Vue from "vue";
import Router from "vue-router";
import Meta from "vue-meta";
import Home from "@/views/Home.vue";
//import Login from "@/views/Login.vue";
import Signup from "@/views/Signup.vue";
import store from "../store";

Vue.use(Router);
Vue.use(Meta, {
  keyName: "metaInfo",
  attribute: "data-vue-meta",
  ssrAttribute: "data-vue-meta-server-rendered",
  tagIDKeyName: "vmid",
  refreshOnceOnNavigation: true
});

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/dashboard");
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  if (from?.path !== "/signup") {
    next("/login");
  }
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
    beforeEnter: ifNotAuthenticated
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    beforeEnter: ifNotAuthenticated
  },
  /*{ For Testing
    path: "/docs",
    name: "Helper",
    component: () => import("../views/Helper.vue")
  },*/
  /*{
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/Dashboard.vue"),
    beforeEnter: ifAuthenticated
  },*/
  {
    path: "/parent",
    name: "ParentInfo",
    component: () => import("../views/Profile.vue"),
    beforeEnter: ifAuthenticated
  },
  {
    path: "/students",
    name: "Students",
    component: () => import("../views/FamilyMembers.vue"),
    beforeEnter: ifAuthenticated
  },
  {
    path: "/courses",
    name: "Courses",
    component: () => import("../views/Courses.vue"),
    beforeEnter: ifAuthenticated
  },
  {
    path: "/courses/:id",
    name: "CourseDetails",
    component: () => import("../views/CourseDetails.vue"),
    beforeEnter: ifAuthenticated
  }
];

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
