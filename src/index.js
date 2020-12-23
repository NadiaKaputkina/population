import './scss/index.scss';

window.Vue = require('vue');

Vue.component('login-page', require('./components/LoginPage.vue').default);

Vue.component('modal', require('./components/Modal.vue').default);
Vue.component('modal-dialog', require('./components/ModalDialog.vue').default);

Vue.component('get-users', require('./components/GetUsers.vue').default);
Vue.component('view-user', require('./components/ViewUser.vue').default);
Vue.component('filters', require('./components/Filters.vue').default);
Vue.component('relative-user', require('./components/RelativeUser.vue').default);

const app = new Vue({
    el: '#app'
});