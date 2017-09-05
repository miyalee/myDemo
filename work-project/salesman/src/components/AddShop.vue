<template>
    <div class="ui bottom tab segment active" id="add-shop-tab" data-tab="add-shop">
        <div class="ui small form">
            <div class="ui field alwaysenabled" id="shop-name-input">
                <label>店名</label>
                <input v-model="shop.ref.name" type="text">
            </div>

            <div class="ui popup fluid">
                <div class="ui tiny dividing header">地图搜索结果</div>
                <div class="ui divided items">
                    <div class="item content" @click="searchItemSelected" v-for="(s,index) in shopLst" v-bind:idx="index">
                        {{ s.name }}, {{s.address }}, {{s.distance}} 米
                    </div>
                </div>
            </div>
            <p> {{ curLocation.address }} </p>

            <div class="ui dividing header">联系人信息</div>
            <div class="ui small form">
                <div class="inline field">
                    <label>负责人姓名</label>
                    <input v-model="shop.ref.keeper_name" type="text" placeholder="必填">
                </div>

                <div class="inline field">
                    <label>负责人电话</label>
                    <input v-model="shop.ref.keeper_phone" type="text" placeholder="必填">
                </div>

                <div class="ui primary button field" @click="add">添加</div>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
    export default {
        name: 'addShop',
        data() {
            return {
                shop: this.$store.state.shop,
                shopLst: [],
                curLocation: this.$store.state.geoLocation.curPoint,
            }
        },
        mounted() {
            $('#shop-name-input').popup({
                position: 'bottom left',
                on: 'click'
            })
        },
        watch: {
            'shop.ref.name': function() {
                this.searchNearbyShops()
            }
        },
        computed: {
            isEmpty() {
                return ($.trim(this.shop.ref.name) === '' ||
                        $.trim(this.shop.ref.keeper_name) === '' ||
                        $.trim(this.shop.ref.keeper_phone) === '')
            }
        },
        methods: {
            unboxStoreData: function(data) {
                return {
                    id: data.id,
                    name: data.name,
                    keeper_name: data.contact,
                    keeper_phone: data.phone,
                }
            },

            searchNearbyShops: function() {
                var self = this

                if (self.shop.ref.name <= 1) {
                    return
                }

                self.$store.state.cmApp.mapInfo.placeSearch.setCity(self.curLocation.citycode)

                self.$store.state.cmApp.mapInfo.placeSearch.searchNearBy(
                    self.shop.ref.name,
                    new AMap.LngLat(self.curLocation.lng, self.curLocation.lat),
                    2000,
                    function(status, result) {
                        if (status == 'complete' && result.info == 'OK') {
                            console.log(result)
                            self.shopLst = result.poiList.pois
                        }
                    })
            },

            searchItemSelected: function(event) {
                var searchR = this.shopLst[$(event.target).attr('idx')]

                this.shop.ref.name = searchR.name
                this.curLocation.lat = searchR.location.lat
                this.curLocation.lng = searchR.location.lng
                this.shop.ref.phone = searchR.telephone
                $('#shop-name-input').popup('hide')
            },

            boxStoreData: function() {
                var self = this
                var data =  {
                    name: self.shop.ref.name,
                    adcode: self.curLocation.adcode,
                    address: self.curLocation.address,
                    lat: self.curLocation.lat,
                    lng: self.curLocation.lng,
                    contact: self.shop.ref.keeper_name,
                    phone: self.shop.ref.keeper_phone,
                }
                // if (self.shop.id !== null) {
                //     data.id = self.shop.ref.id
                // }
                return data
            },

            add: function() {
                var self = this
                var params = self.boxStoreData()

                if(self.isEmpty) {
                    alert('店名／姓名／电话不能为空')
                    return
                }

                if(params.adcode === null || params.address === null) {
                    alert('请先选择商店位置')
                    this.$router.push('/dist')
                    return
                }

                // $.ajax({
                //     url: '/api/v1/salesman/shop',
                //     method: 'put',
                //     dataType: 'text',
                //     contentType: 'application/x-www-form-urlencoded',
                //     data: params
                // }).done(function(data) {
                //     data = $.parseJSON(data)

                //     if (data.code !== 0) {
                //         alert('添加失败' + data.error_msg + '\n')
                //         return
                //     }

                    self.shop.ref = self.unboxStoreData({
                        id: '1111',
                        name: self.shop.ref.name,
                        keeper_name: self.shop.ref.keeper_name,
                        keeper_phone: self.shop.ref.keeper_phone,
                    })
                    alert('添加成功')
                // }).fail(function() {
                //     alert('添加失败')
                // })
            }
        }
    }
</script>
