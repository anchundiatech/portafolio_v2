import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  base: './',

  plugins: [react({
    fastRefresh: process.env.NODE_ENV !== 'production',
  })],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },

  // Optimizaciones de dependencias
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'motion'],
    exclude: ['lucide-react', 'react-icons']
  },

  build: {
    // Minification causes issues with React internals - keeping disabled for stability
    // Trade-off: slightly larger bundles but fully stable and working application
    minify: false,
    // Tree-shaking configuration (conservative to avoid breaking dependencies)
    treeshake: {
      moduleSideEffects: true, // Keep this true to avoid breaking dependencies
    },

    // Aumentar límite de assets inline para reducir requests
    assetsInlineLimit: 4096,

    // Dividir chunks para mejor caching y cargar solo lo necesario
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Separar proveedores de terceros para mejor caching
          if (id.includes('node_modules')) {
            // Keep react and react-dom in main bundle to avoid circular dependency issues
            if (id.includes('react') && !id.includes('react-icons') && !id.includes('react-router') && !id.includes('react-helmet')) {
              return null; // Put in main bundle
            }
            // Motion as separate vendor
            if (id.includes('motion')) {
              return 'motion-vendor';
            }
            // i18next as separate vendor
            if (id.includes('i18next')) {
              return 'i18n-vendor';
            }
            // Everything else in general vendor
            return 'vendor';
          }
        },
        // Optimizar nombres de archivos
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },

    // Reportar tamaño de bundle
    reportCompressedSize: true,

    // Optimizar CSS
    cssMinify: true,
    cssCodeSplit: true,
  }
})
