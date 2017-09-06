<template>
    <div id="record">
        <mt-header fixed title="申请记录">
            <router-link to="/home" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>

        <div class="record-items">
            <mt-cell v-for="item in recordItems"
                     :key="item.id"
                     :title="item.title + '元'"
                     :label="'申请日期: ' + item.label"
                     :value="item.value"
            >
            </mt-cell>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'record',
        data() {
            return{
                recordItems: [
                    {
                        id: '11111',
                        title: '2333.00',
                        label: '2017-07-11',
                        value: '处理中'
                    },
                    {
                        id: '11111',
                        title: '2333.00',
                        label: '2017-07-11',
                        value: '处理中'
                    },
                    {
                        id: '11111',
                        title: '243.30',
                        label: '2017-07-11',
                        value: '处理中'
                    },
                    {
                        id: '11111',
                        title: '2333.00',
                        label: '2017-07-11',
                        value: '已出账'
                    },
                    {
                        id: '11111',
                        title: '2333.00',
                        label: '2017-07-11',
                        value: '处理中'
                    },
                ]
            }
        }
    }
</script>

<style scoped>
    .record-items {
        margin-top: 40px;
    }
</style>
