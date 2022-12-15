<template>
    <div>
        <street-list
            :streets="streets"
            @deleteStreet="deleteStreet($event)"/>
    </div>
</template>

<script>
import StreetList from "@/components/street/StreetList.vue";
export default {
    components: {
        StreetList,
    },
    data() {
        return {
            streets: []
        }
    },

    async created() {
        this.streets = await this.$store.getters.getStreets;
        console.log('streets', this.streets)
    },

    methods: {
        async submitForm(streets) {
          this.streets = streets
        },

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
        },

        // async getStreets() {
        //     var response =  await fetch(`${this.$store.state.streetsURL}/`)
        //     this.streets =  await response.json();
        // },
    }
}
</script>
<style scoped>
</style>