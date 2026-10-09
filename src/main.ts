import './shared/ui'

import { createApp, createSSRApp } from 'vue'
import App from './App.vue'
import { i18n } from './i18n'

// Built pages arrive prerendered (scripts/prerender.ts) and the app takes over that markup;
// the dev server serves an empty page and mounts from scratch.
const root = document.getElementById('app')!
const app = root.hasChildNodes() ? createSSRApp(App) : createApp(App)
app.use(i18n).mount(root)
