import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        geoLocation: {
            curPoint: {
                lat: 116.404,
                lng: 39.915,
                address: null,
                adcode: null,
                citycode: null
            },
            addedShop: [],
            nearByShop: []
        },
        cmApp: {
            mapInfo: {
                map: null,
                geolocation: null,
                geoc: null,
                curPosMarker: null,
                addedMarkers: [],
                placeSearch: null,
                nearByShopMarkers: [],
                nearByStores: []
            }
        },
        shop: {
            ref: {
                id: null,
                name: null,
                keeper_name: null,
                keeper_phone: null,
                address: null
            }
        },
        device: {
            ref: {
                uid: null,
                // comment: null,
                device_id: null,
                shop: null,
                // version_num: 2,
                endSymbol: null,
            }
        },

        deviceLst: []
    }
})
