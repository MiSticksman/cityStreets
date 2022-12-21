<template>
    <div class="page__wrapper">
        <div 
            v-for="p in totalPages" 
            :keys="p"
            class="page"
            :class="{
                'current-page': p === currentPage
            }"
            @click="changePage(p)">
            {{ p }}
        </div>
    </div>

    <!-- <div>
        <ul>
            <li class="pagination" v-for="p in totalPages" :keys="p">
                <button 
                    class="pagination-button"
                    :class="{active: currentPage === p }"
                    @click="changePage(p)"> 
                    {{ p }}
                </button>
            </li>
        </ul>
    </div> -->
</template>

<script>
    export default {
        name: 'Pagination',
        props: {
            total: '',
            limit: '',
        },
        data() {
            return {
                totalPages: 0,
                currentPage: 1,
            }
        },
        created() {

            this.totalPages = Math.ceil(this.total / this.limit)
            console.log("return:", this.totalPages)
        },

        computed: {
            // totalPages() {
            //     console.log("item", this.limit)
            //     console.log("total", this.total)
            //     console.log("return:", Math.ceil(this.total / this.limit))
            //     return Math.ceil(this.total / this.limit)
            // }
        },
        
        methods: {
            changePage(pageNumber) {
                this.currentPage = pageNumber;
                this.$emit('page-changed', pageNumber)
            },
            // totalPages() {
            //     console.log("limit", this.limit)
            //     console.log("total", this.total)
            //     console.log("return:", Math.ceil(this.total / this.limit))
            //     return Math.ceil(this.total / this.limit)
            // }
        },       
    }
</script>

<style >

.page__wrapper {
    display: flex;
    margin-top: 15px;
}

.page {
    border: 1px solid black;
    padding: 10px;
}

.current-page {
    border: 2px solid teal;
}
</style>