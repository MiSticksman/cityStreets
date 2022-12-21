<template>
    <div>
        <!-- @submitForm="submitForm" -->
        <house-list 
            @deleteHouse="deleteHouse($event)"/>
    </div>
</template>

<script>
import HouseList from '@/components/house/HouseList.vue';
export default {
    components: {
        HouseList
    },

    // async created() {
    //     this.$store.getters.getHouses
    //     this.$store.getters.getStreets
    // },

    methods: {
        // submitForm(houses) {
        //     this.houses = houses
        // },
        async deleteHouse(house) {
            console.log("remove")
            await fetch(`${this.$store.state.housesURL}/${house.house_id}/`, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.house)
            });
            await this.$store.getters.getHouses
            location.reload() 
        },
    }
}
</script>

<style scoped>

</style>