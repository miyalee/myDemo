<template>
    <article>
        <div class="ui tab active" id="add-dev-pg2" data-tab="add-dev">
            <div class="ui container" style="margin-top:10px; margin-bottom:10px;">
                <div class="ui raised segment" id="shop-selector">
                    <div class="ui blue ribbon label">商店</div>
                    <div class="content">
                        <div class="ui top small secondary pointing menu" id="shop-selector-menu">
                            <a class="active small item" id="shop-add-item" @click="switchToAdd">添加商店</a>
                            <a class="small item" id="shop-select-item" @click="switchToSelect">选择商店</a>
                        </div>

                        <router-view></router-view>
                    </div>
                </div>

                <AddDevice></AddDevice>
            </div>
        </div>
    </article>
</template>

<script type="text/babel">
    import AddDevice from './AddDevice.vue'

    export default {
        name: 'add',
        components: {
            AddDevice
        },
        mounted() {
            this.clearData(this.$store.state.shop.ref)
            this.setActiveItem($('#add-dev-btn'))
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
                $.each(target.siblings(), function(index, el){
                    $(el).removeClass('active')
                })
            },

            switchToAdd: function() {
                this.setActiveItem($('#shop-add-item'))
                this.clearData(this.$store.state.shop.ref)
                this.$router.push('/dist/add')
            },

            switchToSelect: function() {
                this.setActiveItem($('#shop-select-item'))
                this.clearData(this.$store.state.shop.ref)
                this.$router.push('/dist/add/select')
            }
        }
    }
</script>
