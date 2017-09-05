<template>
    <div class="mlogin">
        <div class="content clearfix">
            <img class="logo" src="~assets/images/login/logo.login.png">

            <p class="login-info clearfix">
                <img src="~assets/images/login/user.login.png">
                <span class="input-box clearfix">
                    <input type="text" name="name" v-model="username"/>
                    <label for="show"></label>
                </span>
            </p>

            <p class="login-info clearfix">
                <img src="~assets/images/login/pwd.login.png">
                <span class="input-box clearfix">
                    <input type="password" name="password" v-model="password"/>
                    <label :class="pwdClass" @click="handlePwdShow"></label>
                </span>
            </p>

            <div class="submit clearfix">
                <input type="submit" value="登录" @click="loginSubmit">
            </div>

            <router-link to="/register" class="register">还没有帐号，去注册</router-link>
        </div>
    </div>
</template>

<script type="text/babel">
    import rem from '@/utils/rem'

    export default {
        name: 'mlogin',
        title: '登录首页',
        data() {
            return {
                username: '',
                password: '',
                pwdShow: false,
                pwdClass: 'eye-close'
            }
        },
        mounted() {
            rem ({
                desinWidth: 640, //设计图宽度
                baseFont: 24,    //没有缩放字体大小
                maxWidth: 480    //页面显示最大宽度  默认540
            })

            // $.ajax({
            //     type: 'POST',
            //     url: '/api/v1/salesman/',
            //     success: function(data) {
            //         if(data.code === 0) {
            //             window.location.href='/dist'
            //         }
            //     }
            // })
        },
        destroyed() {
            $('html').css('font-size', '')
        },
        computed: {
            isEmpty() {
                return (this.username === '' || this.password === '')
            }
        },
        watch: {
            pwdShow: function(val) {
                this.pwdClass = val ? 'eye-open' : 'eye-close'
                $('input[name="password"]').attr('type', val ? 'text' : 'password')
            }
        },
        methods: {
            handlePwdShow() {
                this.pwdShow = !this.pwdShow
            },

            loginRequst(req_data) {
                // $.ajax({
                //     type: 'POST',
                //     url: '/api/v1/common/user/login',
                //     dataType: 'json',
                //     data: req_data,

                //     success: function(data) {
                //         if(data.code === 4) {
                //             alert('用户名或密码错误，请重新输入')
                //         } else if(data.code === 0) {
                            window.location.href='/dist'
                //         } else {
                //             alert('登录失败')
                //         }
                //     },

                //     error: function() {
                //         alert('登录失败')
                //     }
                // })
            },

            loginSubmit() {
                if(this.isEmpty) {
                    alert('用户名或密码不能为空')
                } else {
                    this.loginRequst({
                        'username': this.username,
                        'password': this.password
                    })
                }
            }
        }
    }
</script>

<style scoped>
    img {
        display: block;
    }

    input:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 1000px #fff inset;
    }

    .mlogin {
        display: flex;
        flex-direction: column;

        font-family: 'PingFang SC';
    }

    .clearfix:after {
        display: block;
        clear: both;

        content: '';
    }

    .content {
        width: 3.45rem;
        margin-top: .88rem;
        margin-left: 1.475rem;

        overflow: hidden;
    }

    .logo {
        width: 2.44rem;
        height: 1.31rem;
        margin: auto;
        margin-top: .69rem;
    }

    .login-info {
        width: 3.45rem;
        height: .36rem;
        margin: 0;
        margin-top: .41rem;
        padding: 0;

        position: relative;
    }

    .login-info img {
        height: .24rem;

        position: absolute;
        bottom: 0;

        float: left;
    }

    .login-info span {
        box-sizing: border-box;
        width: 3.1rem;
        height: .36rem;

        position: relative;
        left: .34rem;

        float: left;

        font-size: .24rem;
        line-height: .36rem;

        color: #333;
        border-bottom: 1px solid #f2f2f2;
        background: #fff;
    }

    .input-box label {
        width: .48rem;
        height: .36rem;

        float: right;
    }

    .input-box label.eye-close {
        background: url('~assets/images/login/eye.close.png') no-repeat center;
        background-size: 70%;
    }

    .input-box label.eye-open {
        background: url('~assets/images/login/eye.open.png') no-repeat center;
        background-size: 70%;
    }

    .input-box input {
        width: 2.42rem;
        height: .3rem;
        padding: 0;
        margin-bottom: 0;

        position: absolute;
        bottom: .01px;

        font-size: .24rem;
        line-height: .3rem;

        color: #333;
        border: none;
        border: 0;
        border-radius: 0;
        outline: none;
        background-color: #fff;

        -webkit-appearance: none;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }

    .submit input:active {
        opacity: .6;
    }

    .forget {
        margin-top: .14rem;

        display: block;
        float: right;

        font-size: .18rem;

        color: #999;

        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }

    .submit input {
        width: 3.45rem;
        height: .65rem;
        margin-top: .59rem;

        font-size: .24rem;
        line-height: .65rem;

        text-align: center;

        color: #fff;
        border: 0;
        border-radius: 0;
        border-radius: .08rem;
        outline: 0;
        background: #ff4a0c;

        -webkit-appearance: none;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }

    .register {
        width: 3.45rem;
        margin-top: .35rem;

        display: block;

        font-size: .22rem;

        text-align: center;

        color: #ff4a0c;

        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }

    .experience-enter {
        width: 2rem;
        margin: 1.2rem auto;

        display: block;

        line-height: .35rem;

        text-align: center;
        vertical-align: middle;

        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }

    .experience-enter-text {
        width: auto;
        height: .35rem;

        display: inline-block;

        font-size: .22rem;
        line-height: .35rem;

        color: #999;
    }

    .register {
        width: 3.45rem;
        margin-top: .35rem;

        display: block;

        font-size: .22rem;

        text-align: center;
    }
</style>
