import { createApp } from 'vue'
import { createDynamicForms } from '@asigloo/vue-dynamic-forms'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from './router'

loadFonts()

const VueDynamicForms = createDynamicForms()

createApp(App)
  .use(vuetify)
  .use(router)
  .use(VueDynamicForms)
  .mount('#app')
