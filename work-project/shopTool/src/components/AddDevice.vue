<template>
    <div class="ui raised segment" id="device-selector">
        <div class="ui modal" id="device-modal">
            <div class="content">
                <p class="modal-cotent">删除这个设备？</p>
            </div>
            <div class="actions">
                <div class="ui cancel red button">
                  取消
                </div>
                <div class="ui green button" @click="deleteDevice">
                  确定
                </div>
            </div>
        </div>
        <div class=" ui blue ribbon label">设备</div>
        <div class="content">
            <div class="ui dividing small header">已经添加设备</div>
            <table class="ui celled table unstackable">
                <thead>
                    <tr>
                        <th>编号</th>
                        <th>标识</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(d, index) in this.$store.state.deviceLst">
                        <tr class="device-info" v-bind:idx="index">
                            <td>{{ d.uid }}</td>
                            <td>{{ d.end_symbol }}</td>
                            <td>
                                {{ d.status === -1 ? '异常' : '正常' }}</br>
                                <a @click="updateStatus">切换</a>
                            </td>
                            <td>
                                <a @click="clickDeviceItem">修改</a></br>
                                <a @click="deleteModalShow">删除</a>
                            </td>
                        </tr>
                        <tr class="printer-switch" v-bind:idx="index">
                            <td class="title">打印设备ID</td>
                            <td colspan="3">
                                <button class="ui primary button" @click="openDevice">开启</button>
                                <button class="ui primary button" @click="stopDevice">关停</button>
                            </td>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>

            <div class="ui dividing small header">{{ title }}</div>
            <div class="ui small form">
                <div class="inline field">
                    <label>设备编号</label>
                    <input type="text" v-model="device.ref.uid"></input>
                </div>

                <div class="inline field">
                    <label>打印标识</label>
                    <input type="text" v-model="device.ref.endSymbol"></input>
                </div>

                <div class="ui primary button field" @click="save" v-if="isUpdate">保存</div>
                <div class="ui primary button field" @click="add" v-else>添加</div>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
    export default {
        name: 'addDevice',
        data() {
            return {
                device: this.$store.state.device,
                // deviceLst: [],
                shop: this.$store.state.shop,
                title: '添加设备',
                isUpdate: false,
                deleteId: ''
                // is_printer: true
            }
        },
        computed: {
            isEmpty() {
                return ($.trim(this.device.ref.uid) === '' ||
                        $.trim(this.device.ref.endSymbol) === '')
            }
        },
        methods: {
            loadDevices: function() {
                var self = this
                if (this.shop.ref.id === null) {
                    return
                }
                // $.getJSON({
                //     url: '/api/v1/salesman/shop/'+ self.shop.ref.id,
                // }).done(function(data) {
                    // self.deviceLst = data.data.printers
                    self.$store.state.deviceLst =  [
                        {
                            uid: '1234',
                            device_id: '000100',
                            shop: 'shop',
                            endSymbol: 'null',
                        },
                        {
                            uid: '12345',
                            device_id: '000103',
                            shop: 'shop',
                            endSymbol: 'null',
                        }
                    ]
                // }).fail(function(){
                //     alert('Fail to load devices')
                // })
            },

            add: function() {
                var self = this

                if(this.$store.state.shop.ref.id === null) {
                    alert('请先选择或者保存店铺信息')
                    return
                }

                self.device.ref.shop = this.$store.state.shop.ref.id

                if(self.isEmpty) {
                    alert('设备编号／打印标识不能为空')
                } else {
                    // $.ajax({
                    //     url: '/api/v1/salesman/printer',
                    //     method: 'put',
                    //     contentType: 'application/x-www-form-urlencoded',
                    //     data: self.device.ref
                    // }).done(function(data) {
                    //     if (data.code !== 0) {
                    //         alert('添加失败' + data.error_msg + '\n')
                    //         self.device.ref.shop = null
                    //         return
                    //     }
                        // make a deep copy
                        // self.deviceLst.push(data)

                        // self.device.ref.device_id = data.id
                        // self.device.ref.uid = data.uid
                        self.device.ref.endSymbol = 'add'

                        // self.is_printer = true

                        self.loadDevices()
                        self.addNext()
                    // }).fail(function(data) {
                    //     console.log(data)
                    //     alert('失败')
                    // })
                }
            },

            clickDeviceItem: function(event) {
                var infoList = this.$store.state.deviceLst[$(event.target).parents('.device-info').attr('idx')]

                this.title = '修改设备'
                this.isUpdate = true

                this.device.ref.device_id = infoList.id
                this.device.ref.uid = infoList.uid
                this.device.ref.endSymbol = infoList.end_symbol
            },

            deleteModalShow: function(event) {
                var infoList = this.$store.state.deviceLst[$(event.target).parents('.device-info').attr('idx')]

                this.deleteId = infoList.id
                $('#device-modal').modal('show')
            },

            update: function(deviceId, method, data) {
                var self = this

                // $.ajax({
                //     url: '/api/v1/salesman/printer/' + deviceId,
                //     method: method,
                //     contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                //     data: data
                // }).done(function(data) {
                //     if (data.code !== 0) {
                //         alert('失败' + data.error_msg + '\n')
                //         return
                //     }

                    self.loadDevices()
                    alert('成功')
                // }).fail(function() {
                //     alert('失败')
                // })
            },

            updateStatus: function(event) {
                var infoList = this.$store.state.deviceLst[$(event.target).parents('.device-info').attr('idx')],
                    data = {
                        status: infoList.status === 0 ? -1 : 0
                    }

                this.update(infoList.id, 'post', data)
            },

            deleteDevice: function() {
                var data = {
                    status: -2
                }

                this.update(this.deleteId, 'post', data)
                $('#device-modal').modal('hide')
            },

            openDevice: function() {
                var infoList = this.$store.state.deviceLst[$(event.target).parents('.printer-switch').attr('idx')],
                    data = {
                        open: 1
                    }

                this.update(infoList.id, 'patch', data)
            },

            stopDevice: function() {
                var infoList = this.$store.state.deviceLst[$(event.target).parents('.printer-switch').attr('idx')],
                    data = {
                        open: 0
                    }

                this.update(infoList.id, 'patch', data)
            },

            save: function() {
                var self = this

                if(this.$store.state.shop.ref.id === null) {
                    alert('请先选择或者保存店铺信息')
                    return
                }

                if(self.isEmpty) {
                    alert('设备编号／打印标识不能为空')
                } else {
                    // $.ajax({
                    //     url: '/api/v1/salesman/printer/' + self.device.ref.device_id,
                    //     method: 'post',
                    //     contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                    //     data: {
                    //         'end_symbol': self.device.ref.endSymbol,
                    //         'uid': self.device.ref.uid
                    //     }
                    // }).done(function(data) {
                    //     if (data.code !== 0) {
                    //         alert('失败' + data.error_msg + '\n')
                    //         return
                    //     }
                        // self.device.ref.device_id = data.id
                        // self.device.ref.uid = data.uid
                        self.device.ref.endSymbol = 'data.end_symbol'

                        // self.is_printer = true
                        self.addNext()
                        self.loadDevices()
                        alert('成功')
                    // }).fail(function() {
                    //     alert('失败')
                    // })
                }
            },

            addNext: function() {
                this.title = '添加设备'
                this.isUpdate = false

                this.device.ref.uid = null
                // this.is_printer = true
            }
        }
    }
</script>

<style scoped>
    .modal-cotent {
        margin: 1em;

        font-size: 1.2rem;

        text-align: center;
    }

    .ui.table {
        font-size: .9em;
    }

    .table .ui.button {
        padding: .5em .8em;

        font-size: .8rem;
    }

    .table .device-info td {
        border-top: 2px solid rgba(34,36,38,.15);;
    }

    .table .printer-switch .title {
        border-top: none;
    }
</style>
