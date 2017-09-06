<template>
    <article>
        <div class="ui tab active" id="map-pg1" data-tab="map">
            <div id="map_wrapper"></div>

            <div class="ui tiny basic icon buttons" id="foottab">
                <button class="ui primary button" @click="centerToCurPoint"><i class="map pin icon"></i></button>
                <button class="ui primary button" @click="goToAdd"><i class="add circle icon"></i></button>

                <div class="ui icon dropdown button">
                    <i class="wrench icon"></i>
                    <div class="menu">
                        <div class="item" @click="refreshAndShowNearestAdded">刷新周围已添加店铺</div>
                        <div class="item" @click="refreshAndShowAllAdded">查看所有已添加店</div>
                        <div class="item" @click="refreshAndShowNearBy">搜索周边超市</div>
                        <div class="item" @click="clearOverlay">清空地图标记</div>
                        <div class="item"><a :href="`baidumap://map/marker?location=${mapStatus.curPoint.lat},${mapStatus.curPoint.lng}&title=我的位置&content=我的位置&src=webapp.marker.ichaomeng.add_device`">地图中打开当前位置</a></div>
                    </div>
                </div>
            </div>
        </div>
    </article>
</template>

<script type="text/babel">
    export default {
        name: 'map',
        data() {
            return{
                mapStatus: this.$store.state.geoLocation,
                clickPosMarker: null,
            }
        },
        mounted() {
            var self = this

            self.initLayout()

            self.$store.state.cmApp.mapInfo.map = new AMap.Map('map_wrapper', {
                zoom: 15,
                center: [116.404, 39.915]
            })
            AMap.service(['AMap.Geocoder', 'AMap.PlaceSearch'], function() {
                self.$store.state.cmApp.mapInfo.geoc= new AMap.Geocoder()
                self.$store.state.cmApp.mapInfo.placeSearch = new AMap.PlaceSearch({
                    pageSize: 10,
                    pageIndex: 1,
                    city: ''
                })
            })

            self.$watch(
                function() {
                    var a = self.mapStatus.curPoint.lat
                    var b = self.mapStatus.curPoint.lng
                    return (a + b) * (a + b + 1) / 2 + a
                },
                function() {
                    self.centerToCurPoint()
                    self.refreshAddr()
                })

            self.$store.state.cmApp.mapInfo.map.on('click', function(e) {
                self.mapStatus.curPoint.lat = e.lnglat.getLat()
                self.mapStatus.curPoint.lng = e.lnglat.getLng()
            })

            self.$store.state.cmApp.mapInfo.map.plugin('AMap.Geolocation', function() {
                self.$store.state.cmApp.mapInfo.geolocation= new AMap.Geolocation({
                    enableHighAccuracy: true, //是否使用高精度定位，默认:true
                    timeout: 10000,           //超过10秒后停止定位，默认：无穷大
                    maximumAge: 0,            //定位结果缓存0毫秒，默认：0
                    convert: true,            //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                    showButton: true,         //显示定位按钮，默认：true
                    buttonPosition: 'LB',     //定位按钮停靠
                    buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                    showMarker: true,         //定位成功后在定位到的位置显示点标记，默认：true
                    showCircle: true,         //定位成功后用圆圈表示定位精度范围，默认：true
                    panToLocation: true,      //定位成功后将定位到的位置作为地图中心点，默认：true
                    zoomToAccuracy: true       //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                })
                self.$store.state.cmApp.mapInfo.map.addControl(self.$store.state.cmApp.mapInfo.geolocation)

                AMap.event.addListener(self.$store.state.cmApp.mapInfo.geolocation, 'complete', function(e) {
                    self.mapStatus.curPoint.lat = e.position.getLat()
                    self.mapStatus.curPoint.lng = e.position.getLng()
                })

                self.reLocation()
            })
        },
        methods: {
            setMapHeight: function() {
                $('#map_wrapper').height($('article').height())
            },

            initLayout: function() {
                var self = this

                self.setMapHeight()
                $(window).resize(function() {
                    self.setMapHeight()
                })
                $('.dropdown').dropdown()
            },

            refreshAddr: function() {
                var self = this
                var point = new AMap.LngLat(
                    self.mapStatus.curPoint.lng,
                    self.mapStatus.curPoint.lat)
                self.$store.state.cmApp.mapInfo.geoc.getAddress(point, function(status, rs) {
                    if (status === 'complete' && rs.info === 'OK') {
                        self.mapStatus.curPoint.address = rs.regeocode.formattedAddress
                        self.mapStatus.curPoint.adcode = rs.regeocode.addressComponent.adcode
                        self.mapStatus.curPoint.citycode = rs.regeocode.addressComponent.citycode
                    } else {
                        console.log('Fail to get address')
                    }
                })
            },

            reLocation: function() {
                var self = this
                self.$store.state.cmApp.mapInfo.geolocation.getCurrentPosition(function(status, r) {
                    if (status === 'error') {
                        console.log('Error getting current location')
                    } else {
                        self.mapStatus.curPoint.lat = r.position.getLat()
                        self.mapStatus.curPoint.lng = r.position.getLng()
                    }
                })
            },

            centerToCurPoint: function() {
                var self = this
                console.debug('Curpoint updated to ' + self.mapStatus.curPoint.lat + ',' + self.mapStatus.curPoint.lng)
                var point = new AMap.LngLat(self.mapStatus.curPoint.lng,
                    self.mapStatus.curPoint.lat)
                self.$store.state.cmApp.mapInfo.map.panTo(point)
                if(self.$store.state.cmApp.mapInfo.curPosMarker !== null) {
                    self.$store.state.cmApp.mapInfo.curPosMarker.setPosition(point)
                } else {
                    self.$store.state.cmApp.mapInfo.curPosMarker = new AMap.Marker({
                        map: self.$store.state.cmApp.mapInfo.map,
                        position: point,
                        icon: new AMap.Icon({
                            image: 'http://webapi.amap.com/theme/v1.3/markers/b/mark_b.png',
                            imageSize: new AMap.Size(12, 18)
                        }),
                        label: {
                            content: '当前位置',
                            offset: new AMap.Pixel(10, -10)
                        }
                    })
                }
            },

            goToAdd: function() {
                this.$router.push('/dist/add')
            },

            refreshAndShowNearestAdded: function() {
                var self = this
                // $.getJSON({
                //     url: '/api/v1/salesman/shop',
                //     data: {
                //         'nearest': 1,
                //         'lat': self.mapStatus.curPoint.lat,
                //         'lng': self.mapStatus.curPoint.lng
                //     }
                // }, function(data){
                    self.mapStatus.addedShop = [
                        {
                            lat: 116.23,
                            lng: 39.54,
                            name: '天安门'
                        },
                        {
                            lat: 116.404,
                            lng: 39.915,
                            name: '五道口'
                        }
                    ]
                    self.showAdded()
                // })
            },

            refreshAndShowAllAdded: function() {
                var self = this
                // $.getJSON({
                //     url: '/api/v1/salesman/shop',
                // }, function(data){
                    self.mapStatus.addedShop = [
                        {
                            lat: 116.23,
                            lng: 39.54,
                            name: '天安门'
                        },
                        {
                            lat: 116.404,
                            lng: 39.915,
                            name: '五道口'
                        }
                    ]
                    self.showAdded()
                // })
            },

            showAdded: function() {
                var self = this
                self.clearAddedOverlay()
                if (self.mapStatus.addedShop === null) {
                    return
                }
                self.mapStatus.addedShop.forEach(function(entry) {
                    var marker = new AMap.Marker({
                        map: self.$store.state.cmApp.mapInfo.map,
                        position: new AMap.LngLat(entry.lng, entry.lat),
                        icon: new AMap.Icon({
                            image: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_r.png',
                            imageSize: new AMap.Size(10, 15)
                        }),
                        label: {
                            cotent: entry.name,
                            offset: new AMap.Pixel(20, -10)
                        }
                    })
                    self.$store.state.cmApp.mapInfo.addedMarkers.push(marker)
                })
            },

            refreshAndShowNearBy: function() {
                var self = this
                var cpoint = new AMap.LngLat(
                    self.mapStatus.curPoint.lng,
                    self.mapStatus.curPoint.lat)
                self.$store.state.cmApp.mapInfo.placeSearch.setCity(self.mapStatus.curPoint.citycode)
                self.$store.state.cmApp.mapInfo.placeSearch.searchNearBy(
                    '超市',
                    cpoint,
                    2000,
                    function(status, result) {
                        console.log(status)
                        if (status === 'complete' && result.info === 'OK') {
                            console.log(result)
                            self.$store.state.cmApp.mapInfo.nearByStores = result.poiList.pois
                            self.showNearBy()
                        }
                    })
            },

            showNearBy: function() {
                var self = this
                self.clearNearByOverlay()
                self.$store.state.cmApp.mapInfo.nearByStores.forEach(function(entry) {
                    var point = new AMap.LngLat(entry.location.lng, entry.location.lat)
                    var marker = new AMap.Marker({
                        map: self.$store.state.cmApp.mapInfo.map,
                        position: point,
                        icon: new AMap.Icon({
                            image: 'http://webapi.amap.com/theme/v1.3/markers/b/mark_b.png',
                            imageSize: new AMap.Size(10, 15)
                        }),
                        label: {
                            content: entry.name,
                            offset: new AMap.Pixel(20, -10)
                        }
                    })
                    self.$store.state.cmApp.mapInfo.nearByShopMarkers.push(marker)
                })
            },

            clearOverlay: function() {
                this.clearAddedOverlay()
                this.clearNearByOverlay()
            },

            clearAddedOverlay: function() {
                var self = this
                self.$store.state.cmApp.mapInfo.addedMarkers.forEach(function(entry) {
                    entry.setMap(null)
                })
                self.$store.state.cmApp.mapInfo.addedMarkers = []
            },

            clearNearByOverlay: function() {
                var self = this
                self.$store.state.cmApp.mapInfo.nearByShopMarkers.forEach(function(entry) {
                    entry.setMap(null)
                })
                self.$store.state.cmApp.mapInfo.nearByShopMarkers = []
            }
        }
    }
</script>
