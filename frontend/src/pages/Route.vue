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
const routesUrl = "http://localhost:8000/routes";
const routeCompsURL = "http://localhost:8000/routes_components";

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
            var response =  await fetch(`${routesUrl}/`)
            this.routes =  await response.json();
        },
        async getRouteComps() {
            var response =  await fetch(`${routeCompsURL}/`)
            this.routesComps =  await response.json();
        },
    }
    
}
</script>

<style scoped>

</style>