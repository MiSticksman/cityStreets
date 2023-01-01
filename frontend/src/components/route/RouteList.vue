<template>
  <form class="routeForm" @submit.prevent="submitRouteForm">
    <input
      ref="input"
      type="text"
      class="input"
      placeholder="Route name"
      v-model="route.route_name"
    />
    <button class="btn btn-success">Submit</button>
    <button class="btn btn-primary"
    @click="clearForm"
    >Clear </button>
  </form>

  <my-dialog v-model:show="dialogVisible">
    <form class="routeCompsForm" @submit.prevent="submitRouteCompForm">
      <select v-model="routeComp.route">
        <option
          v-for="route in this.allRoutes"
          v-bind:key="route.route_id"
          v-bind:value="route.route_id"
        >
          {{ route.route_name }}
        </option>
      </select>
      <select v-model="routeComp.house">
        <option
          v-for="house in this.houses"
          v-bind:key="house.house_id"
          v-bind:value="house.house_id"
        >
          {{ house.street_name }}, {{ house.house_number }}
        </option>
      </select>
      <input
        v-model="routeComp.follow_up_number"
        class="input"
        min="1"
        placeholder="follow up number"
        type="number"
      />
      <button class="btn btn-success">Ok</button>
    </form>
  </my-dialog>

  <button class="btn btn-success" @click="routeCompCreateFormVisible(route)">
    Add route component
  </button>

  <h1>Route list</h1>
  <form class="routeForm" @submit.prevent="searchForm" >
    <input
      type="text"
      class="input"
      placeholder="seach by route name..."
      v-model="this.search"
    />
    <button class="btn btn-success">Search</button>
  </form>
  <div v-if="this.curRoutes.length > 0">
    
    <select v-model="selectedOrder">
    <option disabled value="">Order by</option>
    <option
      v-for="option in orderRoutes"
      :key="option.value"
      :value="option.value">
      {{ option.name }}
    </option>
  </select>
    
    <div
      class="route"
      v-for="(route, index) in this.curRoutes"
      :key="route.route_id"
      @dblclick="($data.route = route), this.$refs.input.focus()"
    >
      <div>
        <strong>#{{ index + 1 }}</strong>
      </div>
      <div class="routeNames">{{ route.route_name }}</div>

      <div
        v-for="routeComp in this.routesComps"
        :key="routeComp.route_comp_id"
      >
        <div class="routeComponents" v-if="route.route_id == routeComp.route">
          <div>
            <strong> {{ routeComp.follow_up_number }}</strong>
          </div>
          <div>
            <div class="routeCompNames">
              {{ routeComp.street_name }}, {{ routeComp.house_number }}
            </div>
          </div>

          <button
            class="btn btn-danger btn-sm mx-1"
            @click="deleteRoute(route)"
          >
            Remove
          </button>
          <button
            class="btn btn-success"
            @click="routeCompEditFormVisible(routeComp, route)"
          >
            Edit
          </button>
        </div>
      </div>

      <button class="btn btn-danger btn-sm mx-1" @click="deleteRoute(route)">
        Remove route
      </button>
    </div>
    <Pagination
      :total="total"
      :limit="curRoutes.length"
      @page-changed="loadRoutes"
    />
  </div>
  <div v-else>
    <h2 style="color: red">List is empty</h2>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'
