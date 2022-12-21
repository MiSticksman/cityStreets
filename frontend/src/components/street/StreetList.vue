<template>
  <form class="streetForm" @submit.prevent="submitForm">
    <input
      ref="input"
      type="text"
      class="input"
      placeholder="Street name"
      v-model="street.street_name"
    />
    <button class="btn btn-success">Submit</button>
  </form>

  <!-- <my-select
        v-bind="selectedSort"
        :options="sortStreets"/> -->
  <!-- <select v-model="selectedSort">
    <option disabled value="">Select from list</option>
    <option
      v-for="option in sortStreets"
      :key="option.value"
      :value="option.value">
      {{ option.name }}
    </option>
  </select> -->

  <div v-if="this.curStreets.length > 0">
    <h1>Street list</h1>
    
    
    <div
      class="street"
      v-for="(street, index) in this.curStreets"
      :key="street.street_id"
      @dblclick="($data.street = street), this.$refs.input.focus()"
    >
      <div>
        <strong>#{{ index + 1 }}</strong>
      </div>
      <div class="streetNames">{{ street.street_name }}</div>
      <button class="btn btn-danger btn-sm mx-1" @click="deleteStreet(street)">
        Remove
      </button>
    </div>
    <Pagination
      :total="total"
      :limit="curStreets.length"
      @page-changed="loadStreets"
    />
  </div>
  <div v-else>
    <h2 style="color: red">List is empty</h2>
  </div>
</template>

<script>
import { isProxy, toRaw } from "vue";
import Pagination from "@/components/Pagination.vue";
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      street: {},
      curStreets: [],
      allStreets: [],
      page: 1,
      total: 0,
      dialogVisible: false,
      selectedSort: "",
      sortStreets: [
        { value: "title", name: "alphabetically" },
        { value: "id", name: "by adding" },
      ],
    };
  },
  created() {
    this.loadStreets(this.page);
  },
  methods: {
    async loadStreets(pageNumber) {
      this.curStreets = await fetch(
        `${this.$store.getters.getStreetsURL}/?page=${pageNumber}`
      )
        .then((response) => response.json())
        .then((response) => {
          this.total = response.count;
          return response.results;
        });
      this.allStreets = await this.$store.getters.getStreets;
      this.$refs.input.focus();
    },

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
      console.log("create");
      console.log("street before", this.street.street_name);
      await fetch(`${this.$store.state.streetsURL}/`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.street),
      })
        .then(async (response) => {
          const data = await response.json();
          if (response.ok) {
            // this.$emit('submitForm', await this.$store.getters.getStreets)
            location.reload();
          } else {
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }
          this.postId = data.id;
        })
        .catch((error) => {
          this.showAlert("A street with that name already exists!");
          console.error("There was an error!", error.$data);
        });
      this.street.street_name = "";
    },

    async editStreet() {
      console.log("edit");
      await fetch(`${this.$store.state.streetsURL}/${this.street.street_id}/`, {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.street),
      })
        .then(async (response) => {
          const data = await response.json();
          if (response.ok) {
            // this.$emit('submitForm', await this.$store.getters.getStreets)
            // location.reload()
          } else {
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }
          this.postId = data.id;
        })
        .catch((error) => {
          this.showAlert("A street with that name already exists!");
          console.error("There was an error!", error.$data);
        });

      this.street = {};
    },

    async deleteStreet(street) {
      this.$emit("deleteStreet", street);
    },
  },
  // watch: {
  //   selectedSort(newValue) {
  //     // this.$store.commit('sortStreets')
  //     let streets = this.$store.commit('sortStreets')
  //     // if (isProxy(this.$store.state.streets)){
  //     //     console.log('isProxy')
  //     //     streets = toRaw(this.$store.state.streets)
  //     // }
  //     console.log('str', streets)
  //     // streets = streets.sort()
  //     // console.log('strSort', streets)
  //     return streets
  //   },
  // }
};
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
