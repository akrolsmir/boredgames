import vue from '@vitejs/plugin-vue'

/**
 * @type {import('vite').UserConfig}
 */
export default {
  plugins: [vue()],
  optimizeDeps: {
    include: ['firebase/app', 'firebase/firestore', 'firebase/auth'],
  },
}
