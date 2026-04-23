import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  base: '/pokedex/', // set base path for GitHub Pages which should match the repository name
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
})
