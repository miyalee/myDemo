<template>
    <v-layout row wrap align-horiz-center align-vert-center>
        <v-flex xs12 sm4 md4 v-for="item in totalDataItems" :key="item.title">
            <v-card>
                <v-list>
                    <v-list-tile avatar tag="div">
                        <v-list-tile-avatar>
                            <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-list-tile-action-text class="total-data-text">
                                {{ item.data }}
                            </v-list-tile-action-text>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>
            </v-card>
        </v-flex>

        <v-flex xs12 sm8 md8 mt-4>
            <v-card class="chart-data">
                <v-data-table
                    :headers="tableHeaders"
                    :items="tableItems"
                    :pagination.sync="pagination"
                    :rows-per-page-items="rowsPerPageItems"
                    :no-data-text="noDataText"
                    :rows-per-page-text="rowsPerPageText"
                    class="elevation-0"
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
            </v-card>
        </v-flex>
        <v-flex xs12 sm4 md4 mt-4>
            <v-card class="top-data">
                <v-card-title primary-title>
                    <div>
                        <h5 class="title mb-0">数据分析</h5>
                    </div>
                </v-card-title>
                <v-card-text>
                    <v-list v-for="item in topDataItems" :key="item.title">
                        <v-list-tile avatar tag="div">
                            <v-list-tile-action>
                                <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title v-if="item.comment[1] === 'rate'">
                                    {{ topData[item.comment[0]][item.comment[1]] + '%'}}
                                </v-list-tile-title>
                                <v-list-tile-title v-else>
                                    {{ topData[item.comment[0]][item.comment[1]] }}
                                </v-list-tile-title>
                                <v-list-tile-sub-title>{{ item.title }}</v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </v-card-text>
            </v-card>
        </v-flex>

        <v-flex xs12 sm12 md12 mt-4>
            <v-card>
                <v-card-text>
                    <div id="lineChart" class="chart"></div>
                </v-card-text>
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
    import line from 'assets/data/home-line'

    var TWEEN = require('@tweenjs/tween.js')

    export default {
        name: 'Home',

        data() {
            return {
                totalDataItems: [
                    {
                        iconClass: 'red accent-1 white--text',
                        icon: 'receipt',
                        title: '打票总量',
                        data: 0,
                        comment: 'print'
                    },
                    {
                        iconClass: 'light-blue accent-2 white--text',
                        icon: 'crop_free',
                        title: '扫码总量',
                        data: 0,
                        comment: 'scan'
                    },
                    {
                        iconClass: 'orange accent-1 white--text',
                        icon: 'content_paste',
                        title: '扫码率',
                        data: 0,
                        comment: 'rate'
                    }
                ],
                totalData: {
                    print: 0,
                    scan: 0,
                    rate: 0
                },

                topDataItems: [
                    {
                        iconClass: 'orange--text text--accent-1',
                        icon: 'store_mall_directory',
                        title: '打票最多的门店',
                        comment: ['printStore', 'name']
                    },
                    {
                        iconClass: 'light-blue--text text--accent-2',
                        icon: 'receipt',
                        title: '最多打票量',
                        comment: ['printStore', 'print_times']
                    },
                    {
                        iconClass: 'red--text text--accent-1',
                        icon: 'store_mall_directory',
                        title: '扫码最多的门店',
                        comment: ['scanStore', 'name']
                    },
                    {
                        iconClass: 'orange--text text--accent-1',
                        icon: 'crop_free',
                        title: '最多扫码量',
                        comment: ['scanStore', 'scan_times']
                    },
                    {
                        iconClass: 'light-blue--text text--accent-2',
                        icon: 'store_mall_directory',
                        title: '扫码率最大的门店',
                        comment: ['rateStore', 'name']
                    },
                    {
                        iconClass: 'red--text text--accent-1 white--text',
                        icon: 'content_paste',
                        title: '最大扫码率',
                        comment: ['rateStore', 'rate']
                    }
                ],
                topData: {
                    printStore: {
                        name: null,
                        print_times: null
                    },
                    scanStore: {
                        name: null,
                        scan_times: null
                    },
                    rateStore: {
                        name: null,
                        rate: null
                    }
                },

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

                allData: [],
                lineChart: null
            }
        },

        mounted() {
            this.initChart()
            this.getAllData()
            this.loadMonthData()
        },

        methods: {
            initChart: function() {
                var self = this

                echarts.registerTheme('macarons', theme.theme)

                this.lineChart = echarts.init($('#lineChart')[0], 'macarons')
                this.lineChart.setOption(line())

                this.$store.state.chartList.lineChart = this.lineChart

                $(window).resize(function(){
                    self.lineChart.resize()
                })
            },

            tween: function(packIndex, finalValue) {
                var self = this,
                    totalDataItem = self.totalDataItems[packIndex]

                function animate () {
                    if (TWEEN.update()) {
                        requestAnimationFrame(animate)
                    }
                }

                new TWEEN.Tween({ tweeningNumber: 0 })
                    .easing(TWEEN.Easing.Quadratic.Out)
                    .to({ tweeningNumber: finalValue }, 1000)
                    .onUpdate(function() {
                        if(totalDataItem.comment === 'rate') {
                            totalDataItem.data = this.tweeningNumber.toFixed(0) + '%'
                        } else {
                            totalDataItem.data = this.tweeningNumber.toFixed(0)
                        }
                    })
                    .onComplete(function () {
                        cancelAnimationFrame(animate)
                    })
                    .start()

                animate()
            },

            getAllData: function() {
                var self = this,
                    date = new Date(),
                    startTime = '2017-06-01',
                    today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()

                // $.ajax({
                //     url: '/api/v1/shopkeeper/index/shops',
                //     type: 'get',
                //     data: {
                //         start_time: startTime + ' 00:00:00+0800',
                //         end_time: today + ' 00:00:00+0800'
                //     },
                //     success: function(data) {
                //         if(data.error_msg) {
                //             alert(data.error_msg)
                //             return
                //         } else {
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

                            self.allData = $.extend(true, self.allData, data)

                            self.allData.forEach(function(item) {
                                self.calcTotalData(item)
                                self.calcTopData(item)

                                //table data don't need calc
                                self.loadTableData(item)
                            })

                            self.loadTotalData()
                            // self.loadTopData()
                //         }
                //     },
                //     error: function() {
                //         alert('连接失败')
                //     }
                // })
            },

            calcTotalData: function(item) {
                this.totalData.print += item.print_times
                this.totalData.scan += item.scan_times
            },

            calcTopData: function(item) {
                let rate = ((item.scan_times / item.print_times) * 100).toFixed(0)

                if(this.topData.printStore.print_times === null
                    || item.print_times > this.topData.printStore.print_times) {
                    this.topData.printStore = $.extend(true, this.topData.printStore, item)
                }

                if(this.topData.scanStore.scan_times === null
                    || item.scan_times > this.topData.scanStore.scan_times) {
                    this.topData.scanStore = $.extend(true, this.topData.scanStore, item)
                }

                if(this.topData.rateStore.rate === null
                    || rate > this.topData.rateStore.rate) {
                    this.topData.rateStore = $.extend(true, this.topData.rateStore, item)
                    this.topData.rateStore.rate = rate
                }
            },

            loadTotalData: function() {
                var self = this

                self.totalData.rate = ((self.totalData.scan / self.totalData.print) * 100).toFixed(0)

                self.totalDataItems.forEach(function(item, index) {
                    self.tween(index, self.totalData[item.comment])
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

            loadMonthData: function() {
                var self = this,
                    date = new Date(),
                    monthAgo = new Date(date.getTime() - (30 * 24 * 60 * 60 * 1000)),
                    startTime = monthAgo.getFullYear()
                                + '-' + (monthAgo.getMonth() + 1)
                                + '-' + monthAgo.getDate(),
                    today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
                    monthData = {
                        shops: [],
                        printList: [],
                        scanList: [],
                        rateList: []
                    }

                self.lineChart.showLoading()

                // $.ajax({
                //     url: '/api/v1/shopkeeper/index/shops',
                //     type: 'get',
                //     data: {
                //         start_time: startTime + ' 00:00:00+0800',
                //         end_time: today + ' 00:00:00+0800'
                //     },
                //     success: function(data) {
                        self.lineChart.hideLoading()

                //         if(data.error_msg) {
                //             alert(data.error_msg)
                //             return
                //         } else {
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

                            data.forEach(function(item) {
                                monthData.shops.push(item.name)
                                monthData.printList.push(item.print_times)
                                monthData.scanList.push(item.scan_times)
                                monthData.rateList.push((item.scan_times / item.print_times).toFixed(2))
                            })

                            self.lineChart.setOption({
                                xAxis: {
                                    data: monthData.shops
                                },
                                series: [
                                    {
                                        name: '打票量',
                                        data: monthData.printList
                                    },
                                    {
                                        name: '扫码量',
                                        data: monthData.scanList
                                    },
                                    {
                                        name: '扫码率',
                                        data: monthData.rateList
                                    },
                                ]
                            })
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

<style scoped lang="stylus">
    .chart
        height: 500px

    .total-data-text
        font-size: 20px

    .chart-data
        height: 100%!important

    .top-data
        height: 100%!important

    .top-data i
        font-size: 30px
</style>
