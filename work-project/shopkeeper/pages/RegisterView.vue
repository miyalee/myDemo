<template>
    <v-layout row>
        <v-flex md8 offset-md2 xs12>
            <v-card class="white">
                <v-container fluid>
                    <v-layout row wrap>
                        <v-flex md12 xs12>
                            <v-select
                                :items="shopList"
                                v-model="shops"
                                label="门店（输入关键字搜索）"
                                autocomplete
                                chips
                                multiple
                                item-text="name"
                                item-value="id"
                                required
                            ></v-select>
                        </v-flex>
                    </v-layout>

                    <v-layout row>
                        <v-flex md12 xs12>
                            <v-text-field
                                name="name"
                                label="姓名"
                                hint="必须是中文"
                                v-model="name"
                                :rules="[nameRule() || '含非中文']"
                                required
                            ></v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-layout row>
                        <v-flex md12 xs12>
                            <v-text-field
                                name="phone"
                                label="手机号"
                                hint="11位手机号"
                                min="11"
                                max="11"
                                v-model="phone"
                                counter
                                required
                            ></v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-layout row>
                        <v-flex md9 xs6>
                            <v-text-field
                                name="captcha"
                                label="图片验证码"
                                v-model="captcha"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex md3 xs6>
                            <img :src="captchaSrc" height="50%" @click="refreshCaptcha">
                        </v-flex>
                    </v-layout>

                    <v-layout row>
                        <v-flex md9 xs6>
                            <v-text-field
                                name="vcode"
                                label="短信验证码"
                                v-model="vcode"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex md3 xs6>
                            <v-btn round class="red accent-1 white--text elevation-0"
                                @click.native="sendVcode"
                                :disabled="disabled"
                            >{{ text }}</v-btn>
                        </v-flex>
                    </v-layout>

                    <v-layout row>
                        <v-flex md12 xs12>
                            <v-text-field
                                name="password"
                                label="密码"
                                hint="最短8位，字母开头"
                                v-model="password"
                                min="8"
                                :append-icon="visible ? 'visibility_off' : 'visibility'"
                                :append-icon-cb="togglePwdDisplay"
                                :type="visible ? 'text' : 'password'"
                                counter
                                required
                            ></v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-layout row>
                        <v-btn round dark class="blue lighten-1 elevation-0"
                               style="margin: 0 auto;"
                               @click.native="register"
                        >提交</v-btn>
                    </v-layout>
                </v-container>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        name: 'Register',

        data() {
            return {
                visible: false,
                password: null,
                name: null,
                phone: null,
                shops: [],
                captcha: null,
                vcode: null,

                shopListTmp: [],
                shopList: [],
                captchaSrc: '/api/v1/common/user/captcha',
                text: '获取验证码',
                disabled: false,
                time: 60
            }
        },

        watch: {
            shopListTmp: function(value) {
                var self = this
                let idList = {}

                self.shopList = []

                value.forEach(function(item) {
                    if(idList[item.id] !== true) {
                        idList[item.id] = true
                        self.shopList.push(item)
                    }
                })
            }
        },

        mounted() {
            var self = this

            $('.input-group--select__autocomplete').on('keyup', function(){
                var key = $(this).val()

                // $.ajax({
                //     url: '/api/v1/shopkeeper/shop',
                //     type: 'get',
                //     data: {
                //         key: key
                //     },
                //     success: function(data) {
                        var data = [
                            {
                                name: '超市',
                                id: '121221'
                            },
                            {
                                name: '超市2',
                                id: '121224'
                            }
                        ]

                        data.forEach(function(item) {
                            self.shopListTmp.push(item)
                        })
                //     },

                //     error: function() {
                //         alert('连接失败')
                //     }
                // })
            })
        },

        methods: {
            togglePwdDisplay: function() {
                this.visible = !this.visible
            },

            nameRule: function() {
                return this.name ? /[\u4e00-\u9fa5]/.test(this.name) : true
            },

            refreshCaptcha: function() {
                this.captchaSrc = '/api/v1/common/user/captcha?stamp=' + Math.random()
            },

            sendVcode: function() {
                var self = this,
                    dataToSend = {
                        phone: self.phone,
                        captcha: self.captcha
                    }

                // $.ajax({
                //     url: '/api/v1/common/user/vcode',
                //     data: dataToSend,
                //     type: 'patch',
                //     success: function(data) {
                //         if (data.code == 0) {
                            self.timer()
                //         } else {
                //             alert(data.error_msg)
                //         }
                //     },
                //     error: function() {
                //         alert('连接失败')
                //     }
                // })
            },

            timer: function() {
                var self = this

                if(self.time === 0 ) {
                    self.text = '获取验证码'
                    self.disabled = false
                    self.time = 60
                } else {
                    setTimeout(function() {
                        self.time--
                        self.text = self.time + 's重新发送'
                        self.disabled = true
                        self.timer()
                    }, 1000)
                }
            },

            register: function() {
                var self = this,

                    dataToSend = {
                        shops: self.shops,
                        phone: self.phone,
                        captcha: self.captcha,
                        vcode: self.vcode,
                        password: self.password,
                        name: self.name
                    }

                // $.ajax({
                //     url: '/api/v1/shopkeeper/user/register',
                //     data: dataToSend,
                //     type: 'post',
                //     success: function(data) {
                //         if (data.code == 0) {
                            alert('注册成功')
                            self.$router.push('/login')
                //         } else {
                //             alert(data.error_msg)
                //         }
                //     },

                //     error: function() {
                //         alert('连接失败')
                //     }
                // })
            },
        }
    }
</script>
