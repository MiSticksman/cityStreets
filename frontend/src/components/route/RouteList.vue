<template>

  <form class="routeForm" @submit.prevent="submitForm">
    <input
        ref="inputRoute"
        type="text"
        class="input"
        placeholder="Route name"
        v-model="route.route_name">
    <button class="btn btn-success">Submit</button>
  </form>

  <h1>Route list</h1>

    <div class="route"
         v-for="(route, index) in this.$store.state.routes" :key="route.route_id"
         @dblclick="($data.route=route), this.$refs.inputRoute.focus()">
      <div><strong>#{{ (index + 1) }}</strong></div>
      <div class="routeNames">{{ route.route_name }}</div>

      <div v-for="(routeComp, ind) in this.$store.state.routesComps" :key="routeComp.route_comp_id">
        <div class="routeComponents" v-if="route.route_id == routeComp.route">
          <div><strong>#{{ (ind + 1) }}</strong></div>
          <div>{{ routeComp.street_name }}, {{ routeComp.house_number}}: {{routeComp.follow_up_number }} </div>
          <button
              class="btn btn-danger btn-sm mx-1"
              @click="deleteRoute(route)"
          >Remove
          </button>
          <button
              class="btn btn-success"
              @click="editRoute()"
          >Edit
          </button>
        </div>

      </div>
      <button
              class="btn btn-danger btn-sm mx-1"
              @click="deleteRoute(route)"
          >Remove route
          </button>
    </div>

</template>

<script>
export default {

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
      console.log("create")
      console.log("route before", this.route.route_name)
      await fetch(`${this.$store.state.routesURL}/`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(this.route)
      }).then(async response => {
        const data = await response.json();
        if (response.ok) {
          location.reload()
        } else {
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
    },

    async editRoute() {
      console.log("edit")
      await fetch(`${this.$store.state.routesURL}/${this.route.route_id}/`, {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(this.route)
      }).then(async response => {
        const data = await response.json();
        if (response.ok) {
          location.reload()
        } else {
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }
        this.postId = data.id;
      })
          .catch(error => {
            this.showAlert("A route with that name already exists!")
            console.error('There was an error!', error.$data);
          });
      this.route = {};
    },

    async deleteRoute(route) {
      this.$emit('deleteRoute', route)
    },

    async createRouteComp() {
      console.log("create")
      console.log("route before", this.routeComp)
      await fetch(`${this.$store.state.routeCompsURL}/`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(this.route)
      }).then(async response => {
        const data = await response.json();
        if (response.ok) {
          location.reload()
        } else {
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
    },

    async editRouteComp() {
      await this.getRouteComps()
      console.log("edit")
      await fetch(`${this.$store.state.routeCompsURL}/${this.routeComp.route_comp_id}/`, {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(this.route)
      }).then(async response => {
        const data = await response.json();
        if (response.ok) {
          location.reload()
        } else {
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }
        this.postId = data.id;
      })
          .catch(error => {
            this.showAlert("A route with that name already exists!")
            console.error('There was an error!', error.$data);
          });
      this.routeComp = {};
    },

    async deleteRouteComp(routeComps) {
      this.$emit('deleteRoutComps', routeComps)
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
  font-size: 20px;
}

.routeComponents{
  padding: 15px;
  border: 1px solid teal;
  margin-top: 15px;
}
</style>