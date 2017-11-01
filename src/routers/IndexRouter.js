import Vue from 'vue';
import VueRouter from 'vue-router';
// import IndexStore from '../vuex';

Vue.use(VueRouter);

const router = new VueRouter({
    // 是否使用 HTML5 history 模式
    mode: 'history',
    // 是否使用虚拟模式
    abstract: true,
    // 定义路由根路径
    root: '/',
    routes: [{
        path: '/',
        component: r => require.ensure([], () => r(require('../pages/app.vue')), 'app'),
    }, {
        path: '*',
        redirect: '/home'
    }]
});

/***
 * 全局钩子函数
 ***/

// 视图切换动画逻辑
// const commit = IndexStore.commit || IndexStore.dispatch;
// router.afterEach(route => {
//     setTimeout(function() {
//         var direction = 'forward';
//         commit('SET_DIRECTION', {
//             direction
//         });
//     }, 50);
// });

export default router;