import { vitePreprocess } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-auto';
import sveltePreprocess from 'svelte-preprocess';
import { preprocessMeltUI } from '@melt-ui/pp';
import sequence from 'svelte-sequential-preprocessor';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: sequence([
    sveltePreprocess({
      postcss: true,
      typescript: false,
      scss: {
        prependData: `
          @use "src/variables.scss" as *;
          @use "src/lib/styles/sakura/scss/sakura-lfv.scss" as *;
          `
      }
    }),
    vitePreprocess({}),
    preprocessMeltUI()
  ]),
  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter(),

    alias: {
      $prisma: 'prisma'
      // $components: 'src/components',
      // $utils: 'src/utils'
    }
  },
  vitePlugin: {
    // set to true for defaults or customize with object
    inspector: {
      toggleKeyCombo: 'meta-shift',
      showToggleButton: 'always',
      toggleButtonPos: 'bottom-right'
    }
  }
};

export default config;
