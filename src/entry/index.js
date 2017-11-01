import 'babel-polyfill';
import 'js/viewport.min.js';
import 'style/index.scss';
import Vue from 'vue';
import App from '../pages/app';
import router from '../routers/indexRouter';
import store from '../vuex';
// import FastClick from 'fastclick';

// if ('addEventListener' in document) {
//     document.addEventListener('DOMContentLoaded', function () {
//         FastClick.attach(document.body);
//     }, false);
// }

new Vue({
    render: h => h(App),
    store,
    router
}).$mount('#app');