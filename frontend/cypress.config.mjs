import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    },
    baseUrl: 'http://localhost:8000'  },
    env: {
        BACKEND: 'http://localhost:8000/api'
    }
});
