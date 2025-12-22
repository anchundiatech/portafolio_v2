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
        unused: true,
        dead_code: true,
      },
      mangle: true,
      format: {
        comments: false,
      },
    },
    // Aggressive tree-shaking configuration
    treeshake: {
      moduleSideEffects: false,
      propertyReadSideEffects: false,
      tryCatchDeoptimization: false,
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
            // Separar diferentes partes de react-icons para tree-shaking
            if (id.includes('react-icons/fa')) {
              return 'icons-fa';
            }
            if (id.includes('react-icons/si')) {
              return 'icons-si';
            }
            if (id.includes('react-icons/ri')) {
              return 'icons-ri';
            }
            if (id.includes('react-icons')) {
              return 'icons-other';
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
