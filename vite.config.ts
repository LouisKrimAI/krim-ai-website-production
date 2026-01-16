import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'
import { visualizer } from 'rollup-plugin-visualizer'
import { VitePWA } from 'vite-plugin-pwa'
import { default as terser } from '@rollup/plugin-terser'

const nm = (p: string) => path.resolve(__dirname, 'node_modules', p)

const isProd = process.env.NODE_ENV === 'production'

export default defineConfig({
  // Global definitions for production optimization  
  define: isProd ? {
    'console.log': 'undefined',
    'console.warn': 'undefined', 
    'console.error': 'undefined',
    'console.info': 'undefined',
    'console.debug': 'undefined',
    'console.trace': 'undefined',
    'console.time': 'undefined',
    'console.timeEnd': 'undefined',
    'console.group': 'undefined',
    'console.groupEnd': 'undefined',
    'console.groupCollapsed': 'undefined',
    'console.clear': 'undefined',
    'console.count': 'undefined',
    'console.countReset': 'undefined',
    'console.table': 'undefined',
    'console.dir': 'undefined',
    'console.dirxml': 'undefined',
    'console.assert': 'undefined',
    'console.profile': 'undefined',
    'console.profileEnd': 'undefined',
    __DEV__: false
  } : {
    __DEV__: true
  },

  plugins: [
    react({
      // Optimize React for production
      jsxRuntime: 'automatic'
    }),
    
    // Bundle analyzer for production builds
    isProd && visualizer({
      filename: 'dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
      template: 'treemap'
    }),
    
    // Progressive Web App with simplified configuration - ONLY IN PRODUCTION
    isProd && VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'inline', // Prevent auto-registration
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,avif,woff2}'],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB limit for large images
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
        runtimeCaching: [
          // Google Fonts with optimized caching
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-stylesheets',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              }
            }
          },
          // Images with intelligent caching
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|webp|avif)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          },
          // API calls with network-first strategy
          {
            urlPattern: /^https:\/\/api\./,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              networkTimeoutSeconds: 3,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 10 // 10 minutes
              },
            }
          },
          // Static assets with cache-first
          {
            urlPattern: /\.(?:js|css|woff2)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'static-assets',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 7 // 1 week
              }
            }
          }
        ]
      },
      manifest: {
        name: 'Krim AI — Infinite Scale. Zero Loss of Humanity.',
        short_name: 'Krim AI',
        description: 'Agentic AI workforce for debt recovery. 2× ROI in 90 days. Zero compliance violations.',
        theme_color: '#0A081B',
        background_color: '#0A081B',
        display: 'standalone',
        orientation: 'portrait-primary',
        scope: '/',
        start_url: '/',
        categories: ['business', 'finance', 'productivity'],
        lang: 'en-US',
        icons: [
          {
            src: 'pwa-icon-192.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          },
          {
            src: 'pwa-icon-512.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'favicon.ico',
            sizes: '64x64 32x32 24x24 16x16',
            type: 'image/x-icon',
            purpose: 'any'
          }
        ]
      }
    })
  ].filter(Boolean),
  
  server: { 
    port: 5174,
    host: true, // Allow external access
    strictPort: true, // Use strict port to prevent conflicts
    cors: true,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 24678, // Use different port for HMR to avoid conflicts
      overlay: true, // Enable error overlay to see issues
      timeout: 60000 // Increase timeout to prevent reload loops
    },
    fs: {
      strict: false
    },
    watch: {
      // Ignore node_modules and other large directories that might cause reload loops
      ignored: ['**/node_modules/**', '**/.git/**', '**/dist/**', '**/coverage/**', '**/performance-reports/**', '**/autoruntmp/**'],
      // Use polling in case file watching is unreliable
      usePolling: false,
      interval: 1000
    }
  },
  
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // Unify ALL React entry points to one physical location
      react: nm('react'),
      'react-dom': nm('react-dom'),
      'react/jsx-runtime': nm('react/jsx-runtime'),
    },
    // Only the public packages; do NOT dedupe scheduler/reconciler
    dedupe: ['react', 'react-dom'],
  },
  
  // Minimal prebundle - no reconciler manipulation
  optimizeDeps: {
    include: ['react', 'react-dom'],
    // no excludes; no reconciler/constants here
  },
  
  build: {
    target: 'es2020', // Support optional chaining and nullish coalescing operators
    minify: 'esbuild',
    sourcemap: !isProd, // Enable sourcemaps only in development for security
    cssCodeSplit: true,
    manifest: true,
    
    rollupOptions: {
      plugins: [
        // Enhanced console removal for production
        isProd && terser({
          compress: {
            drop_console: true,
            drop_debugger: true,
            pure_funcs: [
              'console.log',
              'console.info',
              'console.debug',
              'console.warn',
              'console.error',
              'console.trace',
              'console.time',
              'console.timeEnd',
              'console.group',
              'console.groupEnd',
              'console.groupCollapsed',
              'console.clear',
              'console.count',
              'console.countReset',
              'console.table',
              'console.dir',
              'console.dirxml',
              'console.assert',
              'console.profile',
              'console.profileEnd'
            ],
            passes: 2
          },
          mangle: {
            safari10: true
          },
          format: {
            comments: false
          }
        })
      ].filter(Boolean),
      
      output: {
        // Strategic manual chunking for large dependencies
        manualChunks: {
          // Vendor chunk - React core
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],

          // Animation libraries
          'animation-vendor': ['framer-motion', 'gsap'],

          // Three.js and 3D (already lazy loaded, but group together)
          'threejs-vendor': ['three', '@react-three/fiber', '@react-three/drei'],

          // Icons
          'icons-vendor': ['@phosphor-icons/react'],

          // Utilities
          'utils-vendor': ['clsx']
        },

        // Optimize chunk naming with content hash
        chunkFileNames: () => `assets/js/[name]-[hash:8].js`,
        
        entryFileNames: 'assets/js/[name]-[hash:8].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name!.split('.')
          const extType = info[info.length - 1]
          
          // Organize assets by type
          if (/png|jpe?g|webp|avif|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return `assets/images/[name]-[hash:8].[ext]`
          }
          if (/woff2?|eot|ttf|otf/i.test(extType)) {
            return `assets/fonts/[name]-[hash:8].[ext]`
          }
          return `assets/[ext]/[name]-[hash:8].[ext]`
        }
      },
      
      // Simplified tree shaking - less aggressive
      treeshake: true
    },
    
    // Performance optimization - Enterprise standards
    chunkSizeWarningLimit: 150, // 150KB warning limit for enterprise
    assetsInlineLimit: 2048, // Inline assets under 2KB for better caching
    
    // CSS optimization
    cssMinify: 'esbuild',
    
    // Enable gzip compression detection
    reportCompressedSize: true
  },
  
  // CSS preprocessing
  css: {
    devSourcemap: !isProd,
    modules: {
      generateScopedName: isProd 
        ? '[hash:base64:8]' 
        : '[name]__[local]___[hash:base64:5]'
    },
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/variables.scss";'
      }
    }
  },
  
  // Preview configuration
  preview: {
    port: 4173,
    host: true,
    strictPort: true
  },
  
  // Performance optimizations with esbuild (React-polyfill safe)
  esbuild: {
    // Comprehensive console and debugging removal in production
    drop: isProd ? ['console', 'debugger'] : [],
    legalComments: 'none',
    keepNames: true, // Keep function names to prevent React polyfill issues
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true,
    treeShaking: true
  }
})
