<template>
    <div class="home">
        <mt-header fixed :title="shopName ||'店名'">
            <mt-button slot="right" @click.native="logout">退出</mt-button>
        </mt-header>

        <div class="form">
            <mt-cell title="开始日期" :value="startTime || '请选择'"
                     is-link @click.native="open('startTimePicker')"
            >
            </mt-cell>
            <mt-cell title="结束日期" :value="endTime || '请选择'"
                     is-link @click.native="open('endTimePicker')"
            >
            </mt-cell>

            <mt-button class="btn round" type="primary"
                       @click.native="getData" size="large" plain
            >查看收益</mt-button>
        </div>

        <mt-datetime-picker
            ref="startTimePicker"
            type="date"
            :startDate="startDate"
            :endDate="endDate"
            year-format="{value} 年"
            month-format="{value} 月"
            date-format="{value} 日"
            @confirm="selectStartTime">
        </mt-datetime-picker>

        <mt-datetime-picker
            ref="endTimePicker"
            type="date"
            :startDate="startDate"
            :endDate="endDate"
            year-format="{value} 年"
            month-format="{value} 月"
            date-format="{value} 日"
            @confirm="selectEndTime">
        </mt-datetime-picker>

        <div class="data-group">
            <mt-cell v-for="item in dataItems"
                     :key="item.title"
                     :title="item.title"
                     :label="item.label"
                     :value="data[item.value]"
            >
                <i class="material-icons" slot="icon"
                   :style="item.style" v-html="item.icon"
                ></i>
            </mt-cell>

            <mt-button class="btn round red" type="primary"
                       @click.native="apply" size="large" plain
            >申请结算</mt-button>

            <router-link to="/record" style="text-decoration: none">
                <mt-button class="btn round yellow"
                           type="primary"
                           size="large" plain
                >查看申请记录</mt-button>
            </router-link>
        </div>
    </div>
</template>

<script>
    import { MessageBox } from 'mint-ui'

    export default {
        name: 'home',
        data () {
            return {
                shopName: null,
                startTime: null,
                endTime: null,

                startDate: new Date(2017, 5, 1),
                endDate: new Date(),

                dataItems: [
                    {
                        title: '打票总量',
                        label: '单位：次',
                        value: 'print',
                        style: 'background-color: #707cd2; color: #fff',
                        icon: '&#xE8B0;'
                    },
                    {
                        title: '扫码总量',
                        label: '单位：次',
                        value: 'scan',
                        style: 'background-color: #40c4ff; color: #fff',
                        icon: '&#xE3C2;'
                    },
                    {
                        title: '扫码率',
                        label: '单位：％',
                        value: 'rate',
                        style: 'background-color: #ffd180; color: #fff',
                        icon: '&#xE14F;'
                    },
                    {
                        title: '可得收益',
                        label: '单位：元',
                        value: 'amount',
                        style: 'background-color: #ff8a80; color: #fff',
                        icon: '&#xE227;'
                    },
                ],
                data: {
                    print: 0,
                    scan: 0,
                    rate: 0,
                    amount: 0
                }
            }
        },

        computed: {
            isEmpty() {
                return (this.startTime === null || this.endTime === null)
            },

            incorrectDate() {
                return new Date(this.startTime) > new Date(this.endTime)
            }
        },
        methods: {
            open: function(picker) {
                this.$refs[picker].open()
            },

            selectStartTime: function(value) {
                this.startTime = value.getFullYear() + '-' +
                                 (value.getMonth() + 1) + '-' +
                                 value.getDate()
            },

            selectEndTime: function(value) {
                this.endTime = value.getFullYear() + '-' +
                               (value.getMonth() + 1) + '-' +
                               value.getDate()
            },

            getData: function() {
                var self = this

                if(self.isEmpty) {
                    alert('时间不能为空')
                    return
                }

                if(self.incorrectDate) {
                    alert('结束时间不能在开始时间之前')
                    return
                }

                // $.ajax({
                //     url: 'api/v1/shopkeeper/index/shops',
                //     type: 'get',
                //     data: {
                //         start_time: self.startTime + ' 00:00:00+0800',
                //         end_time: self.endTime + ' 00:00:00+0800'
                //     },
                //     success: function(data) {
                //         if(data.error_msg) {
                //             alert(data.error_msg)
                //             return
                //         }
                        var data = [
                            {
                                print_times: 100,
                                scan_times: 40
                            },
                            {
                                print_times: 130,
                                scan_times: 60
                            }
                        ]

                        data.forEach(function(item) {
                            self.data.print += item.print_times
                            self.data.scan += item.scan_times
                        })

                        self.data.rate = (self.data.scan / self.data.print * 100).toFixed(0)
                //     },

                //     error: function() {
                //         alert('连接失败')
                //     }
                // })
            },

            apply: function() {
                MessageBox.confirm('本月申请的收益经审核后在下月发出，确认申请？').then(() => {
                    alert('提交成功')
                })
            },

            logout: function() {
                var self = this

                MessageBox.confirm('确认退出登录？').then(() => {
                    // $.ajax({
                    //     type: 'POST',
                    //     url: 'api/v1/common/user/logout',
                    //     success: function(data) {
                    //         if(data.code === 0) {
                                self.$router.push('/')
                    //         }
                    //     },

                    //     error: function() {
                    //         alert('连接失败')
                    //     }
                    // })
                })
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
        margin: 10px;

        font-size: 16px;

        border-radius: 20px;
        background-color: #fff;
    }

    .btn.yellow {
        color: #616161;
        border: 1px solid #fff;
        background-color: #ffd180;
    }

    .btn.red {
        color: #ff8a80;
        border: 1px solid #ff8a80;
    }

    .material-icons {
        margin-top: 5px;
        padding: 5px;

        vertical-align: middle;

        border-radius: 50%;
    }
</style>

<style>
    .data-group .mint-cell {
        padding-bottom: 5px;
    }
</style>
