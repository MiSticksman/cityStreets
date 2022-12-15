<template>
  <div>
    <route-list
      @submitRoute="submitRoute($event)"
      @submitRouteComps="submitRouteComps($event)"
      @deleteRoute="deleteRoute($event)"
      @deleteRouteComps="deleteRouteComps($event)"
    />
  </div>
</template>

<script>
import RouteList from "@/components/route/RouteList.vue";
export default {
  components: {
    RouteList,
  },
  data() {
    return {
      routes: [],
      routesComps: [],
    };
  },
  async created() {
    await this.$store.getters.getStreets;
    await this.$store.getters.getHouses;
    await this.$store.getters.getRoutes;
    await this.$store.getters.getRouteComps;
  },

  methods: {
    submitRoute(routes) {
      this.routes = routes;
    },

    submitRouteComps(routesComps) {
      this.routesComps = routesComps;
    },

    async deleteRoute(route) {
      console.log("remove");
      await fetch(`${this.$store.state.routesURL}/${route.route_id}/`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.route),
      });
      await this.$store.getters.getRoutes;
      location.reload();
    },

    async deleteRouteComps(routeComp) {
      console.log("remove")
      await fetch(`${this.$store.state.routeCompsURL}/${routeComp.route_comp_id}/`, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.routeComp)
      });
      await this.$store.getters.getRouteComps;
      location.reload();
    },
  },
};
</script>

<style scoped></style>
