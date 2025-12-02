const config = {
  plugins: {
    "@tailwindcss/postcss": {
      // Désactiver les optimisations WebAssembly de Tailwind
      optimize: false,
    },
  },
};

export default config;
