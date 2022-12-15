<template>
    <div>
        <house-list 
            :houses="houses"
            @submit="submitForm"
            :getHouses="getHouses"/>
    </div>
</template>

<script>
import HouseList from '@/components/house/HouseList.vue';
export default {
    components: {
        HouseList
    },
    data() {
        return {
            houses: []
        }
    },

    async created() {
        await this.getHouses();
    },

    methods: {
        submitForm() {
            
        },
        async getHouses() {
            var response =  await fetch(`${this.$store.state.housesURL}/`)
            this.houses =  await response.json();
        },
    }
}
</script>

<style scoped>

</style>