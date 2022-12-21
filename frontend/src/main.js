import { createApp } from 'vue'
import App from './App.vue'
import components from '@/components/UI'
import router from './router/router'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import swal from 'sweetalert2';
window.Swal = swal;
import store from "@/store";


const app = createApp(App)

components.forEach(component => {
    app.component(component.name, component)
})

app.use(router)
app.use(VueSweetalert2);
app.use(store)
app.mount('#app')