export default {
  components: {
    Pagination
  },
  data() {
    return {
      route: {},
      routeComp: {},
      curRoutes: [],
      allRoutes: [],
      houses: [],
      routesComps: [],
      page: 1,
      total: 0,
      curPage: 0,
      dialogVisible: false,
      selectedOrder: "",
      orderRoutes: [
        { value: "-route_id", name: "by adding" },
        { value: "route_name", name: "by alphabetically" },
      ],
      search: '',
    };
  },
  created() {
    this.loadRoutes(this.page);
    this.loadAllHouses();
    this.loadAllRoutes();
    this.loadAllRoutesComps();
  },
  methods: {
    async loadRoutes(pageNumber) {
      this.curPage = pageNumber;
      this.curRoutes = await fetch(
        `${this.$store.getters.getRoutesURL}/?page=${pageNumber}`
      )
        .then((response) => response.json())
        .then((response) => {
          this.total = response.count;
          return response.results;
        });
        this.$refs.input.focus();
    },

    async loadAllHouses() {
      this.houses = await fetch(`${this.$store.getters.getHousesURL}/`).then((response) =>
        response.json()
      );
    },

    async loadAllRoutes() {
      this.allRoutes = await fetch(`${this.$store.getters.getRoutesURL}/`).then((response) =>
        response.json()
      );
    },

    async loadAllRoutesComps() {
      this.routesComps = await fetch(`${this.$store.getters.getRouteCompsURL}/`).then((response) =>
        response.json()
      );
    },

    showAlert(error) {
      this.$swal(error);
    },
    submitRouteForm() {
      // this.$emit("submit");
      if (this.route.route_id === undefined) {
        this.createRoute();
      } else {
        this.editRoute();
      }
    },

    async createRoute() {
      console.log("create");
      console.log("route before", this.route.route_name);
      await fetch(`${this.$store.state.routesURL}/`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.route),
      })
        .then(async (response) => {
          const data = await response.json();
          if (response.ok) {
            location.reload();
          } else {
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }
          this.postId = data.id;
        })
        .catch((error) => {
          this.showAlert("error while create");
          console.error("There was an error!", error.$data);
        });
      this.route = {};
    },

    async editRoute() {
      console.log("edit");
      await fetch(`${this.$store.state.routesURL}/${this.route.route_id}/`, {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.route),
      })
        .then(async (response) => {
          const data = await response.json();
          if (response.ok) {
            location.reload();
          } else {
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }
          this.postId = data.id;
        })
        .catch((error) => {
          this.showAlert("error while update");
          console.error("There was an error!", error.$data);
        });
      this.route = {};
    },

    async deleteRoute(route) {
      this.$emit("deleteRoute", route);
    },

    submitRouteCompForm() {
      // this.$emit("submit");
      if (this.routeComp.route_comp_id === undefined) {
        this.createRouteComp();
      } else {
        this.editRouteComp();
        console.log("edit end");
      }
    },

    async createRouteComp() {
      console.log("create RouteComp");
      console.log("routeComp before", this.routeComp);
      await fetch(`${this.$store.state.routeCompsURL}/`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.routeComp),
      })
        .then(async (response) => {
          const data = await response.json();
          if (response.ok) {
            location.reload();
          } else {
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }
          this.postId = data.id;
        })
        .catch((error) => {
          this.showAlert("error while create");
          console.error("There was an error!", error.$data);
        });
      this.routeComp = {};
    },

    async editRouteComp() {
      console.log("edit");
      await fetch(
        `${this.$store.state.routeCompsURL}/${this.routeComp.route_comp_id}/`,
        {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.routeComp),
        }
      )
        .then(async (response) => {
          const data = await response.json();
          if (response.ok) {
            location.reload();
          } else {
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }
          this.postId = data.id;
        })
        .catch((error) => {
          this.showAlert("error while update");
          console.error("There was an error!", error.$data);
        });
      this.routeComp = {};
    },

    async deleteRouteComp(routeComps) {
      this.$emit("deleteRoutComps", routeComps);
    },

    async routeCompCreateFormVisible() {
      this.dialogVisible = true;
    },

    async routeCompEditFormVisible(routeComp) {
      this.$data.routeComp = await routeComp;
      this.dialogVisible = true;
    },
    async searchForm() {
      this.curRoutes = await fetch(
        `${this.$store.getters.getRoutesURL}/?search=${this.search}`
      )
        .then((response) => response.json())
        if(this.search === "") {
          this.loadRoutes(this.curPage);
        }
    },
    clearForm() {
      this.$refs.input.reset();
    },
  },
  watch: {
    async selectedOrder(newValue) {
      console.log("selected_sort", this.selectedOrder)
      console.log("this.page", this.curPage)
      this.curRoutes = await fetch(
        `${this.$store.getters.getRoutesURL}/?page=${this.curPage}&ordering=${this.selectedOrder}`
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
.routeForm {
  display: flex;
  width: 70%;
  flex-direction: row;
  padding-bottom: 10px;
}

.input {
  width: 100%;
  border: 2px solid teal;
  padding: 10px 10px;
  margin-top: 15px;
  border-radius: 5px;
}

.route {
  padding: 15px;
  border: 3px solid teal;
  margin-top: 15px;
}

.routeNames {
  font-size: 25px;
}

.routeComponents {
  padding: 15px;
  border: 1px solid teal;
  margin-top: 15px;
}

.routeCompNames {
  font-size: 20px;
  /* color: rebeccapurple */
}
</style>
