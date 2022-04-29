import { createApp } from 'vue'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.min.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleLeft, faAngleRight, faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// library.add(faAngleLeft)
library.add([
  faAngleLeft,
  faAngleRight,
  faAngleUp,
  faAngleDown
])



let app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')

