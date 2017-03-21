<template>
    <div id="home">
        <header class="home-header">
            <h2>欢迎登录鹰眼监控台！</h2>
        </header>
        <div class="home-main">
            <div class="home-main-left">
                <span class="shrinkBtn iconfont" @click="shrinkBtnClick">&#xe630;</span>
                <div class="slh-logo">
                    <img src="../../static/images/slh.png" alt="../../static/images/slh.png">
                </div>
                <p>商陆花</p>
                <ul>
                    <router-link tag="li" to="callchaintrace">调用链跟踪</router-link>
                    <router-link tag="li" to="pathanalysed">调用路径分析</router-link>
                    <router-link tag="li" to="directionanalysed">去向分析</router-link>
                    <router-link tag="li" to="sourceanalysed">来源分析</router-link>
                    <router-link tag="li" to="logview">过程日志查看</router-link>
                </ul>
                <div class="home-setting">
                    <img src="../../static/images/sz.png" alt="../../static/images/sz.png">
                </div>
            </div>
            <div class="home-main-right">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import CallChainTree from '../components/callChainTrace/CallChainTrace.vue'
    export default {
        name: 'home',
        data() {
            return {
                shrinkFlag: false
            };
        },
        methods: {
            shrinkBtnClick() {
                if (this.shrinkFlag) {
                    $('.home-main-left').removeClass('leftShrinkStyle');
                    $('.home-main-right').removeClass('rightShrinkStyle');
                    $('.shrinkBtn').removeClass('shrinkBtnRotate');
                    this.shrinkFlag = false;
                }else{
                    $('.home-main-left').addClass('leftShrinkStyle');
                    $('.home-main-right').addClass('rightShrinkStyle');
                    $('.shrinkBtn').addClass('shrinkBtnRotate');
                    this.shrinkFlag = true;
                }
            }
        },
        components: {
            CallChainTree
        }
    };
</script>
<style src="../assets/css/home.css"></style>