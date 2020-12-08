window.Vue = require('vue');

Vue.component('get-users', require('./components/GetUsers.vue').default);
Vue.component('view-user', require('./components/ViewUser.vue').default);
Vue.component('filters', require('./components/Filters.vue').default);

const app = new Vue({
    el: '#app'
});