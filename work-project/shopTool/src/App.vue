<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    import { setupCSRF } from './utils/utils'
    export default {
        name: 'app'
    }
</script>

<style>
    #app,
    #app > div {
        height: 100%
    }
</style>
