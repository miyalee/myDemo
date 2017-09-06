<template>
    <div class="register">
        <header>
            <div class="home-info-top">
                <div class="home-info-nav">
                    <p>注册</p>
                </div>
            </div>
        </header>
        <main>
            <div class="content">
                <p>
                    <img src="~assets/images/register/phone.login.png">
                    <span class="box-input">
                        <input type="text" name="phone" placeholder="请输入手机号" v-model="phone"/>
                    </span>
                </p>

                <p>
                    <img src="~assets/images/register/yanzheng.png">
                    <span class="box-input">
                        <input type="text" name="captcha" placeholder="请输入图形验证码"
                               v-model="captcha" style="width: 1.8rem;" />
                        <img src="/api/v1/common/user/captcha" @click="refreshCaptcha($event)">
                    </span>
                </p>

                <p>
                    <img src="~assets/images/register/yanzheng.png">
                    <span class="box-input">
                        <input type="text" name="vcode" placeholder="请输入短信验证码"
                               v-model="vcode" style="width: 1.8rem;margin-right: .1rem;"/>
                        <input type="submit" class="vcode" :value="value"
                               :disabled="disabled" @click="sendVcode"/>
                    </span>
                </p>

                <p>
                    <img src="~assets/images/register/user.login.png">
                    <span class="box-input">
                        <input type="text" name="name" placeholder="请输入姓名(只能输入中文)"
                               v-model="name"/>
                    </span>
                </p>

                <p>
                    <img src="~assets/images/register/pwd.login.png">
                    <span class="box-input">
                        <input type="text" name="password" v-model="password" placeholder="密码(必须包含字母和数字)"/>
                    </span>
                </p>

                <div class="submit">
                    <a class="login">
                        <input type="button" value="提交" @click="register()">
                    </a>
                </div>
            </div>
        </main>
    </div>
</template>

<script type="text/babel">
    import rem from '@/utils/rem'

    export default {
        data() {
            return {
                phone: null,
                captcha: null,
                vcode: null,
                name: null,
                password: null,

                value: '获取验证码',
                time: 60,
                disabled: false
            }
        },

        mounted() {
            rem ({
                desinWidth: 640, //设计图宽度
                baseFont: 24,    //没有缩放字体大小
                maxWidth: 480    //页面显示最大宽度  默认540
            })

            $(window).on('resize', function() {
                if(document.activeElement == $('input[name="password"]')[0]
                    && $(window).innerHeight() < 400) {
                    $('.content').css('top', '-1.2rem')
                } else {
                    $('.content').css('top', '1.2rem')
                }
            })
        },

        methods: {
            refreshCaptcha($event) {
                $event.target.src = '' + Math.random()
            },

            sendVcode() {
                var self = this
                let dataToSend = {
                    phone: self.phone,
                    captcha: self.captcha
                }

                // $.ajax({
                //     url: '/api/v1/common/user/vcode',
                //     data: dataToSend,
                //     type: 'patch',
                //     success: function(data) {
                //         if (data.code == 0) {
                //             alert('发送成功')
                            self.timer()
                //         } else {
                //             alert(data.error_msg)
                //         }
                //     }
                // })
            },

            register() {
                var self = this
                let dataToSend = {
                    phone: self.phone,
                    captcha: self.captcha,
                    vcode: self.vcode,
                    password: self.password,
                    name: self.name
                }

                // $.ajax({
                //     url: '/api/v1/salesman/user/register',
                //     data: dataToSend,
                //     type: 'post',
                //     success: function(data) {
                //         if (data.code == 0) {
                //             alert('注册成功')
                            self.$router.push('/')
                //         } else {
                //             alert(data.error_msg)
                //         }
                //     }
                // })
            },

            timer() {
                var self = this

                if(self.time === 0 ) {
                    self.value = '获取验证码'
                    self.disabled = false
                    self.time = 60
                } else {
                    setTimeout(function() {
                        self.time--
                        self.value = self.time + 's重新发送'
                        self.disabled = true
                        self.timer()
                    }, 1000)
                }
            }
        }
    }
</script>

<style scoped>
    .home-info-top {
        width: 100%;
        height: auto;

        position: fixed;
        z-index: 1;
        top: 0;

        background-color: #ff4a0c;
    }
    .home-info-nav {
        width: 100%;
        height: .88rem;

        font-size: .28rem;
        line-height: .88rem;

        text-align: center;

        color: #fff;
    }
    .home-info-nav .home-info-nav-a {
        width: .15rem;
        height: .27rem;
        margin-top: -.135rem;

        position: absolute;
        top: 50%;
        left: .21rem;

        -webkit-tap-highlight-color: rgba(0,0,0,0);
    }
    .home-info-nav > p {
        margin: 0;
        padding: 0;

        display: inline-block;
    }
    .home-info-nav .home-info-nav-b {
        width: .26rem;
        height: .26rem;
        margin-top: -.13rem;

        position: absolute;
        top: 50%;
        right: .21rem;

        display: inline-block;
    }

    main {
        height: auto;
    }

    main .content {
        width: 3.45rem;
        margin-left: 1.475rem;

        position: fixed;
        top: 1.2rem;

        overflow: hidden;
    }

    main .content p {
        width: 3.45rem;
        height: .36rem;
        margin: .62rem 0;
        padding: 0;

        position: relative;
    }

    main .content p > img {
        height: .24rem;

        position: absolute;
        bottom: 0;

        float: left;
    }

    main .content p span {
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

    main .content span input.vcode {
        width: 1.22rem;
        height: .36rem;

        position: absolute;
        right: 0;

        font-size: .16rem;
        line-height: .36rem;

        text-align: center;

        color: #fff;
        border: 0;
        border-radius: .08rem;
        outline: 0;
        background: #ff4a0c;

        -webkit-tap-highlight-color: rgba(0,0,0,0);
    }

    main .content span input {
        width: 3rem;
        height: .35rem;
        margin-bottom: 0rem;

        position: absolute;
        bottom: 0rem;

        font-size: .2rem;
        line-height: .24rem;

        text-indent: .1rem;

        color: #333;
        border: none;
        border: 0;
        border-radius: 0;
        outline: none;
        background-color: #fff;

        -webkit-appearance: none;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
    }

    main .content a {
        margin-top: -.62rem;

        display: block;
        float: right;

        font-size: .18rem;

        color: #ff4a0c;

        -webkit-tap-highlight-color: rgba(0,0,0,0);
    }

    main .content .submit input:active {
        opacity: .6;
    }

    main .content .submit input {
        width: 3.45rem;
        height: .65rem;
        margin-top: .77rem;

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
        -webkit-tap-highlight-color: rgba(0,0,0,0);
    }

    .box-input > img {
        width: 1.3rem;
        height: .55rem;

        position: absolute;
        top: -1em;
        right: 0;
    }
</style>
