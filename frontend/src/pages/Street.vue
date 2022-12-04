<template>
    <div>
        <street-list 
            :streets="streets"
            @submit="submitForm"
            :getStreets="getStreets"/>
    </div>
</template>

<script>
const streetsURL = "http://localhost:8000/streets";
import StreetList from "@/components/street/StreetList.vue";
export default {
    components: {
        StreetList
    },
    data() {
        return {
            streets: []
        }
    },

    async created() {
        await this.getStreets();
    },

    methods: {
        submitForm() {
            
        },
        async getStreets() {
            var response =  await fetch(`${streetsURL}/`)
            this.streets =  await response.json();
            // return this.streets
        },
    }
    
}
</script>

<style scoped>

</style>