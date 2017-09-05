<template>
    <div class="map">
        <div class="ui basic modal">
            <div class="header">定位中请稍候</div>
        </div>
        <header class="ui inverted menu" style="margin:0px">
            <a class="item active" data-tab="map" id="map-btn" @click="switchToMap">
                <i class="map icon"></i>
            </a>

            <a class="item" data-tab="add-dev" id="add-dev-btn" @click="switchToAdd" >
                <i class="plus square outline icon"></i>
            </a>

            <a class="item" data-tab="management" id="mgmt-btn" @click="switchToManagement">
                <i class="list icon"></i>
            </a>

            <div class="right menu">
                <div class="ui dropdown item">
                    <i class="user icon"></i>
                    <div class="menu">
                        <a class="item" @click="logout">登出</a>
                    </div>
                </div>
            </div>
        </header>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'map',
        mounted() {
            $('.ui.dropdown').dropdown()
        },
        methods: {
            setActiveItem: function(target) {
                target.addClass('active')
                $.each(target.siblings(), function(index, el){
                    $(el).removeClass('active')
                })
            },

            switchToMap: function() {
                this.setActiveItem($('#map-btn'))
                this.$router.push('/dist')
            },

            switchToAdd: function() {
                if(this.$store.state.geoLocation.curPoint.address === null) {
                    $('.ui.basic.modal').modal('show')
                    setTimeout(function(){
                        $('.ui.basic.modal').modal('hide')
                    }, 1000)
                } else {
                    this.$router.push('/dist/add')
                    this.setActiveItem($('#add-dev-btn'))
                }
            },

            switchToManagement: function() {
                this.$router.push('/dist/man')
                this.setActiveItem($('#mgmt-btn'))
            },

            logout: function() {
                var self = this
                // $.ajax({
                //     type: 'POST',
                //     url: '/api/v1/common/user/logout',
                //     success: function(data) {
                //         if(data.code === 0) {
                            self.$router.push('/')
                //         }
                //     }
                // })
            }
        }
    }
</script>

<style>
    html,
    body,
    .map,
    #app {
        height: 100%;
        margin: 0;
    }

    .map {
        margin: 0;

        display: flex;

        flex-flow: column;
    }
    .map header {
        flex: 0 1 auto;
    }
    .map article {
        flex: 1 1 auto;
    }
    .map article #map-pg1 {
        width: 100%;
        height: 100%;
        margin: 0;

        overflow: hidden;
    }
    .map article #map-pg1 #map_wrapper {
        width: 100%;
        height: 100%;

        overflow: hidden;
    }
    .map article #map-pg1 #foottab {
        position: absolute;
        right: 15px;
        bottom: 22px;

        box-shadow: 0 0 6px rgba(0, 0, 0, .2);
    }

    .ui.basic.modal > .header {
        text-align: center;
    }
</style>
