<template>
    
    <form class="houseForm" @submit.prevent="submitForm">
        <select v-model="house.street">
            <option 
                v-for="street in this.$store.state.streets"
                v-bind:key="street.street_id"
                v-bind:value="street.street_id">
                {{ street.street_name }}
            </option>
        </select>
        <input
            ref="input" 
            v-model="house.house_number"
            class="input"
            min="1"
            placeholder="House number"
            type="number"
            step="0.5">
        <button class="btn btn-success">Submit</button>     
    </form>

    <div v-for="(house, index) in this.$store.state.houses"
        :key="house.house_id" class="house"
        @dblclick="($data.house=house), this.$refs.input.focus();">
        <div><strong>#{{(index+1)}}</strong></div>
        <div class="houseParams">{{ house.street_name}}, {{house.house_number }}</div>
        <button 
            class="btn btn-danger btn-sm mx-1"
            @click="deleteHouse(house)"
            >Remove</button> 
            
    </div>
</template>

<script>
export default {
    props: {
        houses: {
            required: true
        },
    },
    data() {
        return {
            house: {},
            streets: [],
            dialogVisible: false, 
        }
        
    },
    methods: {
        showAlert(error) {
            this.$swal(error);
        },
        submitForm() {
            this.$emit('submit')
            if (this.house.house_id === undefined) {
            this.createHouse();
            } else {
                this.editHouse();
            }
        },
        async createHouse() {
            console.log("create")
            await fetch(`${this.$store.state.housesURL}/`, {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(this.house)
            }).then(async response => {
            const data = await response.json();
            if (response.ok) {
                this.$emit('sumbitForm', this.$store.getters.getHouses)
                // location.reload()
            } else {
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
            } 
            this.postId = data.id;
            })
            .catch(error => {
            this.showAlert("A house with that street and number already exists!")
            console.error('There was an error!', error.$data);
            }); 
            console.log("house:", this.house)
            // this.house.street.street_name = ''
            this.house = ''
        },

        async editHouse() {
            console.log("edit")
            await fetch(`${this.$store.state.housesURL}/${this.house.house_id}/`, {
                method: 'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(this.house)
            }).then(async response => {
            const data = await response.json();
            if (response.ok) {
                this.$emit('sumbitForm', this.$store.getters.getHouses)
                location.reload()
            } else{
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
            } 
            this.postId = data.id;
            })
            .catch(error => {
            this.showAlert("A house with that street and number already exists!")
            console.error('There was an error!', error.$data);
            }); 
            this.house = {};
        },
    
        async deleteHouse(house) {
            this.$emit('deleteHouse', house)
        }
    }  
}
</script>

<style scoped>

.houseForm {
    display: flex;
    width: 70%;
    flex-direction: row;
}
.input {
    width: 100%;
    border: 1px solid teal;
    padding: 10px 10px;
    margin-top: 15px;
    margin-left: 15px;
    border-radius: 5px;
}
.house {
    padding: 15px;
    border: 1px solid teal;
    margin-top: 15px;
}

.houseParams {
    font-size: 20px;
}
</style>