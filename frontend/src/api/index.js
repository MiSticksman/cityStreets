import Vuex from "vuex";

export default new Vuex.Store({
    state: {
        streetsURL: "http://localhost:8000/streets",
        housesURL: "http://localhost:8000/houses",
        routesURL: "http://localhost:8000/routes",
        routeCompsURL: "http://localhost:8000/routes_components",


    },
    getters: {
        async getStreets(state) {
            var response =  await fetch(`${state.streetsURL}/`);
            const streets = await response.json();
            // console.log('gettets', streets);
            return streets;
        },

    },
    mutations: {},
    actions: {}
});