<template>
    <v-layout row wrap align-horiz-center align-vert-center>
        <v-flex md12 xs12>
            <v-card>
                <v-container fluid>
                    <v-layout row wrap>
                        <v-flex md4 xs12 class="pl-3">
                            <v-menu
                                lazy
                                :close-on-content-click="true"
                                v-model="datePickerMenu1"
                                transition="scale-transition"
                                offset-y
                                full-width
                                max-width="290px"
                            >
                                <v-text-field
                                    slot="activator"
                                    label="开始时间"
                                    v-model="startTime"
                                    prepend-icon="event"
                                    readonly
                                ></v-text-field>
                                <v-date-picker
                                    v-model="startTime"
                                    no-title
                                    scrollable
                                    actions
                                    :first-day-of-week="0"
                                    locale="zh-cn"
                                >
                                </v-date-picker>
                            </v-menu>
                        </v-flex>

                        <v-flex md4 xs12 class="pl-3">
                            <v-menu
                                lazy
                                :close-on-content-click="true"
                                v-model="dataPickerMenu2"
                                transition="scale-transition"
                                offset-y
                                full-width
                                max-width="290px"
                            >
                                <v-text-field
                                    slot="activator"
                                    label="结束时间"
                                    v-model="endTime"
                                    prepend-icon="event"
                                    readonly
                                ></v-text-field>
                                <v-date-picker
                                    v-model="endTime"
                                    no-title
                                    scrollable
                                    actions
                                    :first-day-of-week="0"
                                    locale="zh-cn"
                                >
                                </v-date-picker>
                            </v-menu>
                        </v-flex>

                        <v-flex md2 xs12 class="btn-box">
                            <v-btn round dark class="blue lighten-1 elevation-0" @click.native.stop="loadData">确定</v-btn>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card>
        </v-flex>

        <v-flex md12 xs12 mt-4 v-show="!this.$store.state.userInfo.single">
            <v-card>
                <v-card-text>
                    <div id="timeZoneDataLine" class="chart"></div>
                </v-card-text>
            </v-card>
        </v-flex>

        <v-flex md12 xs12 mt-4 v-show="!this.$store.state.userInfo.single">
            <v-card>
                <v-card-text>
                    <v-data-table
                        :headers="tableHeaders"
                        :items="tableItems"
                        :pagination.sync="pagination"
                        :rows-per-page-items="rowsPerPageItems"
                        :rows-per-page-text="rowsPerPageText"
                        :no-data-text="noDataText"
                        class="elevation-0 table mt-3"
                    >
                        <template slot="headerCell" scope="props">
                            <span v-tooltip:bottom="{ 'html': props.header.text }">
                                {{ props.header.text }}
                            </span>
                        </template>
                        <template slot="items" scope="props">
                            <td>{{ props.item.name }}</td>
                            <td  class="text-xs-right">{{ props.item.print }}</td>
                            <td  class="text-xs-right">{{ props.item.scan }}</td>
                            <td  class="text-xs-right">{{ props.item.rate }}</td>
                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>
        </v-flex>

        <v-flex md12 xs12 mt-4>
            <v-card>
                <v-card-title primary-title class="card-title">
                    <div>
                        <h5 class="title">
                            {{ this.$store.state.userInfo.single === true ? singleShopName : '合计'}}
                        </h5>
                    </div>
                </v-card-title>
                <v-card-text>
                    <v-layout row wrap>
                        <v-flex md4 xs12 v-for="item in totalDataItems"
                                   :key="item.title" class="total-list">
                            <v-list>
                                <v-list-tile avatar tag="div">
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{item.title}}</v-list-tile-title>
                                    </v-list-tile-content>
                                    <v-list-tile-action>
                                        <v-list-tile-action-text :class="[item.textClass]">
                                            {{ totalData[item.comment]}}
                                        </v-list-tile-action-text>
                                    </v-list-tile-action>
                                </v-list-tile>
                            </v-list>
                        </v-flex>
                    </v-layout>
                </v-card-text>

                <v-layout row justify-center pt-4 pb-4>
                    <v-btn round primary dark
                           @click.native.stop="dialog = true"
                           class="blue lighten-1 elevation-0"
                    >申请结算</v-btn>

                    <v-dialog v-model="dialog" lazy
                              absolute :width="dialogWidth"
                    >
                        <v-card>
                            <v-card-title>
                                <div class="headline">收益详细</div>
                            </v-card-title>
                            <v-card-text>
                                从<b>{{ startTime }}</b>到<b>{{ endTime }}</b>，您的门店客流总量（即打票总量）为<b>{{ totalData.print }}</b>，扫码总量为<b>{{ totalData.scan }}</b>，扫码率为<b>{{ totalData.rate }}</b>， 产生收益为<b>0</b>，提交申请并审核完成后，本月收益将会在下个月打入您之前与本公司工作人员签订的收账帐户中，申请纪录可在本站点击左侧“申请纪录”中查看，确认申请吗？
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">好的，我要申请</v-btn>
                                <v-btn class="grey--text darken-1" flat="flat" @click.native="dialog = false">算了，我再看看</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-layout>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import echarts from 'echarts/lib/echarts'
    import 'echarts/lib/chart/line'
    import 'echarts/lib/component/tooltip'
    import 'echarts/lib/component/legend'
    import 'echarts/lib/component/title'

    import theme from 'assets/json/theme.json'
    import line from 'assets/data/analysis-time-line'

    export default {
        name: 'Analysis',

        data() {
            return {
                startTime: null,
                endTime: null,

                singleShopName: null,

                datePickerMenu1: false,
                dataPickerMenu2: false,
                timeZoneDataLine: null,

                pagination: {
                    rowsPerPage: 10
                },
                rowsPerPageItems: [10],
                rowsPerPageText: '每页条数',
                noDataText: '暂无数据',
                tableHeaders: [
                    {
                        text: '店名',
                        align: 'left',
                        sortable: false,
                        value: 'name'
                    },
                    { text: '打票量', value: 'print' },
                    { text: '扫码量', value: 'scan' },
                    { text: '扫码率', value: 'rate' }
                ],
                tableItems: [],

                totalDataItems: [
                    {
                        textClass: 'red--text text--accent-1 total-data-text',
                        title: '打票总量',
                        comment: 'print'
                    },
                    {
                        textClass: 'light-blue--text text--accent-2 total-data-text',
                        title: '扫码总量',
                        comment: 'scan'
                    },
                    {
                        textClass: 'orange--text text--accent-1 total-data-text',
                        title: '扫码率',
                        comment: 'rate'
                    }
                ],
                totalData: {
                    print: 0,
                    scan: 0,
                    rate: 0
                },

                dialog: false,
                dialogWidth: 800
            }
        },

        mounted() {
            this.initChart()
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
            loadData: function() {
                var self = this,
                    chartData = {
                        shops: [],
                        printList: [],
                        scanList: [],
                        rateList: []
                    }

                if(self.isEmpty) {
                    alert('时间不能为空')
                    return
                }

                if(self.incorrectDate) {
                    alert('结束时间不能在开始时间之前')
                    return
                }

                self.timeZoneDataLine.showLoading()

                // $.ajax({
                //     url: '/api/v1/shopkeeper/index/shops',
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
                                name: '超市1',
                                print_times: 13000,
                                scan_times: 5232
                            },
                            {
                                name: '超市2',
                                print_times: 4000,
                                scan_times: 432
                            }
                        ]

                        self.singleShopName = data[0].name

                        self.timeZoneDataLine.hideLoading()
                        //clear data
                        self.tableItems = []

                        data.forEach(function(item) {
                            self.loadTableData(item)

                            chartData.shops.push(item.name)
                            chartData.printList.push(item.print_times)
                            chartData.scanList.push(item.scan_times)
                            chartData.rateList.push((item.scan_times / item.print_times).toFixed(2))

                            self.totalData.print += item.print_times
                            self.totalData.scan += item.scan_times
                        })

                        self.loadChartData(chartData)

                        self.totalData.rate = (self.totalData.scan / self.totalData.print * 100).toFixed(0) + '%'
                //     },

                //     error: function() {
                //         alert('连接失败')
                //     }
                // })
            },

            initChart: function() {
                var self = this

                echarts.registerTheme('macarons', theme.theme)

                self.timeZoneDataLine = echarts.init($('#timeZoneDataLine')[0], 'macarons')
                self.timeZoneDataLine.setOption(line())

                self.$store.state.chartList.timeZoneDataLine = self.timeZoneDataLine

                $(window).resize(function(){
                    self.timeZoneDataLine.resize()
                })
            },

            loadTableData: function(item) {
                this.tableItems.push({
                    value: false,
                    name: item.name,
                    print: item.print_times,
                    scan: item.scan_times,
                    rate: ((item.scan_times / item.print_times) * 100).toFixed(0) + '%',
                })
            },

            loadChartData: function(items) {
                this.timeZoneDataLine.setOption({
                    xAxis: {
                        data: items.shops
                    },
                    series: [
                        {
                            name: '打票量',
                            data: items.printList
                        },
                        {
                            name: '扫码量',
                            data: items.scanList
                        },
                        {
                            name: '扫码率',
                            data: items.rateList
                        },
                    ]
                })
            }
        }
    }
</script>

<style scoped lang="stylus">
    .btn-box
        text-align: center

    .btn-box button
        margin: 10px

    .chart
        height: 400px

    .total-list
        border-left: 1px solid #e0e0e0

    .total-list:first-child
        border-left: none

    .total-data-text
        font-size: 20px
</style>
