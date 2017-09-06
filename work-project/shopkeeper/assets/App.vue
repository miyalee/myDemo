<template>
    <v-app>
        <v-navigation-drawer
            persistent
            :temporary="temporary"
            :mini-variant="miniVariant"
            :clipped="clipped"
            v-model="drawer"
            dark
        >
            <v-list>
                <v-list-tile avatar tag="div">
                    <v-list-tile-avatar>
                        <v-icon class="blue lighten-1 white--text">person</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title class="white--text">
                            {{ (this.$store.state.userInfo.username + this.$store.state.userInfo.phone) || '未登录'}}
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>

            <v-list v-if="this.$store.state.userInfo.isLogin" class="pt-0" dense>
                <v-divider light></v-divider>

               <!--  <template v-if="this.$store.state.userInfo.single"> -->
                    <!-- <v-list-tile v-for="(item, i) in navItems" :key="i"
                                 :to="item.to" v-if="i !== 0">
                        <v-list-tile-action>
                            <v-icon dark v-html="item.icon"></v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title v-text="item.title"></v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile> -->
                <!-- </template>

                <template v-else> -->
                    <v-list-tile v-for="(item, i) in navItems" :key="i" :to="item.to">
                        <v-list-tile-action>
                            <v-icon dark v-html="item.icon"></v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title v-text="item.title"></v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                <!-- </template> -->
            </v-list>
        </v-navigation-drawer>

        <v-toolbar class="white" fixed>
            <!-- <v-toolbar-side-icon class="grey--text text--darken-2" @click.native.stop="clickToolbarSwitch"></v-toolbar-side-icon> -->
            <v-btn icon @click.native.stop="clickToolbarSwitch" class="grey--text text--darken-2">
                <v-icon>&#xE5D2;</v-icon>
            </v-btn>
            <v-toolbar-title class="grey--text text--darken-2" v-text="title"></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn v-if="this.$store.state.userInfo.isLogin"
                       flat class="grey--text text--darken-2"
                       @click.native="logout"
                >
                    退出登录
                </v-btn>

                <v-btn v-else flat class="grey--text text--darken-2"
                       v-for="item in toolbarItems"
                       :key="item.title" :to="item.to">
                    {{ item.title }}
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>

        <main>
            <v-container fluid>
                <v-slide-y-transition mode="out-in">
                    <router-view></router-view>
                </v-slide-y-transition>

                <v-layout row justify-center style="position: relative;">
                    <v-dialog v-model="dialog" lazy absolute>
                        <v-card>
                            <v-card-title>
                                <div class="headline">提示</div>
                            </v-card-title>
                            <v-card-text>{{ dialogText }}</v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn class="green--text darken-1" flat="flat"
                                       @click.native="dialog = false"
                                >确定</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-layout>
            </v-container>
        </main>

        <v-footer class="white grey--text text--darken-2" fixed>
            <span class="text-lg-center">&copy; 著作权归作开发者所有</span>
        </v-footer>
    </v-app>
</template>

<script>
    import Meta from 'mixins/meta'
    import { setupCSRF } from 'assets/utils/utils.js'

    export default {
        mixins: [
            Meta
        ],

        data() {
            return {
                clipped: false,
                drawer: true,
                navItems: [
                    { icon: 'home', title: '数据总览', to: '/home' },
                    { icon: 'equalizer', title: '数据查询', to: '/analysis' },
                    { icon: 'event_note', title: '结算纪录', to: '/record' },
                ],
                miniVariant: false,
                title: '数据后台管理系统',
                temporary: false,
                toolbarItems: [
                    { title: '登录', to: '/login' },
                ],

                dialog: false,
                dialogText: ''
            }
        },

        beforeMount() {
            var self = this

            window.alert = function(text) {
                self.dialogText = text
                self.dialog = true
            }

            setupCSRF()

            // this.checkLogin()

            // $.ajax({
            //     type: 'POST',
            //     url: '/api/v1/common/',
            // })
        },

        methods: {
            clickToolbarSwitch: function() {
                var self = this

                this.drawer = !this.drawer

                setTimeout(function() {
                    for(var key in self.$store.state.chartList) {
                        if(self.$store.state.chartList[key]) {
                            self.$store.state.chartList[key].resize()
                        }
                    }
                }, 300)
            },

            checkLogin: function() {
                var self = this

                //当前页刷新时判断是否掉线
                // $.ajax({
                //     type: 'get',
                //     url: '/api/v1/shopkeeper/user/userinfo',
                //     success: function(data) {
                        // if(data.code === 0) {
                            self.$store.state.userInfo.isLogin = true
                            self.$store.state.userInfo.phone = '12345678901'
                            self.$store.state.userInfo.username = '叫啥'
                            self.$store.state.userInfo.single = (data.shops.length < 2 ? true : false)
                        // } else {
                        //     self.$store.state.userInfo.isLogin = false
                        //     self.$store.state.userInfo.phone = null
                        //     self.$store.state.userInfo.username = null
                        //     self.$store.state.userInfo.single = false
                        //     // self.$router.push('/')
                        // }
                //     },

                //     error: function() {
                //         alert('连接失败')
                //     }
                // })
            },

            logout: function() {
                var self = this

                // $.ajax({
                //     type: 'POST',
                //     url: '/api/v1/common/user/logout',
                //     success: function(data) {
                //         if(data.code === 0) {
                            self.$store.state.userInfo.isLogin = false
                            self.$store.state.userInfo.username = null
                            self.$store.state.userInfo.phone = null
                            self.$store.state.userInfo.single = false
                            self.$router.push('/')
                        // }
                //     },

                //     error: function() {
                //         alert('连接失败')
                //     }
                // })
            }
        }
    }
</script>

<style lang="stylus">
    @import './stylus/main'

    .navigation-drawer
        width: 240px

    #app
        background-color: #edf1f5

    .navigation-drawer .list .router-link-exact-active > *:first-child .icon
        color: #fff

    .navigation-drawer .list .router-link-exact-active
        background-color: #42a5f5

    table tbody tr td:first-child
        white-space: nowrap;
</style>

<style scoped>
    .navigation-drawer--persistent.navigation-drawer--open:not(.navigation-drawer--is-mobile):not(.navigation-drawer--right):not(.navigation-drawer--clipped) ~ .toolbar,
    .navigation-drawer--persistent.navigation-drawer--open:not(.navigation-drawer--is-mobile):not(.navigation-drawer--right) ~ main,
    .navigation-drawer--persistent.navigation-drawer--open:not(.navigation-drawer--is-mobile):not(.navigation-drawer--right) ~ .footer:not(.footer--fixed):not(.footer--absolute) {
        padding-left: 240px
    }
</style>
