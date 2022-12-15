<template>
    <div>
        <route-list 
            :routes="routes"
            :routesComps="routesComps"
            @submit="submitForm"
            :getRoutes="getRoutes"
            :getRouteComps="getRouteComps"/>
    </div>
</template>

<script>

import RouteList from '@/components/route/RouteList.vue';
export default {
    components: {
        RouteList
    },
    data() {
        return {
            routes: [],
            routesComps: [],
        }
    },
    async created() {
        await this.getRoutes();
        await this.getRouteComps();
    },

    methods: {
        submitForm() {
            
        },
        async getRoutes() {
            var response =  await fetch(`${this.$store.state.routesURL}/`)
            this.routes =  await response.json();
        },
        async getRouteComps() {
            var response =  await fetch(`${this.$store.state.routeCompsURL}/`)
            this.routesComps =  await response.json();
        },
    }
    
}
</script>

<style scoped>

</style>