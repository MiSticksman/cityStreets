<template>
    
    <form class="houseForm" @submit.prevent="submitForm">
        <select v-model="house.street">
            <option 
                v-for="street in streets"
                v-bind:key="street.street_id"
                v-bind:value="street.street_id">
                {{ street.street_name }}
            </option>
        </select>
        <input 
            v-model="house.house_number"
            class="input"
            min="1"
            placeholder="House number"
            type="number">
        <button class="btn btn-success">Submit</button>     
    </form>

    <!-- <my-dialog v-model:show="dialogVisible">
            <label class="houseNames">A house with that street and number already exists!</label>
    </my-dialog> -->


    <div v-for="(house, index) in houses"
        :key="house.house_id" class="house"
        @dblclick="($data.house=house)"> 
        <div><strong>#{{(index+1)}}</strong></div>
        <div class="houseParams">{{ house.street_name}}, {{house.house_number }}</div>
        <button 
            class="btn btn-danger btn-sm mx-1"
            @click="deleteHouse(house)"
            >Remove</button> 
            
    </div>
</template>

<script>
const housesURL = "http://localhost:8000/houses";
const streetsURL = "http://localhost:8000/streets";
export default {
    props: {
        houses: {
            required: true
        },
        getHouses: { type: Function },
    },
    data() {
        return {
            house: {},
            streets: [],
            dialogVisible: false, 
        }
        
    },
    async created() {
        await this.getStreets();
    },
    methods: {
        async getStreets() {
            var response =  await fetch(`${streetsURL}/`)
            this.streets =  await response.json();
        },
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
            await this.getHouses()
            console.log("create")
            await fetch(`${housesURL}/`, {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(this.house)
            }).then(async response => {
            const data = await response.json();
            if (!response.ok) {
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
            this.house.house_number = ''
            await this.getHouses()
        },

        async editHouse() {
            await this.getHouses()
            console.log("edit")
            await fetch(`${housesURL}/${this.house.house_id}/`, {
                method: 'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(this.house)
            }).then(async response => {
            const data = await response.json();
            if (!response.ok) {
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
            } 
            this.postId = data.id;
            })
            .catch(error => {
            this.showAlert("A house with that street and number already exists!")
            console.error('There was an error!', error.$data);
            }); 
            await this.getHouses()
            this.house = {};
        },
    
        async deleteHouse(house) {
            await this.getHouses()
            console.log("remove")
            await fetch(`${housesURL}/${house.house_id}/`, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.house)
            });
            await this.getHouses()
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