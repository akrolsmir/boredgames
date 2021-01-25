import vue from '@vitejs/plugin-vue';
import { optimizeDeps } from 'vite';

/**
 * @type {import('vite').UserConfig}
 */
export default {
  plugins: [vue()],
  optimizeDeps: { include: ['firebase/app', 'firebase/firestore'] },
};
