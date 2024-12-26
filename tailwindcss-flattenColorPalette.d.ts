// tailwindcss-flattenColorPalette.d.ts
declare module 'tailwindcss/lib/util/flattenColorPalette' {
    export default function flattenColorPalette(colors: Record<string, any>): Record<string, string>;
  }
  