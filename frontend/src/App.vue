<template>

    <navbar></navbar>
    <div class="app">
        <router-view></router-view>
    </div>
</template>

<script>

import Navbar from "@/components/Navbar.vue";
import Pagination from "@/components/Pagination.vue"
export default {
    name: 'App',
    components: {
        Navbar, Pagination
    }
}
</script>

<style>

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.app {
    padding: 20px;
}

.btn {
    margin-top: 15px;
    align-self: flex-end;
    margin-left: 15px;
    padding: 5px 10px;
    background: none;
    color: teal;
    border: 1px solid teal;
}

</style>