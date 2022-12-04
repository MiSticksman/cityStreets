<template>

  <form class="streetForm" @submit.prevent="submitForm">
    <input
        type="text"
        class="input"
        placeholder="Street name"
        v-model="street.street_name">
    <button class="btn btn-success">Submit</button>
  </form>

  <!-- <my-dialog v-model:show="dialogVisible">
          <label class="streetNames">A street with that name already exists!</label>
  </my-dialog> -->

  <h1>Street list</h1>
  <div class="street"
       v-for="(street, index) in streets" :key="street.street_id"
       @dblclick="($data.street=street)">
    <div><strong>#{{ (index + 1) }}</strong></div>
    <div class="streetNames">{{ street.street_name }}</div>
    <button
        class="btn btn-danger btn-sm mx-1"
        @click="deleteStreet(street)"
    >Remove
    </button>

  </div>

</template>

<script>
const streetsURL = "http://localhost:8000/streets";
export default {
  props: {
    streets: {
      required: true
    },
    getStreets: {type: Function},
  },
  data() {
    return {
      street: {},
      dialogVisible: false,
    }
  },
  methods: {
    showAlert(error) {
      this.$swal(error);
    },
    submitForm() {
      this.$emit('submit')
      if (this.street.street_id === undefined) {
        this.createStreet();
      } else {
        this.editStreet();
      }
    },
    async createStreet() {
      await this.getStreets()
      console.log("create")
      console.log("street before", this.street.street_name)
      await fetch(`${streetsURL}/`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(this.street)
      }).then(async response => {
        const data = await response.json();
        if (!response.ok) {
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }
        this.postId = data.id;
      })
          .catch(error => {
            this.showAlert("A street with that name already exists!")
            console.error('There was an error!', error.$data);
          });
      this.street.street_name = ''
      await this.getStreets()
    },

    async editStreet() {
      await this.getStreets()
      console.log("edit")
      await fetch(`${streetsURL}/${this.street.street_id}/`, {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(this.street)
      }).then(async response => {
        const data = await response.json();
        if (!response.ok) {
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }
        this.postId = data.id;
      })
          .catch(error => {
            this.showAlert("A street with that name already exists!")
            console.error('There was an error!', error.$data);
          });
      await this.getStreets()
      this.street = {};
    },

    async deleteStreet(street) {
      await this.getStreets()
      console.log("remove")
      await fetch(`${streetsURL}/${street.street_id}/`, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.street)
      });
      await this.getStreets()
    },
  }
}
</script>

<style scoped>
.streetForm {
  display: flex;
  width: 70%;
  flex-direction: row;
}

.input {
  width: 100%;
  border: 1px solid teal;
  padding: 10px 10px;
  margin-top: 15px;
}

.street {
  padding: 15px;
  border: 1px solid teal;
  margin-top: 15px;
}

.streetNames {
  font-size: 20px;
}
</style>