<template>

  <form class="routeForm" @submit.prevent="submitForm">
    <input
        type="text"
        class="input"
        placeholder="Route name"
        v-model="route.route_name">
    <button class="btn btn-success">Submit</button>
  </form>

  <h1>Route list</h1>

    <div class="route"
         v-for="(route, index) in routes" :key="route.route_id"
         @dblclick="($data.route=route)">
      <div><strong>#{{ (index + 1) }}</strong></div>
      <div class="routeNames">{{ route.route_name }}</div>

      <div v-for="(routeComp, ind) in routesComps" :key="routeComp.route_comp_id">
        <div class="routeComponents" v-if="route.route_id == routeComp.route">
          <div><strong>#{{ (ind + 1) }}</strong></div>
          <div>{{ routeComp.street_name }}, {{ routeComp.house_number}}: {{routeComp.follow_up_number }} </div>
          <button
              class="btn btn-danger btn-sm mx-1"
              @click="deleteRoute(route)"
          >Remove
          </button>
        </div>

      </div>
      <button
              class="btn btn-danger btn-sm mx-1"
              @click="deleteRoute(route)"
          >Remove
          </button>
    </div>


</template>

<script>
const routesURL = "http://localhost:8000/routes";
const routeCompsURL = "http://localhost:8000/routes_components";

export default {
  props: {
    routes: {
      required: true
    },
    routesComps: {
      required: true
    },
    getRoutes: {type: Function},
    getRouteComps: {type: Function},
  },

  data() {
    return {
      route: {},
      routeComp: {},
      dialogVisible: false,
    }
  },
  methods: {
    showAlert(error) {
      this.$swal(error);
    },
    submitForm() {
      this.$emit('submit')
        if (this.route.route_id === undefined) {
          this.createRoute();
        } else {
          this.editRoute();
        }
    },

    async createRoute() {
      await this.getRoutes()
      console.log("create")
      console.log("route before", this.route.route_name)
      await fetch(`${routesURL}/`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(this.route)
      }).then(async response => {
        const data = await response.json();
        if (!response.ok) {
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }
        this.postId = data.id;
      })
          .catch(error => {
            this.showAlert("A route with that name already exists!")
            console.error('There was an error!', error.$data);
          });
      this.route.route_name = ''
      await this.getRoutes()
    },

    async editRoute() {
      await this.getRoutes()
      console.log("edit")
      await fetch(`${routesURL}/${this.route.route_id}/`, {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(this.route)
      }).then(async response => {
        const data = await response.json();
        if (!response.ok) {
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }
        this.postId = data.id;
      })
          .catch(error => {
            this.showAlert("A route with that name already exists!")
            console.error('There was an error!', error.$data);
          });
      await this.getRoutes()
      this.route = {};
    },

    async deleteRoute(route) {
      await this.getRoutes()
      console.log("remove")
      await fetch(`${routesURL}/${route.route_id}/`, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.route)
      });
      await this.getRoutes()
    },
  }

}
</script>

<style scoped>
.routeForm {
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

.route {
  padding: 15px;
  border: 1px solid teal;
  margin-top: 15px;
}

.routeNames {
  font-size: 20px;
}

.routeComponents{
  padding: 15px;
  border: 1px solid teal;
  margin-top: 15px;
}
</style>