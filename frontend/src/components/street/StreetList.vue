<template>
  <form class="streetForm" @submit.prevent="submitForm" >
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
        
  
  <h1>Street list</h1>
  <form class="streetForm" @submit.prevent="searchForm" >
    <input
      type="text"
      class="input"
      placeholder="seach..."
      v-model="this.search"
    />
    <button class="btn btn-success">Search</button>
  </form>

  <div v-if="this.curStreets.length > 0">

    <select v-model="selectedOrder">
    <option disabled value="">Order by</option>
    <option
      v-for="option in orderStreets"
      :key="option.value"
      :value="option.value">
      {{ option.name }}
    </option>
  </select>
 
    <div
      class="street"
      v-for="(street, index) in this.curStreets"
      :key="street.street_id"
      @dblclick="($data.street = street), 
      this.$refs.input.focus()"
    >
      <div>
        <strong>#{{ index + 1 }}</strong>
      </div>
      <div class="streetNames" ref="street">{{ street.street_name }}</div>
      <button class="btn btn-danger btn-sm mx-1" @click="deleteStreet(street)">
        Remove
      </button>
    </div>
    <Pagination
      :total="total"
      :limit="curStreets.length"
      @page-changed="loadStreets"
      @selected-order="selectedOrder"
    />
  </div>
  <div v-else>
    <h2 style="color: red">List is empty</h2>
  </div>
</template>

<script>
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
      curPage: 0,
      dialogVisible: false,
      selectedOrder: "",
      orderStreets: [
        { value: "-street_id", name: "by adding" },
        { value: "street_name", name: "by alphabetically" },
      ],
      search: '',
    };
  },
  created() {
    this.loadStreets(this.page);
  },
  methods: {
    async loadStreets(pageNumber) {
      this.curPage = pageNumber;
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
          this.showAlert('error!');
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
          if (!response.ok) {
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }
          this.postId = data.id;
        })
        .catch((error) => {
          this.showAlert('error!');
          console.error("There was an error!", error.$data);
        });
      this.street = {};
    },

    async deleteStreet(street) {
      this.$emit("deleteStreet", street);
    },

    async searchForm() {
      this.curStreets = await fetch(
        `${this.$store.getters.getStreetsURL}/?search=${this.search}`
      )
        .then((response) => response.json())
        if(this.search === "") {
          this.loadStreets(this.curPage);
        }
    }
  },
  watch: {
    async selectedOrder(newValue) {
      console.log("selected_sort", this.selectedOrder)
      console.log("this.page", this.curPage)
      this.curStreets = await fetch(
        `${this.$store.getters.getStreetsURL}/?page=${this.curPage}&ordering=${this.selectedOrder}`
      )
        .then((response) => response.json())
        .then((response) => {
          return response.results;
        });
    },
  },
};
</script>

<style scoped>
.streetForm {
  display: flex;
  width: 70%;
  flex-direction: row;
  padding-bottom: 10px;
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
