import Vuex from "vuex";

export default new Vuex.Store({
    state: {
        streetsURL: "http://localhost:8000/streets",
        housesURL: "http://localhost:8000/houses",
        routesURL: "http://localhost:8000/routes",
        routeCompsURL: "http://localhost:8000/routes_components",
        streets: [],
        houses: [],
        routes: [],
        routesComps: [],

    },
    getters: {
        async getStreets(state) {
            var response =  await fetch(`${state.streetsURL}/`);
            state.streets = await response.json();
            console.log('gettetsStreets', state.streets);
            return state.streets;
        },

        async getHouses(state) {
            var response =  await fetch(`${state.housesURL}/`)
            state.houses =  await response.json();
            console.log('gettersHouses', state.streets)
            return state.houses;
        },

        async getRoutes(state) {
            var response =  await fetch(`${state.routesURL}/`)
            state.routes =  await response.json();
            return state.routes;
        },

        async getRouteComps(state) {
            var response =  await fetch(`${state.routeCompsURL}/`)
            state.routesComps =  await response.json();
            return state.routesComps;
        },

    },
    mutations: {},
    actions: {}
});