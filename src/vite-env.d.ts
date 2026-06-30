/// <reference types="vite/client" />

// Imports de imagem processados pelo vite-imagetools.
declare module "*&as=srcset" {
  const srcset: string;
  export default srcset;
}

declare module "*&format=webp" {
  const src: string;
  export default src;
}
