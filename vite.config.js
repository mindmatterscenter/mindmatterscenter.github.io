import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// GitHub Pages deployment plugin
const githubPagesPlugin = () => {
  return {
    name: 'github-pages-spa-support',
    closeBundle: async () => {
      // Make sure the dist directory exists
      const distDir = path.resolve(__dirname, 'dist')
      if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir, { recursive: true })
      }
      
      // Create .nojekyll file to disable Jekyll processing
      fs.writeFileSync(path.resolve(distDir, '.nojekyll'), '')
      console.log('Created .nojekyll file')
    }
  }
}

export default defineConfig({
  plugins: [
    react(),
    githubPagesPlugin()
  ],
  base: '/',  // Base path for your custom domain
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})