import Vuex from "vuex";
import { isProxy, toRaw } from 'vue';
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

        getStreetsURL(state) {
            return state.streetsURL;
        },

        getHousesURL(state) {
            return state.housesURL;
        },

        getRoutesURL(state) {
            return state.routesURL;
        },

        getRouteCompsURL(state) {
            return state.routeCompsURL;
        },

        async getStreets(state) {
            state.streets = await fetch(`${state.streetsURL}/`)
                .then(response => response.json())
            console.log('state.streets', state.streets);
            return state.streets;
        },

        async getHouses(state) {
            state.houses = await fetch(`${state.housesURL}/`)
                .then(response => response.json())
            console.log('state.houses', state.houses)
            return state.houses;
        },

        async getRoutes(state) {
            var response = await fetch(`${state.routesURL}/`)
            state.routes = await response.json();
            console.log('state.routes', state.routes)
            return state.routes;
        },

        async getRouteComps(state) {
            var response = await fetch(`${state.routeCompsURL}/`)
            state.routesComps = await response.json();
            return state.routesComps;
        },

        getRoutesLength(state) {
            return state.routes.length;
        },

        getHousesLength(state) {
            return state.houses.length;
        },

        getStreetsLength(state) {
            return state.streets.length;
        },

        getRoutesCompsLength(state, routesComps) {
            console.log("rC", state.routesComps.length)
            if (routesComps.route_comp_id === undefined) {
                return true;
            }
            return false;
        },

    },
    mutations: {
        // sortStreets(state) {
        //     console.log('before sort:', state.streets)
        //     // console.log('after sort:', state.streets)
        //     if (isProxy(state.streets)){
        //         console.log('isProxy')
        //         let str = toRaw(state.streets)
        //         console.log('strRaw', str)
        //         str = str.sort()
        //         console.log('strSort', str)
        //         return str
        //     }
        // }
    },
    actions: {}
});