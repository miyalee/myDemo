<template>
    <v-layout row align-horiz-center align-vert-center>
        <v-flex md12 xs12>
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
                            <td>{{ props.item.ID }}</td>
                            <td  class="text-xs-right">{{ props.item.date }}</td>
                            <td  class="text-xs-right">{{ props.item.amount }}</td>
                            <td  class="text-xs-right">{{ props.item.status }}</td>
                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        name: 'Record',

        data() {
            return {
                pagination: {
                    rowsPerPage: 10
                },
                rowsPerPageItems: [10, 25],
                rowsPerPageText: '每页条数',
                noDataText: '暂无数据',
                tableHeaders: [
                    {
                        text: 'ID',
                        align: 'left',
                        sortable: false,
                        value: 'ID'
                    },
                    { text: '申请日期', value: 'date' },
                    { text: '结算金额', value: 'amount' },
                    { text: '申请状态', value: 'status' }
                ],
                tableItems: [
                    {
                        value: false,
                        ID: '131020',
                        date: '2017-07-04',
                        amount: 20304,
                        status: '处理中'
                    },
                    {
                        value: false,
                        ID: '101020',
                        date: '2017-07-07',
                        amount: 10304,
                        status: '已出账'
                    }
                ]
            }
        },

        methods: {
        }
    }
</script>

<style scoped>
</style>
