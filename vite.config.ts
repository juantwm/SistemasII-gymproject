import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id: string) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

function versionedPackageResolver() {
  return {
    name: 'versioned-package-resolver',
    async resolveId(id: string, importer: string | undefined, options: { skipSelf?: boolean }) {
      const versionedMatch = id.match(/^((?:@[^/]+\/)?[^@]+)@[\d.]+(?:-[\w.]+)?$/)
      if (versionedMatch) {
        const resolved = await this.resolve(versionedMatch[1], importer, { ...options, skipSelf: true })
        return resolved?.id ?? null
      }
    },
  }
}

export default defineConfig({
  plugins: [
    versionedPackageResolver(),
    figmaAssetResolver(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
