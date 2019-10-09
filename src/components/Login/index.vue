<template>
    <div class="login_body">
        <div class="admin">
            <input class="login_text" type="text" placeHolder="账户名/手机号/Email">
        </div>
        <div class="passWord">
            <input class="login_text" type="password" placeHolder="请输入您的密码">
        </div>
        <div class="login_btn">
            <input type="submit" value="登录">
        </div>
        <div class="login_link">
            <a href="#">立即注册</a>
            <a href="#">找回密码</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login"
    }
</script>

<style scoped>
    #content .login_body {
        margin-top: 10%;
        width: 100%;
    }

    .login_body .login_text {
        margin-top: 5%;
        width: 80%;
        margin-left: 10%;
        height: 40px;
        border: 1px #ccc solid;
        border-radius: 5px;
        margin-bottom: 5px;
        outline: none;
        text-indent: 10px;
    }

    .login_body .login_btn {
        height: 50px;
        /*margin: 10px;*/
        margin-top: 8%;
        margin-bottom: 8%;
    }

    .login_body .login_btn input {
        width: 80%;
        height: 100%;
        margin-left: 10%;
        background:linear-gradient(to right,#e54847,#f40);
        border-radius: 3px;
        border: none;
        display: block;
        color: white;
        font-size: 20px;
    }

    .login_body .login_link {
        display: flex;
        justify-content: space-between;
        width: 80%;
        margin: 0 auto;
    }

    .login_body .login_link a {
        text-decoration: none;
        margin: 0 5px;
        font-size: 12px;
        color: #e54847;
    }
</style>