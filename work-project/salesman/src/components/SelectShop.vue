<template>
    <div class="ui bottom tab segment active" id="select-shop-tab" data-tab="select-shop">
        <div class="ui small form">
            <div class="ui field alwaysenabled" id="shop-name-search">
                <label>店名</label>
                <input v-model="shop.ref.name" type="text" placeholder="店名">
            </div>

            <div class="ui popup fluid">
                <div class="ui tiny dividing header">已经添加店铺搜索结果</div>
                <div class="ui divided items">
                    <div class="item content" @click="searchItemSelected" v-for="(s, index) in shopLst" v-bind:idx="index">
                        {{ s.name }}, {{s.address }}
                    </div>
                </div>
            </div>

            <div class="ui field">
                <input v-model="shop.ref.address" type="text" placeholder="地址" v-bind:disabled="disabled">
            </div>
        </div>

        <div class="ui dividing header">
            联系人信息
            <a v-if="shop.ref.name !== null" @click="popupShow=disabled=false"
               style="font-size: 0.7em; font-weight:normal">编辑</a>
        </div>
        <div class="ui small form">
            <div class="inline field">
                <label>负责人姓名</label>
                <input v-model="shop.ref.keeper_name" type="text" v-bind:disabled="disabled">
            </div>

            <div class="inline field">
                <label>负责人电话</label>
                <input v-model="shop.ref.keeper_phone" type="text" v-bind:disabled="disabled">
            </div>

            <div class="ui primary button field" @click="save" v-if="disabled === false">保存</div>
        </div>
    </div>
</template>

<script type="text/babel">
    export default {
        name: 'selectShop',
        data() {
            return {
                shop: this.$store.state.shop,
                shopLst: [],
                disabled: true,
                popupShow: true
            }
        },
        mounted() {
            this.switchToSelect()

            $('#shop-name-search').popup({
                position: 'bottom left',
                on: 'click'
            })
        },
        watch: {
            'shop.ref.name': function(newVal) {
                var self = this,
                    selectPopup = $('#shop-name-search')

                if(self.popupShow === false) {
                    return
                }

                if (newVal === null || typeof newVal == 'undefined' || newVal.length <= 0) {
                    self.refreshShopLst()
                    return
                }

                if(selectPopup.popup('is hidden') === true) {
                    selectPopup.popup('show')
                }

                // $.getJSON({
                //     url: '/api/v1/salesman/shop',
                //     data: {
                //         'key': self.shop.ref.name
                //     }
                // }, function(data) {
                    self.shopLst = [
                        {
                            name: 'name',
                            address: 'address'
                        },
                        {
                            name: 'name',
                            address: 'address'
                        }
                    ]
                // })
            },

            popupShow: function(newVal) {
                var selectPopup = $('#shop-name-search')

                newVal === false
                    ? selectPopup.popup('destroy')
                    : selectPopup.popup({
                        position: 'bottom left',
                        on: 'click'
                    })
            }
        },
        computed: {
            isEmpty() {
                return ($.trim(this.shop.ref.name) === '' ||
                        $.trim(this.shop.ref.keeper_name) === '' ||
                        $.trim(this.shop.ref.keeper_phone) === '' ||
                        $.trim(this.shop.ref.address) === '')
            }
        },
        methods: {
            clearData: function(data) {
                for (var k in data) {
                    if (data.hasOwnProperty(k)) {
                        data[k] = null
                    }
                }
            },

            setActiveItem: function(target) {
                target.addClass('active')
                target.siblings().removeClass('active')
            },

            switchToSelect: function() {
                this.setActiveItem($('#shop-select-item'))
                this.clearData(this.$store.state.shop.ref)
                this.$router.push('/dist/add/select')
            },

            unboxStoreData: function(data) {
                return {
                    id: parseInt(data.id),
                    name: data.name,
                    keeper_name: data.contact,
                    keeper_phone: data.phone,
                    address: data.address
                }
            },

            searchItemSelected: function(event) {
                var self = this,
                    selectedList = self.shopLst[$(event.target).attr('idx')]

                // $.getJSON({
                //     url: '/api/v1/salesman/shop/'+ selectedList.id,
                // }).done(function(data) {
                    self.$store.state.shop.ref = {
                        id: '11111',
                        name: 'name',
                        keeper_name: 'keeper',
                        keeper_phone: 'phone',
                        address: 'address'
                    }
                    self.$store.state.deviceLst = [
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
                // }).fail(function() {
                //     alert('Fail to load info')
                // })

                $('#shop-name-search').popup('hide')
            },

            refreshShopLst: function() {
                var self = this

                // $.getJSON({
                //     url: '/api/v1/salesman/shop',
                //     data: {
                //         'nearest': 1,
                //         'lat': self.$store.state.geoLocation.curPoint.lat,
                //         'lng': self.$store.state.geoLocation.curPoint.lng
                //     }
                // }).done(function(data){
                    self.shopLst = [
                        {
                            name: 'name',
                            address: 'address'
                        },
                        {
                            name: 'name',
                            address: 'address'
                        }
                    ]
                // }).fail(function(){
                //     alert('Fail')
                // })
            },

            save: function() {
                var self = this

                if(self.isEmpty) {
                    alert('填写项不能为空')
                    return
                }

                // $.ajax({
                //     url: '/api/v1/salesman/shop/' + self.shop.ref.id,
                //     method: 'post',
                //     contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                //     data: {
                //         name: self.shop.ref.name,
                //         contact: self.shop.ref.keeper_name,
                //         phone: self.shop.ref.keeper_phone,
                //         address: self.shop.ref.address
                //     }
                // }).done(function(data) {
                //     if (data.code !== 0) {
                //         alert('保存失败' + data.error_msg + '\n')
                //         return
                //     }

                    alert('保存成功')

                    self.popupShow = self.disabled = true
                // }).fail(function() {
                //     alert('保存失败')
                // })
            }
        }
    }
</script>
