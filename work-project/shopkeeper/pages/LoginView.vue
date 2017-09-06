<template>
    <v-layout row align-horiz-center align-vert-center>
        <v-flex md8 offset-md2 xs12>
            <v-card class="white">
                <v-container fluid>
                    <v-layout row>
                        <v-flex md12 xs12>
                            <v-text-field
                                name="username"
                                label="用户名"
                                hint="注册时填写的手机号"
                                v-model="username"
                                required
                            ></v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-layout row>
                        <v-flex md12 xs12>
                            <v-text-field
                                name="password"
                                label="密码"
                                hint="注册时填写的密码"
                                v-model="password"
                                :append-icon="visible ? 'visibility' : 'visibility_off'"
                                :append-icon-cb="togglePwdDisplay"
                                :type="visible ? 'text' : 'password'"
                                required
                            ></v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-layout row>
                        <v-btn round dark class="blue lighten-1 elevation-0"
                               style="margin: 0 auto;" @click.native.stop="loginSubmit"
                        >提交</v-btn>
                    </v-layout>

                    <v-layout row>
                        <router-link to="/register">没有账号？立即注册</router-link>
                    </v-layout>
                </v-container>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        name: 'Login',

        data() {
            return {
                username: '',
                password: '',

                visible: false
            }
        },

        mounted() {
            // this.getUserInfo()
        },

        computed: {
            isEmpty() {
                return (this.username === '' || this.password === '')
            }
        },

        methods: {
            getUserInfo: function() {
                var self = this

                //初次进入时判断是否已登录
                // $.ajax({
                //     type: 'get',
                //     url: '/api/v1/shopkeeper/user/userinfo',
                //     success: function(data) {
                //         if(data.code === 0) {
                            self.$store.state.userInfo.isLogin = true
                            self.$store.state.userInfo.phone = 12345678901
                            self.$store.state.userInfo.username = '叫啥'

                //             if(data.shops.length < 2) {
                //                 self.$store.state.userInfo.single = true
                //                 self.$router.push('/analysis')
                //             } else {
                                self.$store.state.userInfo.single = false
                                self.$router.push('/home')
                //             }
                //         }
                //     }
                // })
            },

            togglePwdDisplay: function() {
                this.visible = !this.visible
            },

            loginRequst(req_data) {
                var self = this

                // $.ajax({
                //     type: 'POST',
                //     url: '/api/v1/common/user/login',
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
