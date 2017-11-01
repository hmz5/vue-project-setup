<template>
    <div id="app">
        app
        <transition name="fade-in">
            <router-view class="g-main"></router-view>
        </transition>
    </div>
</template>
<script>
    export default {
        name: 'app',
        data() {
            return {

            };
        },
        mounted() {

        }
    };
</script>
<style lang="scss" scoped>
    #app {
    	height: 100%;
    	overflow: hidden;
    	background-color: #dddddd;
    	.g-main {
    		position: absolute;
    		top: 0;
    		left: 0;
    		right: 0;
    		bottom: 0;
    		overflow: hidden;
    	}
    }
</style>