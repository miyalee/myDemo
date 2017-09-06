<template>
    <div id="register">
        <mt-header fixed title="注册成为店主">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>

        <div class="form">
            <div class="group">
                <mt-cell title="门店"
                         :value="'已选' + shops.length + '个'"
                         is-link
                         @click.native="popupVisible = true"
                ></mt-cell>
            </div>

            <div class="group">
                <mt-field
                    label="用户名"
                    placeholder="必须是中文"
                    v-model="name"
                ></mt-field>
                <mt-field
                    label="手机号"
                    placeholder="请输入手机号"
                    type="tel"
                    v-model="phone"
                ></mt-field>
                <mt-field
                    label=""
                    placeholder="请输入图片验证码"
                    v-model="captcha"
                >
                    <img :src="captchaSrc" height="45px"
                         width="120px" @click="refreshCaptcha">
                </mt-field>
                <mt-field
                    label=""
                    placeholder="请输入短信验证码"
                    v-model="vcode"
                >
                    <mt-button
                        class="btn round red"
                        @click.native="sendVcode"
                        :disabled="disabled"
                    >{{ text }}</mt-button>
                </mt-field>
            </div>

            <div class="group">
                <mt-field
                    label="密码"
                    placeholder="最短8位，字母开头"
                    :type="pwdVisible ? 'text' : 'password'"
                    v-model="password"
                >
                    <span @click="pwdVisible =! pwdVisible">
                        <i class="material-icons icon"
                           slot="icon"
                           v-html="pwdVisible ? '&#xE8F4;' : '&#xE8F5;'"
                        ></i>
                    </span>
                </mt-field>
            </div>
        </div>

        <mt-button
            class="btn round register"
            size="large"
            type="primary"
            @click.native="register"
        >注册</mt-button>

        <mt-popup
            v-model="popupVisible"
            position="right"
            class="popup"
            :modal="false"
        >
            <mt-search
                v-model="key"
                cancel-text="取消"
                placeholder="搜索"
                :show="true"
            >
                <mt-checklist
                    v-model="selectItems"
                    align="right"
                    :options="searchList"
                >
                </mt-checklist>

                <div class="selected">
                    <span>已选</span>
                    <mt-cell
                        class="cell"
                        v-for="(item, index) in selectItems"
                        :key="item.id"
                        :title="item.label"
                    >
                        <span @click="removeShop" :id="index">
                            <i class="material-icons">&#xE14C;</i>
                        </span>
                    </mt-cell>
                </div>

                <mt-button
                    class="btn round"
                    size="large"
                    type="primary"
                    @click.native="confirmShops"
                >确定</mt-button>
            </mt-search>
        </mt-popup>
    </div>
</template>

<script>
export default {
    name: 'register',

    data() {
        return {
            name: null,
            phone: null,
            shops: [],
            captcha: null,
            vcode: null,
            password: null,

            pwdVisible: false,
            popupVisible: false,

            key: null,
            selectItems: [],
            searchList: [],

            captchaSrc: 'api/v1/common/user/captcha',

            text: '获取验证码',
            disabled: false,
            time: 60,
        }
    },

    watch: {
        key: function(newValue) {
            var self = this

            // $.ajax({
            //     url: 'api/v1/shopkeeper/shop',
            //     type: 'get',
            //     data: {
            //         key: newValue
            //     },
            //     success: function(data) {
                    self.searchList = []

                    var data = [
                        {
                            name: '超市1',
                            id: '100003'
                        },
                        {
                            name: '超市2',
                            id: '100004'
                        }
                    ]

                    data.forEach(function(item) {
                        self.searchList.push({
                            label: item.name,
                            id: item.id
                        })
                    })
            //     },

            //     error: function() {
            //         alert('连接失败')
            //     }
            // })
        }
    },

    computed: {
        isEmpty: function() {
            return (this.shops.length <= 0 ||
                    $.trim(this.name) === '' ||
                    $.trim(this.password) === '')
        },

        nameRule: function() {
            return /[\u4e00-\u9fa5]/.test(this.name)
        },

        passwordRule: function() {
            return /^[a-zA-Z][A-Za-z0-9_^%&',;=?$\x22]{7,}/.test(this.password)
        },
    },

    methods: {
        confirmShops: function() {
            var self = this

            self.shops = []

            self.selectItems.forEach(function(item) {
                self.shops.push(item.id)
            })

            self.popupVisible = false
        },

        removeShop: function(event) {
            this.selectItems.splice(event.target.parentNode.id, 1)
        },

        refreshCaptcha: function() {
            this.captchaSrc = 'api/v1/common/user/captcha?stamp=' + Math.random()
        },

        sendVcode: function() {
            var self = this,
                dataToSend = {
                    phone: self.phone,
                    captcha: self.captcha
                }

            // $.ajax({
            //     url: 'api/v1/common/user/vcode',
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

            if(self.isEmpty) {
                alert('所有填写项不能为空')
                return
            }

            if(!self.nameRule || !self.passwordRule) {
                alert('用户名不符合要求')
                return
            }

            if(!self.passwordRule) {
                alert('密码不符合要求')
                return
            }

            // $.ajax({
            //     url: 'api/v1/shopkeeper/user/register',
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
        }
    }
}
</script>

<style scoped>
    .form {
        margin-top: 40px;
    }

    .btn.round {
        width: 95%;

        font-size: 16px;

        border-radius: 20px;
    }

    .btn.red {
        margin: 0 10px;

        color: #fff;
        border: 1px solid #ff8a80;
        background-color: #ff8a80;
        box-shadow: none;
    }

    .btn {
        margin: 15px 10px;
    }

    .group {
        margin-top: 15px;
    }

    .popup {
        width: 100%;
        height: 100%;
        background-color: #fafafa;
    }

    .selected {
        margin: 15px 0px;
    }

    .selected span {
        margin-left: 10px;
    }

    .selected .cell,
    .selected .cell i {
        color: #707cd2;
    }
</style>
