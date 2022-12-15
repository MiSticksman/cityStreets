<template>

  <form class="streetForm" @submit.prevent="submitForm">
    <input
        type="text"
        class="input"
        placeholder="Street name"
        v-model="street.street_name">
    <button class="btn btn-success">Submit</button>
  </form>

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

export default {
  props: {
    streets: {
      required: true
    },
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
    async submitForm() {
      if (this.street.street_id === undefined) {
        this.createStreet();
      } else {
        this.editStreet();
      }
    },

    async createStreet() {
      console.log("create")
      console.log("street before", this.street.street_name)
      await fetch(`${this.$store.state.streetsURL}/`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(this.street)
      }).then(async response => {
        const data = await response.json();
        if (response.ok) {
          this.$emit('submitForm', await this.$store.getters.getStreets)
          location.reload()
        } else {
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
    },

    async editStreet() {
      console.log("edit")
      await fetch(`${this.$store.state.streetsURL}/${this.street.street_id}/`, {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(this.street)
      }).then(async response => {
        const data = await response.json();
        if (response.ok) {
          this.$emit('submitForm', await this.$store.getters.getStreets)
          location.reload()
        } else {
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }
        this.postId = data.id;
      })
          .catch(error => {
            this.showAlert("A street with that name already exists!")
            console.error('There was an error!', error.$data);
          });
      this.street = {};
    },
    
    async deleteStreet(street) {
      this.$emit('deleteStreet', street)
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
  border-radius: 5px;
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