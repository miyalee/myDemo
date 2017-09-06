<template>
    <div id="login">
        <div class="title">
            <i class="material-icons icon" slot="icon">&#xE7FD;</i>
            <h3>数据后台管理系统</h3>
        </div>

        <div class="form">
            <mt-field
                class="input-group"
                label="用户名"
                placeholder="请输入用户名"
                v-model="username"
            ></mt-field>
            <mt-field
                class="input-group"
                label="密码"
                placeholder="请输入密码"
                :type="visible ? 'text' : 'password'"
                v-model="password"
            >
                <span @click="visible=!visible">
                    <i class="material-icons icon"
                       slot="icon"
                       v-html="visible ? '&#xE8F4;' : '&#xE8F5;'"
                    ></i>
                </span>
            </mt-field>
        </div>

        <mt-button class="btn round" size="large" type="primary" @click.native="loginSubmit">登录</mt-button>
        <router-link class="register-link" to="/register">
            没有帐号？立即注册
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'login',

    data() {
        return {
            username: null,
            password: null,

            visible: false
        }
    },

    mounted() {
        // this.getUserInfo()
    },

    computed: {
        isEmpty() {
            return ($.trim(this.username) === '' || $.trim(this.password) === '')
        }
    },

    methods: {
        getUserInfo: function() {
            var self = this

            //初次进入时判断是否已登录
            // $.ajax({
            //     type: 'get',
            //     url: 'api/v1/shopkeeper/user/userinfo',
            //     success: function(data) {
            //         if(data.code === 0) {
                        self.$store.state.userInfo.isLogin = true
                        self.$store.state.userInfo.phone = '12345678901'
                        self.$store.state.userInfo.username = '叫啥'
                        self.$router.push('/home')
            //         }
            //     }
            // })
        },

        loginRequst(req_data) {
            var self = this

            // $.ajax({
            //     type: 'POST',
            //     url: 'api/v1/common/user/login',
            //     dataType: 'json',
            //     data: req_data,
            //     success: function(data) {
            //         if(data.code === 4) {
            //             alert('用户名或密码错误，请重新输入')
            //         } else if(data.code === 0) {
                        self.getUserInfo()
            //         } else {
            //             alert('登录失败')
            //         }
            //     },
            //     error: function() {
            //         alert('连接失败')
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
    #login {
        height: 110%;

        background-color: #fff;
    }

    .title {
        padding-top: 60px;

        text-align: center;
    }

    .title .icon {
        padding: 10px;

        font-size: 48px;

        color: #fff;
        border-radius: 50%;
        background-color: #42a5f5;
    }

    .title h3 {
        font-weight: normal;
    }

    .form {
        margin-top: 50px;
    }

    .form i {
        color: rgba(0,0,0,.54);
    }

    .btn.round {
        width: 95%;
        margin: 20px 10px;

        font-size: 16px;

        border-radius: 20px;
    }

    .register-link {
        display: block;

        text-align: center;
        text-decoration: none;

        color: #42a5f5;
    }
</style>

<style>
    .input-group .mint-cell-wrapper {
        background-image: -webkit-linear-gradient(bottom, #d9d9d9, #d9d9d9 50%, transparent 50%);
        background-image: linear-gradient(0deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
        background-position: bottom;
    }
</style>
