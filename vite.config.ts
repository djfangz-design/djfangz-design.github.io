import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

// Plugin to copy special files to dist for GitHub Pages
const copySpecialFiles = () => {
  return {
    name: 'copy-special-files',
    apply: 'build' as const,
    generateBundle() {
      // These files will be copied to dist/
      const filesToCopy = [
        { src: 'public/CNAME', dest: 'CNAME' },
        { src: 'public/.nojekyll', dest: '.nojekyll' },
        { src: 'public/404.html', dest: '404.html' },
      ]

      for (const file of filesToCopy) {
        try {
          if (fs.existsSync(file.src)) {
            const content = fs.readFileSync(file.src, 'utf-8')
            this.emitFile({
              type: 'asset',
              fileName: file.dest,
              source: content,
            })
            console.log(`✅ Copied ${file.src} to dist/${file.dest}`)
          } else {
            console.warn(`⚠️  File not found: ${file.src}`)
          }
        } catch (error) {
          console.error(`❌ Error copying ${file.src}:`, error)
        }
      }
    },
  }
}

// Base path handling for GitHub Pages sub-path deployments.
// Set VITE_BASE_PATH (e.g. "/nyeneng/") for project pages, leave unset for
// custom domains or user/org pages (defaults to "/").
const rawBase = process.env.VITE_BASE_PATH ?? process.env.BASE_PATH ?? '/'
const basePath = rawBase === '/' ? '/' : `/${rawBase.replace(/^\/+|\/+$/g, '')}/`

export default defineConfig({
  base: basePath,


  plugins: [
    react({
      // Ensure JSX is handled correctly
      jsxImportSource: 'react',
    }),
    copySpecialFiles(),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  server: {
    port: 5173,
    strictPort: false,
    open: true,
    cors: true,
  },

  preview: {
    port: 4173,
  },

  build: {
    // Output directory
    outDir: 'dist',
    
    // Clean dist before build
    emptyOutDir: true,

    // Minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false, // Keep console for debugging
      },
    },

    // Chunk splitting
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-ui': ['@radix-ui/react-slot'],
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/png|jpe?g|gif|svg|webp|ico|woff|woff2|eot|ttf|otf|webm|webp/.test(ext)) {
            ext === 'svg' ? `assets/svg/[name]-[hash][extname]` : `assets/images/[name]-[hash][extname]`
          } else if (ext === 'css') {
            return `assets/css/[name]-[hash][extname]`
          } else if (ext === 'js') {
            return `assets/js/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },

    // Source maps for production debugging
    sourcemap: 'hidden',

    // Report compressed size
    reportCompressedSize: true,

    // Chunk size warnings
    chunkSizeWarningLimit: 500,

    // CSS code splitting
    cssCodeSplit: true,

    // Target ES2020 for better browser support
    target: 'ES2020',

    // Module preload polyfill
    modulePreload: {
      polyfill: true,
    },

    // Environment variables
    define: {
      'process.env.VITE_APP_TITLE': JSON.stringify('Nyeneng Trading & Projects'),
      'process.env.VITE_APP_URL': JSON.stringify('https://www.nyeneng.co.za'),
    },
  },

  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: ['@vite/env'],
  },

  // CSS handling
  css: {
    preprocessorOptions: {
      // Add any SCSS/LESS config here
    },
    postcss: {},
  },

  // Environment variables
  envDir: '.',
  envPrefix: 'VITE_',
})
