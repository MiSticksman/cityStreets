import Vuex from "vuex";

export default new Vuex.Store({
    state: {
        streetsURL: "http://localhost:8000/streets",
        housesURL: "http://localhost:8000/houses",
        routesUrl: "http://localhost:8000/routes",
        routeCompsURL: "http://localhost:8000/routes_components"


    },
    getters: {},
    mutations: {},
    actions: {}
});