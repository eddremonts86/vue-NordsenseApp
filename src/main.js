import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";
import VueSweetalert2 from 'vue-sweetalert2';

import "material-design-icons-iconfont/dist/material-design-icons.css";
import "./assets/styles.css";
Vue.use(VueSweetalert2, {
  confirmButtonColor: '#1f4aff',
  cancelButtonColor: '#C62828',
});
Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
