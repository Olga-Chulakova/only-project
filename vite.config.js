import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import VitePluginSvgSpritemap from '@spiriit/vite-plugin-svg-spritemap';
// import { ViteMinifyPlugin } from 'vite-plugin-minify';

/** @type {import('vite').UserConfig} */
export default ({ command }) => {
  // Определяем, сборка это или разработка
  const isBuild = command === 'build';

  return {
    // Для разработки: './', для продакшена: '/only-project/'
    base: isBuild ? '/only-project/' : './',

    plugins: [
      VitePluginSvgSpritemap('source/img/sprite/*.svg', {
        styles: false,
        injectSVGOnDev: true,
      }),
      // input https://www.npmjs.com/package/html-minifier-terser options
      // ViteMinifyPlugin({}),
      ViteImageOptimizer({
        test: /\.(jpe?g|png|svg)$/i,
        includePublic: false,
        logStats: true,
        ansiColors: true,
        svg: {
          multipass: true,
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  cleanupNumericValues: false,
                  convertPathData: {
                    floatPrecision: 2,
                    forceAbsolutePath: false,
                    utilizeAbsolute: false,
                  },
                  removeViewBox: false, // https://github.com/svg/svgo/issues/1128
                  cleanupIds: false,
                },
              },
            },
            'removeDimensions',
          ],
        },
        png: {
          // https://sharp.pixelplumbing.com/api-output#png
          quality: 80,
          palette: true
        },
        jpeg: {
          // https://sharp.pixelplumbing.com/api-output#jpeg
          quality: 80,
          progressive: true
        },
        jpg: {
          // https://sharp.pixelplumbing.com/api-output#jpeg
          quality: 80,
          progressive: true
        },
        // Cache assets in cacheLocation. When enabled, reads and writes asset files with their hash suffix from the specified path.
        cache: true,
        cacheLocation: './.cache',
      }),
      {
        name: 'fix-crossorigin',
        transformIndexHtml(html) {
          // Исправляем crossorigin без значения на crossorigin="anonymous"
          return html
            .replace(
              /crossorigin(?!\s*=\s*["'])/g,
              'crossorigin="anonymous"'
            );
        }
      },
    ],
    css: {
      devSourcemap: true
    },
    root: './source',
    build: {
      outDir: '../dist',
      emptyOutDir: true, // Добавляем очистку папки dist
    },
    server: {
      port: 3000,
    }
  };
};
