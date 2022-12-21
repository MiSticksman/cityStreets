<template>
    <div>
        <!-- @submitForm="submitForm($event)" -->
        <street-list
            @deleteStreet="deleteStreet($event)"/>
    </div>
</template>

<script>
import StreetList from "@/components/street/StreetList.vue";
export default {
    components: {
        StreetList,
    },
    
    // async created() {
    //     this.$store.getters.getStreets
    // },

    methods: {
        // async submitForm(streets) {
        //   this.streets = streets
        // },

        async deleteStreet(street) {
            console.log("remove")
            await fetch(`${this.$store.state.streetsURL}/${street.street_id}/`, {
                method: 'delete',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.street)
            });
            await this.$store.getters.getStreets;
            location.reload() 
        },
        
    }
}
</script>
<style scoped>
</style>