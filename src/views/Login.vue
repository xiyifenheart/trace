<template>
    <div id="login">
        <header class="login-header">
            <h1>杭州衣科鹰眼监控系统</h1>
        </header>
        <div id="panel">
            <div class="login-logo-box">
                <img src="../../static/images/login-logo.png" alt="../../static/images/login-logo.png">
            </div>
            <p class="login-name">
                鹰眼控制台登陆
            </p>
            <div class="form">
                <div class="form-list">
                    <input type="text" name="username" placeholder="请输入账号">
                    <span><img src="../../static/images/zh.png" alt="../../static/images/zh.png"></span>
                </div>
                <div class="form-list">
                    <input type="password" name="password" placeholder="请输入密码">
                    <span><img src="../../static/images/mm.png" alt="../../static/images/mm.png"></span>
                </div>
                <div class="lose-psd">
                    <a href="javascript:;">忘记密码</a>
                </div>
                <button class="login-btn" @click="login" >登陆</button>
            </div>
        </div>
        <footer class="login-footer">
            <address>杭州衣科信息技术有限公司版权所有</address>
        </footer>
    </div>
</template>
<script>
    import router from '../router.js'
    export default {
        name: 'login',
        data () {
            return{
                username: 'zhang'
            }
        },
        methods: {
            login () {
                router.push('/home/callchaintrace');
            }
        }
    }
</script>
<style src="../assets/css/login.css" scoped></style>