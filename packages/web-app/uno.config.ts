import { defineConfig, presetIcons, presetMini } from 'unocss';

export default defineConfig({
  // ...UnoCSS options
  presets: [
    presetMini(),
    presetIcons({
      collections: {
        mdi: () =>
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          import('@iconify-json/mdi/icons.json').then((i) => i.default),
      },
    }),
  ],
});
