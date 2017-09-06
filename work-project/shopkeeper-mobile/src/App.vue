<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui'
    import { setupCSRF } from './utils'
    // import "babel-polyfill"
    // import $ from 'jquery'

    export default {
        name: 'app',

        beforeMount() {
            window.alert = function(text){
                Toast({
                    message: text,
                    duration: 1000
                })
            }

            setupCSRF()

            // this.checkLogin()

            // $.ajax({
            //     type: 'POST',
            //     url: 'api/v1/common/',
            // })
        },

        methods: {
            checkLogin: function() {
                var self = this

                //当前页刷新时判断是否掉线
                // $.ajax({
                //     type: 'get',
                //     url: 'api/v1/shopkeeper/user/userinfo',
                //     success: function(data) {
                //         if(data.code === 0) {
                            self.$store.state.userInfo.isLogin = true
                            self.$store.state.userInfo.phone = '12345678901'
                            self.$store.state.userInfo.username = '啥'
                //         } else {
                //             self.$store.state.userInfo.isLogin = false
                //             self.$store.state.userInfo.phone = null
                //             self.$store.state.userInfo.username = null

                //             if(self.$route.name !== 'Register') {
                //                 self.$router.push('/')
                //             }
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

<style>
    html,
    #app {
        height: 100%;
    }

    body {
        height: 90%;
    }

    body {
        margin: 0;

        font-family: 'Rubik', 'Source Sans Pro', Arial, sans-serif;

        color: #616161;
        background: #fafafa;
    }
</style>
