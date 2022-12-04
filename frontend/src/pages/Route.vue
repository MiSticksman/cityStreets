<template>
    <div>
        <route-list 
            :routes="routes"
            @submit="submitForm"
            :getRoutes="getRoutes"/>
    </div>
</template>

<script>
const routesUrl = "http://localhost:8000/routes";
import RouteList from '@/components/route/RouteList.vue';
export default {
    components: {
        RouteList
    },
    data() {
        return {
            routes: []
        }
    },

    async created() {
        await this.getRoutes();
    },

    methods: {
        submitForm() {
            
        },
        async getRoutes() {
            var response =  await fetch(`${routesUrl}/`)
            this.routes =  await response.json();
        },
    }
    
}
</script>

<style scoped>

</style>