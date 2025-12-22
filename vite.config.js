import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  base: './',

  plugins: [react()],

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
    // Optimizaciones de minificación
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      mangle: true,
      format: {
        comments: false,
      }
    },
    // Aggressive tree-shaking configuration
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
            if (id.includes('react/') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            // NO separar react-icons - dejamos que vaya con el componente que lo usa
            // Esto hace que los chunks de iconos se carguen SOLO cuando el componente los necesita
            if (id.includes('react-icons')) {
              return null;
            }
            if (id.includes('react-router-dom')) {
              return 'router-vendor';
            }
            if (id.includes('react-helmet-async')) {
              return 'helmet-vendor';
            }
            if (id.includes('motion')) {
              return 'motion-vendor';
            }
            if (id.includes('i18next')) {
              return 'i18n-vendor';
            }
            // Vendor general para otros módulos
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
