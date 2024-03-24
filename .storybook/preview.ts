import { type Preview, setup } from '@storybook/vue3'
import { type App } from 'vue'

// This is needed to apply tailwind and other styles to the stories preview
import '../src/assets/main.css'

import { createPinia } from 'pinia'

import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from '../src/firebase'

setup((app: App) => {
  app.use(createPinia())

  app.use(VueFire, {
    firebaseApp,
    modules: [VueFireAuth()]
  })
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
}

export default preview
