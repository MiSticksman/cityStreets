import { createApp } from 'vue'
import App from './App.vue'
import components from '@/components/UI'
import urls from '@/constants'
import router from './router/router'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import swal from 'sweetalert2';
window.Swal = swal;

const app = createApp(App)

components.forEach(component => {
    app.component(component.name, component)
})

urls.forEach(url => {
    app.component(url.name, url)
})

app.use(router)
app.use(VueSweetalert2);
app.mount('#app')
