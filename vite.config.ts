import { viteSingleFile } from 'vite-plugin-singlefile';
import { createHtmlPlugin } from 'vite-plugin-html';
import { beasties } from 'vite-plugin-beasties';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    minify: 'esbuild',
    cssCodeSplit: false,
  },
  plugins: [
    createHtmlPlugin({
      minify: true,
    }),
    beasties({
      options: {
        preload: 'swap',
        inlineFonts: false,
        compress: true,
        reduceInlineStyles: true,
      },
    }),
    viteSingleFile(), // собираем всё в один файл
  ],
  server: {
    open: true,
    port: 3000,
  },
});
